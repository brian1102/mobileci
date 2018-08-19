import React from 'react'
import {
  Text,
  ScrollView,
  Image,
  View,
  TouchableOpacity,
  AsyncStorage
} from 'react-native'
import RoundedButton from '../../../components/rounded-button/RoundedButton'
import styles from './environmentSelector.styles'
import Config from '../../../config/index'
import {
  setCustomEndpoint,
  setCustomChatEnv,
  setCustomCompanySlug,
  setCustomTheme,
  setLanguage,
  setCustomShowServiceType,
  enableDevelopmentMode
} from '../../../utils/developmentMode'
import config from './env'
import Header from '../../../components/header/Header.component'
import ThemeLinear from '../../havent-logged/components/ThemeLinear'

const brandImages = {
  scharff: require('../../../theme/assets/images/scharff/logo_splash.png'),
  yojee: require('../../../theme/assets/images/yojee/logo_splash.png'),
  ups: require('../../../theme/assets/images/ups/logo_splash.png'),
  tasman: require('../../../theme/assets/images/tasman/logo_splash.png')
}

class EnvSelector extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      endpoint: Config().BASE_URL,
      theme: Config().THEME,
      slug: Config().COMPANY_SLUG,
      chatEnv: Config().CHAT_ENV,
      defaultLang: Config().DEFAULT_LANG,
      showServiceType: Config().SHOW_SERVICE_TYPE
    }
  }

  static navigationOptions = {
    header: props => <Header {...props} title={'Change environment'} />
  }

  isMatchCurrentBrand = brand => {
    return (
      brand.COMPANY_SLUG === this.state.slug && brand.THEME === this.state.theme
    )
  }

  isMatchCurrentEnv = env => {
    return (
      env.CHAT_ENV === this.state.chatEnv &&
      env.BASE_URL === this.state.endpoint
    )
  }

  renderEnv = item => {
    return (
      <TouchableOpacity
        onPress={() =>
          this.setState({
            chatEnv: item.CHAT_ENV,
            endpoint: item.BASE_URL
          })}
        key={item.TITLE}
        style={[
          styles.envView,
          this.isMatchCurrentEnv(item) ? styles.active : null
        ]}
      >
        <Text>{item.TITLE}</Text>
        <Text>BASE URL: {item.BASE_URL}</Text>
        <Text>Chat ENV: {item.CHAT_ENV}</Text>
      </TouchableOpacity>
    )
  }

  onSubmit = async () => {
    await AsyncStorage.clear()
    if (this.state.endpoint) await setCustomEndpoint(this.state.endpoint)
    if (this.state.chatEnv) await setCustomChatEnv(this.state.chatEnv)
    if (this.state.slug) await setCustomCompanySlug(this.state.slug)
    if (this.state.theme) await setCustomTheme(this.state.theme)
    if (this.state.defaultLang) await setLanguage(this.state.defaultLang)
    await setCustomShowServiceType(this.state.showServiceType)
    await enableDevelopmentMode()
  }

  renderBrand = item => {
    return (
      <TouchableOpacity
        onPress={() =>
          this.setState({
            theme: item.THEME,
            slug: item.COMPANY_SLUG,
            defaultLang: item.DEFAULT_LANG,
            showServiceType: item.SHOW_SERVICE_TYPE
          })}
        key={item.TITLE}
        style={[
          styles.brandView,
          this.isMatchCurrentBrand(item) ? styles.active : null
        ]}
      >
        <Image
          source={brandImages[item.THEME]}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.brandText}>{item.TITLE}</Text>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <ThemeLinear start="@gradStart" end="@gradEnd" style={styles.gradient}>
          <Text style={styles.title}>
            Choose one brand:
          </Text>

          <View style={styles.brandChoose}>
            {Object.keys(config.brands).map(key =>
              this.renderBrand(config.brands[key])
            )}
          </View>

          <Text style={styles.title}>
            Choose environment:
          </Text>

          <View style={styles.envChoose}>
            {Object.keys(config.envs).map(key =>
              this.renderEnv(config.envs[key])
            )}
          </View>

          <View style={styles.buttonContainer}>
            <RoundedButton
              style={styles.agreeButton}
              onPress={this.onSubmit}
              color="#ffffff"
            >
              <Text style={styles.brandText}>
                Save
              </Text>
            </RoundedButton>
          </View>
        </ThemeLinear>

      </ScrollView>
    )
  }
}

EnvSelector.defaultProps = {}

export default EnvSelector
