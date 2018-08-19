import PropsType from 'prop-types'
import React from 'react'
import { Alert, Image, Platform, View, ActivityIndicator } from 'react-native'
import Camera from 'react-native-camera'
import Permissions from 'react-native-permissions'
import {
  photoCaptured,
  saveImageToDiskRequest
} from '../../../../../../../state/complete-job-flow/actions'
import { getIsPhotoCaptured } from '../../../../../../../state/complete-job-flow/selectors'
import connect from '../../../../../../../utils/connect'
import * as s from '../../../../../../../state/api-observer/selectors'
import CircleButton from '../../../../../../../components/circle-button/CircleButton'
import RoundedButton from '../../../../../../../components/rounded-button/index'
import t from '../../../../../../../i18n/i18n'
import { colors } from '../../../../../../../theme/index'
import styles from './photoPOD.styles'
import Header from '../../../../../../../components/header/Header.component'

class PhotoPODScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      permissionsReady: {
        camere: 'undetermined',
        storage: 'undetermined'
      },
      media: null,
      capturing: false
    }
    this.checkPermission()
  }

  static navigationOptions = {
    header: props => <Header {...props} title={t('photo').toUpperCase()} />
  }

  isPermissionReady = () => {
    if (Platform.OS === 'ios')
      return this.state.permissionsReady.camera === 'authorized'
    return (
      this.state.permissionsReady.camera === 'authorized' &&
      this.state.permissionsReady.storage === 'authorized'
    )
  }

  askForPermission = () => {
    Alert.alert(
      t('can_we_asccess_your_camera_and_storage'),
      t('we_need_access_your_camera_and_storage'),
      [
        { text: 'No', onPress: () => {}, style: 'cancel' },
        { text: 'Yes', onPress: this.requestPermissions }
      ]
    )
  }

  checkPermission = () => {
    const permissionsToCheck = Platform.OS === 'android'
      ? ['camera', 'storage']
      : ['camera']
    Permissions.checkMultiple(permissionsToCheck).then(response => {
      this.setState({
        permissionsReady: {
          camera: response.camera,
          storage: Platform.OS === 'android' ? response.storage : 'authorized'
        }
      })
      if (
        response.camera !== 'authorized' ||
        (Platform.OS === 'android' && response.storage !== 'authorized')
      ) {
        this.askForPermission()
      }
    })
  }

  requestPermissions = () => {
    Permissions.request('camera', 'always').then(response => {
      this.setState({
        permissionsReady: {
          ...this.state.permissionsReady,
          camera: response
        }
      })

      if (Platform.OS === 'android')
        Permissions.request('storage', 'always').then(response => {
          this.setState({
            permissionsReady: {
              ...this.state.permissionsReady,
              storage: response
            }
          })
        })
    })
  }

  onCapturePress = () => {
    this.setState({ capturing: true })
    this.camera
      .capture()
      .then(data => {
        this.setState({
          media: data,
          capturing: false
        })
        this.props.photoCaptured(true)
      })
      .catch(err => {
        this.setState({ capturing: false })
        throw new Error(t('image_capture_fail', err))
      })
  }

  onRetakePress = () => {
    this.props.photoCaptured(false)
  }

  upload = () => {
    const { storeImageProof } = this.props
    const { media } = this.state
    storeImageProof(media.path)
  }

  renderBottomControlPanel = () => {
    const { capturing } = this.state
    const { saveStatus } = this.props

    return this.props.isPhotoCaptured
      ? <View style={styles.controls}>
          <RoundedButton
            key={t('retake_photo')}
            title={t('retake_photo')}
            onPress={this.onRetakePress}
            style={styles.button}
            color={colors.white}
            highlightColor={colors.background}
            highlightTitleColor={colors.white}
          />
          <RoundedButton
            isLoading={saveStatus.isWorking}
            key={t('photo_proof_submit')}
            title={t('photo_proof_submit')}
            onPress={this.upload}
            style={styles.button}
            color={colors.white}
            highlightColor={colors.background}
            highlightTitleColor={colors.white}
          />
        </View>
      : <View style={styles.controls}>
          {capturing
            ? <ActivityIndicator />
            : <CircleButton
                key={t('capture_photo')}
                title={t('capture_photo')}
                onPress={this.onCapturePress}
                style={styles.button}
                color={colors.white}
                size={11}
                highlightColor={colors.background}
                highlightTitleColor={colors.white}
              />}
        </View>
  }

  choosePreview = () => {
    const { media } = this.state

    return this.props.isPhotoCaptured
      ? <Image
          style={styles.preview}
          source={{
            uri: media ? media.path : null
          }}
        />
      : Platform.OS === 'android'
        ? <Camera
            ref={cam => {
              this.camera = cam
            }}
            playSoundOnCapture={false}
            style={styles.preview}
            captureAudio={false}
            captureTarget={Camera.constants.CaptureTarget.temp}
            captureQuality={'medium'}
          />
        : <Camera
            ref={cam => {
              this.camera = cam
            }}
            style={styles.preview}
            captureAudio={false}
            captureTarget={Camera.constants.CaptureTarget.temp}
          />
  }

  render() {
    if (!this.isPermissionReady()) return <View style={styles.container} />
    return (
      <View style={styles.container}>
        {this.choosePreview()}
        {this.renderBottomControlPanel()}
      </View>
    )
  }
}

PhotoPODScreen.propTypes = {
  storeImageProof: PropsType.func.isRequired,
  saveStatus: PropsType.object,
  isPhotoCaptured: PropsType.bool,
  photoCaptured: PropsType.func
}

const mapDispatchToProps = dispatch => ({
  dispatch
})

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps
  return {
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    storeImageProof: pod => {
      dispatch(saveImageToDiskRequest({ pod }))
    },
    photoCaptured: result => dispatch(photoCaptured(result))
  }
}

const mapStateToProps = state => {
  const photoCaptured = getIsPhotoCaptured(state)

  const saveStatus = s.getSaveImageStatus(state)
  return {
    isPhotoCaptured: photoCaptured,
    saveStatus
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  PhotoPODScreen
)
