import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Platform,
  UIManager,
  LayoutAnimation,
  Text,
  TouchableOpacity as RNTouchableOpacity,
  ScrollView,
  Switch,
  Alert,
} from 'react-native'
import Theme, { createThemedComponent } from 'react-native-theming'
import QRCodeScanner from 'react-native-qrcode-scanner'
import Ionicons from 'react-native-vector-icons/Ionicons'
import moment from 'moment'
import RoundedButton from '../../../components/rounded-button/RoundedButton'
// Redux
import connect from '../../../utils/connect'
import a from '../../../state/actions'
import * as t from '../../../state/actionsType'
import * as s from '../../../state/selectors'
// Libraries
import tr from '../../../i18n'
// UI
import { bulkComplete } from '../../../api'
import { cloneObject } from '../../../utils'
import { bulkCheckProgress } from '../../../api/task/task.api'
import { convertToUtc } from '../../../utils/Date'
import styles from './scanner.style'
import Header from '../../../components/header/Header.component'

const View = Theme.View
const TouchableOpacity = createThemedComponent(RNTouchableOpacity)

const PICKUP = false
const DROPOFF = true

@connect(
  state => ({
    location: s.getLocation(state),
    rules: s.getCompanyRules(state),
  }),
  {
    fetchTask: a[t.FETCH_TASKS_REQUEST],
    fetchDailyStatus: a[t.FETCH_DAILY_STATUS],
  }
)
export default class ScannerScreen extends Component {
  static navigationOptions = {
    header: props =>
      <Header {...props} showMenuButton title={tr('scanner').toUpperCase()} />,
  }

  static propTypes = {
    fetchTask: PropTypes.func,
    fetchDailyStatus: PropTypes.func,
    rules: PropTypes.object,
  }

