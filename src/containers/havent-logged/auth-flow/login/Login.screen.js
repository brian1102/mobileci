import PropTypes from 'prop-types'
import React from 'react'
import { Keyboard, Text, TextInput } from 'react-native'
import Toast from 'react-native-easy-toast'
import Theme from 'react-native-theming'
import RoundedButton from '../../../../components/rounded-button/RoundedButton'
import tr from '../../../../i18n/i18n'
import { data } from '../../../../theme/index'
import connect from '../../../../utils/connect'
import a from '../../../../state/actions'
import * as t from '../../../../state/actionsType'
import * as s from '../../../../state/selectors'
import styles from './login.styles'
import Config from '../../../../config/index'
import { wakeUpDevelopmentMode } from '../../../../utils/developmentMode'
import GlobalObj from '../../../../utils/globalObj'
import ThemeLinear from '../../components/ThemeLinear'

const config = {
  pressedCount: 0,
  mToast: null
}

class LoginScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showError: false
    }
  }

  onSubmit = () => {
    const {
      licenseAgreed,
      navigateToLicense,
      phoneNumber,
      onSubmit
    } = this.props
    this.setState({ showError: false })
    Keyboard.dismiss()
    if (phoneNumber.trim() === '') {
      this.setState({ showError: true })
    } else if (licenseAgreed === false && Config().THEME === 'yojee') {
      // TODO just a temporary disable while waiting t&c from scharff
      navigateToLicense()
    } else {
      onSubmit()
    }
  }

  onGotoDevScreen = () => this.props.navigateToDevScreen()
  gotoCustomEndpoint = () => this.props.navigateToCustomEndpoint()

  render() {
    const {
      phoneNumber,
      updatePhoneNumber,
      getOTPStatus,
      doOnLoggedStatus
    } = this.props
    const { showError } = this.state

    const errorMessage = getOTPStatus.error
      ? getOTPStatus.error
      : doOnLoggedStatus.error
        ? doOnLoggedStatus.error
        : showError ? tr('error_invalid_input') : 'Unexpected server error'

    return (
      <Theme.View style={styles.container}>
        <ThemeLinear start="@gradStart" end="@gradEnd" style={styles.gradient}>
          <Theme.Image
            source={'@logoSplash'}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text
            style={styles.appName}
            onPress={() => wakeUpDevelopmentMode(config)}
          >
            {tr('app_name')}
          </Text>
          <Theme.View style={styles.content}>
            <Theme.View style={styles.phoneNumber}>
              <TextInput
                underlineColorAndroid="transparent"
                placeholder={tr('enter_phone')}
                onChangeText={updatePhoneNumber}
                style={{ flex: 1, alignSelf: 'stretch' }}
                value={phoneNumber}
                multiline={false}
                numberOfLines={1}
                returnKeyType="done"
                keyboardType="phone-pad"
                blurOnSubmit
              />
            </Theme.View>
            {(getOTPStatus.error || doOnLoggedStatus.error || showError) &&
              <Text style={styles.alert}>
                {errorMessage}
              </Text>}
            <RoundedButton
              style={styles.agreeButton}
              onPress={this.onSubmit}
              color="#ffffff"
              isLoading={getOTPStatus.isWorking}
            >
              <Text style={styles.loginButtonText}>
                {tr('auth_screen_title').toUpperCase()}
              </Text>
            </RoundedButton>

            {GlobalObj.isDevelopmentEnable &&
              <Theme.View>
                <RoundedButton
                  style={[styles.agreeButton, { marginTop: 10 }]}
                  onPress={this.onGotoDevScreen}
                  color="#ffffff"
                >
                  <Text style={{ color: '#fafbfc', textAlign: 'center' }}>
                    Choose company
                  </Text>
                </RoundedButton>
                <RoundedButton
                  style={[styles.agreeButton, { marginTop: 10 }]}
                  onPress={this.gotoCustomEndpoint}
                  color="#ffffff"
                >
                  <Text style={{ color: '#fafbfc' }}>
                    Point to local
                  </Text>
                </RoundedButton>
              </Theme.View>}
          </Theme.View>
        </ThemeLinear>
        <Toast
          ref={c => {
            config.mToast = c
          }}
        />
      </Theme.View>
    )
  }
}

LoginScreen.propTypes = {
  getOTPStatus: PropTypes.object,
  doOnLoggedStatus: PropTypes.object,
  licenseAgreed: PropTypes.bool.isRequired,
  navigateToLicense: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  phoneNumber: PropTypes.string,
  updatePhoneNumber: PropTypes.func.isRequired,
  navigateToDevScreen: PropTypes.func.isRequired,
  navigateToCustomEndpoint: PropTypes.func.isRequired
}

LoginScreen.defaultProps = {
  phoneNumber: null,
  countryName: ' ',
  countryPrefix: null
}

LoginScreen.navigationOptions = {
  header: null
}

const mapStateToProps = state => ({
  countryName: s.getCountryName(state),
  countryPrefix: s.getCountryPrefix(state),
  phoneNumber: s.getPhoneNumber(state),
  showNoCodeReceived: s.getShowNoCodeReceived(state),
  licenseAgreed: s.getLicenseAgreed(state),
  getOTPStatus: s.getGetOTPStatus(state),
  doOnLoggedStatus: s.getDoOnLoggedStatus(state)
})

const mapDispatchToProps = dispatch => ({
  navigateToLicense: () => dispatch(a[t.NAVIGATE]('TermAndConditions')),
  navigateToDevScreen: () => dispatch(a[t.NAVIGATE]('EnvironmentSelector')),
  navigateToCustomEndpoint: () => dispatch(a[t.NAVIGATE]('CustomEndpoint')),
  onSubmit: () => {
    Keyboard.dismiss()
    dispatch(a[t.LOGIN_REQUEST]())
  },
  selectCountry: () => dispatch(a[t.NAVIGATE]('CountrySelector')),
  updatePhoneNumber: phoneNumber =>
    dispatch(a[t.UPDATE_PHONE_NUMBER](phoneNumber)),
  updateCountryPrefix: countryPrefixRaw => {
    const countryPrefix = countryPrefixRaw.split('+').join('')
    const country = data.countries.countries.find(c => c.ic === countryPrefix)
    dispatch(a[t.UPDATE_COUNTRY_PREFIX](countryPrefix))
    if (country) {
      dispatch(a[t.UPDATE_COUNTRY_NAME](country.cn))
    } else {
      dispatch(a[t.UPDATE_COUNTRY_NAME](' '))
    }
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
