import React, { Component } from 'react'
import PropTypes from 'prop-types'
import VersionNumber from 'react-native-version-number'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
  Clipboard
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
// Redux
import connect from '../../../utils/connect'
import a from '../../../state/actions'
import * as t from '../../../state/actionsType'
// Libraries
import tr from '../../../i18n'
// UI
import { colors } from '../../../theme'
import CardView from '../../../components/card-view'
import ActionSheet from '../../../components/action-sheet/ActionSheet'
import GlobalObj from '../../../utils/globalObj'
import {
  enableDevelopmentMode,
  wakeUpDevelopmentMode,
  setCustomEndpoint,
  setCustomChatEnv,
  setCustomCompanySlug,
  setCustomTheme,
  setLanguage,
  setCustomShowServiceType
} from '../../../utils/developmentMode'
import Config from '../../../config/index'
import FCMApi from '../../../api/push/FCMApi'
import Header from '../../../components/header/Header.component'

const devConfig = {
  pressedCount: 0,
  mToast: null
}

@connect(null, {
  setLanguage: a[t.SET_LANGUAGE],
  navigate: route => a[t.NAVIGATE](route)
})
export default class SettingScreen extends Component {
  static navigationOptions = {
    header: props =>
      <Header
        {...props}
        showMenuButton
        title={tr('settingsfrgmt_title').toUpperCase()}
      />
  }

  static propTypes = {
    setLanguage: PropTypes.func,
    navigate: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.languageOptions = [
      { value: null, label: tr('cancel') },
      ...tr.languages
    ]
    this.languageTitle = tr('select_language')

    this.state = {
      developmentEnable: false
    }
  }

  showLanguagePicker = () => {
    this.actionSheet.show(this.languageTitle, this.languageOptions, lang => {
      if (lang) this.props.setLanguage(lang)
    })
  }

  logOut = async () => {
    await AsyncStorage.clear()
    await setCustomEndpoint(Config().BASE_URL)
    await setCustomChatEnv(Config().CHAT_ENV)
    await setCustomCompanySlug(Config().COMPANY_SLUG)
    await setCustomTheme(Config().THEME)
    await setLanguage(Config().DEFAULT_LANG)
    await setCustomShowServiceType(Config().SHOW_SERVICE_TYPE)
    await enableDevelopmentMode()
  }

  renderDevelopmentView = () => {
    if (!GlobalObj.isDevelopmentEnable) return null
    return (
      <View>
        <TouchableOpacity onPress={() => this.props.navigate('CustomEndpoint')}>
          <CardView
            cardElevation={2}
            cornerRadius={10}
            style={styles.settingItemContainer}
            contentContainerStyle={styles.settingItemContentContainer}
          >
            <View style={styles.itemDescription}>
              <Text style={styles.settingItemTitle}>
                {'Development endpoint'}
              </Text>
              <Text style={styles.settingItemValue}>
                Change your endpoint to local
              </Text>
            </View>
            <Icon name="keyboard-arrow-right" size={32} />
          </CardView>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigate('EnvironmentSelector')}
        >
          <CardView
            cardElevation={2}
            cornerRadius={10}
            style={styles.settingItemContainer}
            contentContainerStyle={styles.settingItemContentContainer}
          >
            <View style={styles.itemDescription}>
              <Text style={styles.settingItemTitle}>
                {'Switch to another company'}
              </Text>
              <Text style={styles.settingItemValue}>
                Change your company
              </Text>
            </View>
            <Icon name="keyboard-arrow-right" size={32} />
          </CardView>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.logOut}>
          <CardView
            cardElevation={2}
            cornerRadius={10}
            style={styles.settingItemContainer}
            contentContainerStyle={styles.settingItemContentContainer}
          >
            <View style={styles.itemDescription}>
              <Text style={styles.settingItemTitle}>Logout</Text>
              <Text style={styles.settingItemValue}>
                Just press to logout the app
              </Text>
            </View>
          </CardView>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => Clipboard.setString(FCMApi.getCurrentFCMToken())}
        >
          <CardView
            cardElevation={2}
            cornerRadius={10}
            style={styles.settingItemContainer}
            contentContainerStyle={styles.settingItemContentContainer}
          >
            <View style={styles.itemDescription}>
              <Text style={styles.settingItemTitle}>Device token</Text>
              <Text style={styles.settingItemValue} numberOfLines={1}>
                Press to copy
                {': '}{FCMApi.getCurrentFCMToken()}
              </Text>
            </View>
          </CardView>
        </TouchableOpacity>

      </View>
    )
  }

  render() {
    const languageText = this.languageOptions.filter(
      lang => lang.value === tr.getLanguage()
    )

    return (
      <ScrollView style={styles.container}>
        <TouchableOpacity onPress={this.showLanguagePicker}>
          <CardView
            cardElevation={2}
            cornerRadius={10}
            style={styles.settingItemContainer}
            contentContainerStyle={styles.settingItemContentContainer}
          >
            <View style={styles.itemDescription}>
              <Text style={styles.settingItemTitle}>{tr('language')}</Text>
              <Text style={styles.settingItemValue}>
                {languageText.length > 0 && languageText[0].label}
              </Text>
            </View>
            <Icon name="keyboard-arrow-right" size={32} />
          </CardView>
        </TouchableOpacity>
        {this.renderDevelopmentView()}

        <Text
          style={styles.version}
          onPress={() => wakeUpDevelopmentMode(devConfig)}
        >
          {`${Config().THEME.toUpperCase()} ${VersionNumber.appVersion} - ${VersionNumber.buildVersion}`}
        </Text>
        <ActionSheet ref={o => (this.actionSheet = o)} cancelButtonIndex={0} />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#fafafa'
  },
  settingItemContainer: {
    backgroundColor: 'white',
    marginBottom: 5
  },
  settingItemContentContainer: {
    paddingTop: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemDescription: {
    flex: 1
  },
  settingItemTitle: {
    color: colors.inactive,
    marginBottom: 2
  },
  settingItemValue: {
    fontWeight: 'bold'
  },
  version: {
    marginTop: 20,
    color: 'gray',
    fontSize: 14,
    alignSelf: 'stretch',
    textAlign: 'center'
  }
})
