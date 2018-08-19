import PropTypes from 'prop-types'
import React from 'react'
import { Text, TextInput, View, Alert } from 'react-native'
import SignatureCapture from 'react-native-signature-capture'
import { bindActionCreators } from 'redux'
import connect from '../../../../../../../utils/connect'
import { getUserInfo } from '../../../../../../../state/user/selectors'
import * as s from '../../../../../../../state/selectors'
import a from '../../../../../../../state/actions'
import * as t from '../../../../../../../state/actionsType'
import RoundedButton from '../../../../../../../components/rounded-button/RoundedButton'
import tr from '../../../../../../../i18n/i18n'
import CheckBox from '../../../../../../../components/checkbox/CheckBox'
import { colors } from '../../../../../../../theme/index'
import styles from './signaturePOD.styles'
import Header from '../../../../../../../components/header/Header.component'

class SignaturePODScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      empty: true,
      cashCollected: false
    }
  }

  static navigationOptions = {
    header: props => <Header {...props} title={tr('signature').toUpperCase()} />
  }

  componentDidMount() {
    const { onRecipientChange } = this.props
    onRecipientChange('')
  }

  onDragEvent = () =>
    this.setState({
      empty: false
    })

  clear = () => {
    this.sign.resetImage()
    this.setState({
      empty: true
    })
  }

  submit = () => {
    const { empty } = this.state
    if (empty) {
      Alert.alert(tr('error_no_sign'))
    } else {
      this.sign.saveImage()
    }
  }

  render() {
    const {
      currentTask,
      driverName,
      onSaveEvent,
      onRecipientChange,
      recipient,
      saveStatus
    } = this.props
    const { empty } = this.state

    return (
      <View style={styles.container}>
        <View style={styles.signatureContainer}>
          <SignatureCapture
            style={styles.signature}
            ref={sign => {
              this.sign = sign
            }}
            onSaveEvent={result => onSaveEvent(result)}
            onDragEvent={this.onDragEvent}
            showNativeButtons={false}
            showTitleLabel={false}
            viewMode={'portrait'}
          />

          <View style={styles.signatureOverlay} pointerEvents="none">
            <Text style={styles.watermark}>
              {tr(
                'signature_here',
                currentTask && currentTask.contacts
                  ? currentTask.contacts.name
                  : ''
              )}
            </Text>
          </View>
        </View>

        <View style={styles.textInputWrapper}>
          <TextInput
            style={styles.textInput}
            selectionColor={colors.background}
            underlineColorAndroid="#dddddd"
            placeholder={tr('actual_recipient')}
            placeholderTextColor="#898989"
            onChangeText={onRecipientChange}
            value={recipient && recipient}
          />
        </View>

        <View style={styles.footer}>
          {currentTask &&
            currentTask.codEnable &&
            <View style={styles.cod}>
              <CheckBox
                label={tr('cod_pod', driverName)}
                labelStyle={styles.checkBoxText}
                iconSize={35}
                iconName="iosCircleFill"
                checkedColor="#008080"
                uncheckedColor="#000"
                onChange={cashCollected => {
                  this.setState({ cashCollected })
                }}
              />
            </View>}
          <View style={styles.buttons}>
            <RoundedButton
              title={tr('signature_clear')}
              onPress={this.clear}
              style={styles.button}
              enabled={!empty}
            />
            <RoundedButton
              isLoading={saveStatus.isWorking}
              title={tr('signature_submit')}
              onPress={this.submit}
              style={styles.button}
              enabled={
                !empty &&
                currentTask &&
                ((currentTask.codEnable && this.state.cashCollected) ||
                  !currentTask.codEnable)
              }
            />
          </View>
        </View>
      </View>
    )
  }
}

SignaturePODScreen.propTypes = {
  currentTask: PropTypes.object,
  driverName: PropTypes.string,
  onRecipientChange: PropTypes.func,
  onSaveEvent: PropTypes.func.isRequired,
  recipient: PropTypes.string,
  saveStatus: PropTypes.object
}

SignaturePODScreen.defaultProps = {
  codEnable: false,
  driverName: '',
  recipient: null
}

const mapStateToProps = state => {
  const currentTask = s.getCurrentTask(state)
  const driverName = getUserInfo(state).name
  const saveStatus = s.getSaveImageStatus(state)

  return {
    currentTask,
    driverName,
    saveStatus
  }
}

const mapDispatchToProps = dispatch => ({
  dispatch,
  act: bindActionCreators(a, dispatch),
  onRecipientChange: recipient => dispatch(a[t.UPDATE_RECIPIENT](recipient))
})

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { act } = dispatchProps
  return {
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    onSaveEvent: result => {
      // react-native-signature-capture has an issue that it can's save signature image.
      // The bug is only happens on some devices. So we will use base64.
      const signature = result.encoded
      act[t.SAVE_IMAGE_TO_DISK_REQUEST]({ signature })
    }
  }
}

const SignaturePODScreenContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(SignaturePODScreen)

export default SignaturePODScreenContainer
