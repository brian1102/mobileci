import ImagePicker from 'react-native-image-picker'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import React from 'react'
import {
  Image,
  ScrollView,
  StatusBar,
  Switch,
  Text,
  ActivityIndicator,
  View
} from 'react-native'
import Button from 'react-native-button'
import Ionicons from 'react-native-vector-icons/Ionicons'
import tr from '../../../i18n/i18n'
import EmptyContainer from '../../../components/empty-container'
import connect from '../../../utils/connect'
import { log } from '../../../utils/logger'
import * as t from '../../../state/actionsType'
import * as c from '../../../state/constants'
import a from '../../../state/actions'
import * as s from '../../../state/selectors'
import NativeFeedback from '../../../components/native-feedback/index'
import { images, colors } from '../../../theme'
import firstLetters from '../../../utils/firstLetters'
import tabNavigationOptions from '../../../utils/tabNavigationOptions'
import UI from '../../../utils/UI'
import Chart from './components/Chart.component'
import Loader from '../../../components/loader/Loader'
import styles from './profile.styles'

export const mapStatusToBool = status => status === 'on_duty'

@connect(
  state => {
    const userInfo = s.getUserInfo(state)
    return {
      userInfo,
      status: s.getDutyStatus(state) || (userInfo && userInfo.status),
      avatar: s.getProfileAvatar(state) || (userInfo && userInfo.avatar),
      uploadingAvatar: s.getUploadingAvatar(state),
      fetchStatStatus: s.getFetchStateStatus(state),
      vehiclesList: s.getVehicleList(state),
      selectVehicleStatus: s.getSelectVehicleStatus(state),
      currentVehicleType: s.getCurrentVehicleType(state),
      isOnline: s.isNetworkConnected(state),
      chartData: {
        today: s.getTodayStatsData(state),
        last_week: s.getLastWeekStatsData(state),
        last_four_weeks: s.getLastFourWeeksStatsData(state)
      }
    }
  },
  dispatch => ({
    act: bindActionCreators(a, dispatch)
  })
)
export default class ProfileScreen extends React.Component {
  static propTypes = {
    userInfo: PropTypes.object,
    isOnline: PropTypes.bool,
    status: PropTypes.string,
    avatar: PropTypes.string,
    act: PropTypes.object,
    chartData: PropTypes.object,
    currentVehicleType: PropTypes.object,
    fetchStatStatus: PropTypes.object,
    selectVehicleStatus: PropTypes.object,
    uploadingAvatar: PropTypes.any
  }

  static navigationOptions = tabNavigationOptions('tab_profile', images.profile)

  componentDidMount() {
    UI.runAfterInteractions(() => {
      if (this.props.isOnline) {
        this.props.act[t.GET_USERINFO_REQUEST]()
        this.props.act[t.FETCH_PROFILE_STATS](c.STAT_TODAY)
      }
    })
  }

  changeStatus = status => {
    const statusText = status ? 'on_duty' : 'off_duty'
    this.props.act[t.UPDATE_DUTY_STATUS]({
      status: statusText,
      origin: 'manually-from-profile-screen'
    })
  }

  selectImage = () => {
    const imagePickerOptions = {
      title: tr('select_avatar'),
      noData: true,
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    }
    ImagePicker.showImagePicker(imagePickerOptions, response => {
      log('Response = ', response)

      if (response.didCancel) {
        log('User cancelled image picker')
      } else if (response.error) {
        log('ImagePicker Error: ', response.error)
      } else if (response.customButton) {
        log('User tapped custom button: ', response.customButton)
      } else {
        // TODO: dispatch action here
        UI.runAfterInteractions(() => {
          this.props.act[t.UPLOAD_PROFILE_AVATAR](response)
        })
      }
    })
  }

  renderVehicleType = () => {
    const { currentVehicleType, selectVehicleStatus } = this.props

    return (
      <View>
        <Text style={styles.label}>
          {tr('vehicle_type').toUpperCase()}
        </Text>
        <View style={styles.button}>
          <View style={styles.holder}>
            {selectVehicleStatus && selectVehicleStatus.isWorking
              ? <ActivityIndicator
                color={colors.brand}
                style={styles.selectVehicleSpiner}
              />
              : <Text style={styles.vehicle}>
                {currentVehicleType
                  ? currentVehicleType.name
                  : tr('no_vehicle')}
              </Text>}
            <View style={{ flex: 1, flexDirection: 'row' }} />

          </View>
        </View>
      </View>
    )
  }

  renderChart = () => {
    const { chartData, fetchStatStatus } = this.props

    if (fetchStatStatus.isWorking)
      return (
        <ActivityIndicator
          color={colors.brand}
          style={styles.chartLoadingDetail}
        />
      )
    if (fetchStatStatus.error) {
      return (
        <Text style={styles.chartLoadingDetail}>
          {`${tr('loadingStatError')}: ${fetchStatStatus.error}`}
        </Text>
      )
    }
    return <Chart chartData={chartData} />
  }

  renderAvatar() {
    const { avatar, userInfo, uploadingAvatar } = this.props

    const renderAvatarLoading = () =>
      <View style={styles.profilePictureLoading}>
        <ActivityIndicator color={colors.white} />
      </View>

    if (!avatar) {
      const monogram = userInfo.name
        ? firstLetters(userInfo.name).slice(0, 2)
        : ''
      return (
        <View style={styles.profilePictureOuter}>
          <View style={styles.profilePictureInner}>
            <Text style={styles.profilePicturePlaceholder}>
              {monogram}
            </Text>
            {uploadingAvatar && renderAvatarLoading()}
          </View>
        </View>
      )
    }

    return (
      <View style={styles.profilePictureOuter}>
        <View style={styles.profilePictureInner}>
          <Image source={{ uri: avatar }} style={styles.profilePicture} />
          {uploadingAvatar && renderAvatarLoading()}
        </View>
      </View>
    )
  }

  render() {
    const { status, userInfo, isOnline } = this.props

    if (!userInfo && isOnline) {
      return (
        <View style={[styles.container, styles.emptyContainer]}>
          <Loader color={colors.brand} />
        </View>
      )
    }

    const onDuty = mapStatusToBool(status)

    return (
      <View style={styles.container}>
        <StatusBar />

        <View style={styles.upper}>
          <View style={styles.header}>
            <Button onPress={() => this.props.act[t.NAVIGATE]('DrawerOpen')}>
              <Ionicons style={styles.headerIcon} name="md-menu" />
            </Button>
            <Text style={styles.page}>
              {tr('tab_profile').toUpperCase()}
            </Text>
          </View>
        </View>

        <EmptyContainer offline={!isOnline} offlineBackgroundColor="#222c35">
          {isOnline &&
            <ScrollView
              style={styles.scrollView}
              ref={ref => (this.scrollView = ref)}
            >
              <View style={styles.upper}>
                <NativeFeedback onPress={this.selectImage}>
                  {this.renderAvatar()}
                </NativeFeedback>

                <Text style={styles.name}>
                  {userInfo.name ? userInfo.name.toUpperCase() : ''}
                </Text>

                <View style={styles.switchRow}>
                  <Switch
                    onTintColor={colors.brand}
                    value={onDuty}
                    thumbTintColor={colors.white}
                    onValueChange={this.changeStatus}
                  />
                  <Text style={styles.statusTitle}>
                    {tr(onDuty ? 'on_duty' : 'off_duty').toUpperCase()}
                  </Text>
                </View>
              </View>

              {this.renderVehicleType()}
              {this.renderChart()}
              <View style={styles.spacer} />
            </ScrollView>}
        </EmptyContainer>
      </View>
    )
  }
}