  constructor(props) {
    super(props)

    this.state = {
      readed: [],
      bulkApiStatus: {
        isWorking: false,
        error: null,
      },
      // eslint-disable-next-line
      mode: this.props.rules.pickup.length === 0 ? PICKUP : DROPOFF,
      qrCodeScannerAtive: true,
      bulkProcessPercent: 0,
    }

    this.status = null
    if (Platform.OS === 'android') {
      // eslint-disable-next-line
      UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true)
    }
  }

  onRead = ({ data: itemID }) => {
    setTimeout(() => {
      this.qrCodeScanner.reactivate()
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
      this.setState({ qrCodeScannerAtive: true })
    }, 2000)
    if (this.state.bulkApiStatus.isWorking) {
      Alert.alert(tr('notice'), tr('bulk_working'))
      return
    }
    const valid = this.state.readed.findIndex(i => i === itemID) === -1
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
    this.setState({ qrCodeScannerAtive: false })
    if (valid) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
      this.setState({
        readed: [...this.state.readed, itemID],
      })
    } else {
      Alert.alert(tr('notice'), tr('item_exist', itemID))
    }
  }

  loop(callback, interval = 1000) {
    callback()
    if (
      this.status &&
      this.status.data &&
      this.status.data.status === 'completed'
    ) {
      this.doOnBulkComplete()
      return
    }
    setTimeout(() => {
      this.loop(callback, interval)
    }, interval)
  }

  doOnBulkComplete = () => {
    this.setState({
      bulkApiStatus: {
        isWorking: false,
      },
      bulkProcessPercent: 0,
      readed: [],
    })
    const { fetchTask, fetchDailyStatus } = this.props
    fetchTask({ reload: true })
    fetchDailyStatus()
    Alert.alert(tr('notice'), tr('bulk_working_done'))
  }

  submit = async () => {
    const completedAt = convertToUtc().format()
    const { location } = this.props
    this.setState({
      bulkApiStatus: {
        isWorking: true,
      },
    })

    try {
      const res = await bulkComplete({
        completion_time: completedAt,
        type: this.state.mode === DROPOFF ? 'dropoff' : 'pickup',
        location: {
          lat: location.latitude,
          lng: location.longitude,
        },
        tracking_numbers: this.state.readed,
      })
      const batchId = res.data.batch_id
      const submitAt = moment().unix()
      this.loop(async () => {
        this.status = await bulkCheckProgress(batchId)

        this.setState({
          bulkProcessPercent:
            (this.status.data.processed - submitAt) /
              this.status.data.total *
              100,
        })
      })
    } catch (error) {
      this.setState({
        bulkApiStatus: {
          isWorking: false,
        },
      })
      Alert.alert(
        tr('bulk_complete_title'),
        tr('bulk_complete_des', error.message)
      )
    }
  }

  clear = () => {
    if (this.state.bulkApiStatus.isWorking) {
      Alert.alert(tr('notice'), tr('bulk_working'))
      return
    }
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
    this.setState({ readed: [] })
  }

  clearOne = i => {
    if (this.state.bulkApiStatus.isWorking) {
      Alert.alert(tr('notice'), tr('bulk_working'))
      return
    }
    const index = this.state.readed.findIndex(v => v === i)

    if (index !== -1) {
      const copy = cloneObject(this.state.readed)
      copy.splice(index, 1)
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
      this.setState({
        readed: copy,
      })
    }
  }

  tooglePickUpDropOff = forceValue => {
    const { rules } = this.props

    // prevent user switch from dropoff to pickup while pickup has subtasks
    if (
      (forceValue === PICKUP || this.state.mode === DROPOFF) &&
      rules.pickup.length > 0
    ) {
      Alert.alert(tr('notice'), tr('operation_not_allow'))
      return
    }

    // prevent user switch from pickup to dropff while dropoff has subtasks
    if (
      (forceValue === DROPOFF || this.state.mode === PICKUP) &&
      rules.dropoff.length > 0
    ) {
      Alert.alert(tr('notice'), tr('operation_not_allow'))
      return
    }

    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
    this.setState({
      mode: forceValue !== undefined ? forceValue : !this.state.mode,
    })
  }

  renderTopContent = () => {
    return (
      <View style={styles.switchView}>
        <Text
          onPress={() => this.tooglePickUpDropOff(false)}
          style={[
            styles.switchViewText,
            styles.switchViewTextLeft,
            this.state.mode ? { color: 'rgba(255,255,255,0.2)' } : null,
          ]}
        >
          {tr('pickup')}
        </Text>
        <Switch
          onValueChange={this.tooglePickUpDropOff}
          thumbTintColor={'#ffffff'}
          tintColor={'#D3D3D3'}
          onTintColor={'#D3D3D3'}
          value={this.state.mode}
        />
        <Text
          onPress={() => this.tooglePickUpDropOff(true)}
          style={[
            styles.switchViewText,
            styles.switchViewTextRight,
            !this.state.mode ? { color: 'rgba(255,255,255,0.2)' } : null,
          ]}
        >
          {tr('dropoff')}
        </Text>
      </View>
    )
  }

  renderBottomContent = () =>
    <View style={styles.bottomView}>
      <View style={styles.infoView}>
        {this.state.readed.length > 0 &&
          <ScrollView style={styles.scrollView}>
            {this.state.readed.map(i => {
              return (
                <TouchableOpacity
                  style={styles.readedView}
                  key={i}
                  onPress={() => this.clearOne(i)}
                >

                  <Text
                    style={styles.readedItem}
                    numberOfLines={1}
                    ellipsizeMode="middle"
                  >
                    #{i}
                  </Text>

                  <View style={styles.badgeContainer}>
                    <Ionicons name="ios-remove" size={20} color="white" />
                  </View>
                </TouchableOpacity>
              )
            })}
          </ScrollView>}

        <View style={styles.statsContainer}>
          <Text style={styles.readedCount}>{this.state.readed.length}</Text>
          <Text style={styles.readedCountLabel}>{tr('scanned_items')}</Text>
        </View>

      </View>
      <View style={styles.buttons}>
        <RoundedButton
          scale={0.85}
          title={tr('signature_clear')}
          onPress={this.clear}
          style={styles.button}
          enabled={
            this.state.readed.length !== 0 &&
            !this.state.bulkApiStatus.isWorking
          }
        />
        <RoundedButton
          scale={0.85}
          title={tr('signature_submit')}
          loadingPercent={this.state.bulkProcessPercent}
          isLoading={this.state.bulkApiStatus.isWorking}
          onPress={this.submit}
          style={styles.button}
          enabled={
            this.state.readed.length !== 0 &&
            !this.state.bulkApiStatus.isWorking
          }
        />
      </View>
    </View>

  render() {
    return (
      <QRCodeScanner
        ref={r => {
          this.qrCodeScanner = r
        }}
        onRead={this.onRead}
        showMarker={this.state.qrCodeScannerAtive}
        topContent={this.renderTopContent()}
        topViewStyle={styles.topContentStyle}
        bottomContent={this.renderBottomContent()}
      />
    )
  }
}
