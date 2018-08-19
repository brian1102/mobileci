import PropTypes from 'prop-types'
import React from 'react'
import {
  Dimensions,
  Keyboard,
  TextInput,
  TouchableOpacity as RNTouchableOpacity
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Theme, { createStyle, createThemedComponent } from 'react-native-theming'
import ThemeLinear from '../../components/ThemeLinear'
import { colors, font } from '../../../../theme/index'
import RoundedButton from '../../../../components/rounded-button/RoundedButton'
import tr from '../../../../i18n/i18n'
import connect from '../../../../utils/connect'
import a from '../../../../state/actions'
import * as s from '../../../../state/selectors'
import * as t from '../../../../state/actionsType'

const View = Theme.View
const Text = Theme.Text
const Image = Theme.Image
const TouchableOpacity = createThemedComponent(RNTouchableOpacity)

const width = Dimensions.get('window').width
const scale = width / 1084

const styles = createStyle({
  container: {
    flex: 1,
    alignSelf: 'stretch'
  },
  backbutton: {
    position: 'absolute',
    top: 5,
    left: 5,
    backgroundColor: 'transparent',
    padding: 15
  },
  gradient: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  logo: {
    width: 488 * scale,
    height: 516 * scale
  },
  appName: {
    fontSize: font.sizes.small,
    color: colors.title,
    backgroundColor: 'transparent'
  },
  code: {
    backgroundColor: colors.title,
    width: 420 * scale,
    height: 136 * scale,
    margin: 32,
    borderRadius: 9999,
    paddingHorizontal: 24,
    shadowColor: '#367010',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: {
      height: 5
    },
    elevation: 10
  },
  changeNumberButton: {
    marginTop: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.title,
    borderBottomWidth: 1,
    borderBottomColor: colors.title
  },
  doneButton: {
    paddingRight: 13
  },
  enterPhone: {
    marginTop: 16,
    color: '#d85747',
    fontSize: font.sizes.tiny,
    textAlign: 'center',
    backgroundColor: 'transparent'
  },
  phoneNumber: {
    alignSelf: 'stretch',
    paddingTop: 16,
    color: colors.darkerGray,
    fontSize: font.sizes.small,
    textAlign: 'center'
  },
  terms: {
    marginTop: 16,
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    marginBottom: 16
  },
  alert: {
    backgroundColor: '#d85747',
    width,
    color: colors.title,
    padding: 8,
    paddingHorizontal: 64,
    textAlign: 'center',
    marginBottom: 16
  },
  agreeButton: {
    borderColor: colors.title
  }
})

class VerifyOtpScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: ''
    }
  }

  onSubmit = () => {
    const { code, sendCode } = this.props
    this.setState({ error: '' })

    Keyboard.dismiss()
    if (code === null || code.trim() === '' || code.length < 6) {
      this.setState({ error: tr('error_invalid_code') })
    } else {
      sendCode()
    }
  }

  render() {
    const {
      code,
      updateCode,
      verifyOTPStatus,
      doOnLoggedStatus,
      onPressBack
    } = this.props
    const { error } = this.state

    return (
      <View style={styles.container}>
        <ThemeLinear start="@gradStart" end="@gradEnd" style={styles.gradient}>
          <Image
            source={'@logoSplash'}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.appName}>{tr('app_name')}</Text>
          <View style={styles.content}>
            <View style={styles.code}>
              <TextInput
                underlineColorAndroid="transparent"
                placeholder={tr('auth_screen_code_placeholder')}
                style={{ flex: 1, alignSelf: 'stretch' }}
                onChangeText={updateCode}
                value={code}
                autoFocus
                multiline={false}
                numberOfLines={1}
                returnKeyType="done"
                keyboardType="phone-pad"
                blurOnSubmit
              />
            </View>

            {(error || verifyOTPStatus.error || doOnLoggedStatus.error) &&
              <Text style={styles.alert}>
                {error || verifyOTPStatus.error || doOnLoggedStatus.error}
              </Text>}
            <RoundedButton
              style={styles.agreeButton}
              onPress={this.onSubmit}
              color="#ffffff"
              isLoading={
                (verifyOTPStatus && verifyOTPStatus.isWorking) ||
                (doOnLoggedStatus && doOnLoggedStatus.isWorking)
              }
            >
              <Text style={{ color: '#fafbfc' }}>
                {tr('chats_thread_fragment_button_send').toUpperCase()}
              </Text>
            </RoundedButton>
            <Text style={styles.enterPhone}>
              {tr('auth_screen_instruction2')}
            </Text>
          </View>
        </ThemeLinear>
        <TouchableOpacity style={styles.backbutton}>
          <Ionicons
            name="ios-arrow-round-back"
            color="white"
            size={35}
            onPress={onPressBack}
          />
        </TouchableOpacity>
      </View>
    )
  }
}

VerifyOtpScreen.propTypes = {
  doOnLoggedStatus: PropTypes.object,
  code: PropTypes.string,
  onPressBack: PropTypes.func,
  verifyOTPStatus: PropTypes.object,
  sendCode: PropTypes.func.isRequired,
  updateCode: PropTypes.func.isRequired
}

VerifyOtpScreen.defaultProps = {
  code: null,
  phoneNumber: null,
  countryPrefix: null
}

VerifyOtpScreen.navigationOptions = {
  header: null
}

const mapStateToProps = state => ({
  code: s.getCode(state),
  countryPrefix: s.getCountryPrefix(state),
  phoneNumber: s.getPhoneNumber(state),
  verifyOTPStatus: s.getVerifyOTPStatus(state),
  doOnLoggedStatus: s.getDoOnLoggedStatus(state)
})

const mapDispatchToProps = dispatch => ({
  changePhoneNumber: () => {
    dispatch(a[t.NAVIGATE]('Login'))
  },
  updateCode: code => {
    dispatch(a[t.UPDATE_CODE](code))
  },
  sendCode: () => {
    dispatch(a[t.VERIFY_OTP_REQUEST]())
  },
  onPressBack: () => {
    dispatch(a[t.BACK]())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(VerifyOtpScreen)
