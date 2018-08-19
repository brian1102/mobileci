import React from 'react'
import { Text, TextInput, View, Alert } from 'react-native'
import CodePush from 'react-native-code-push'
import RoundedButton from '../../../components/rounded-button/RoundedButton'
import styles from './customEndpoint.styles'
import Config from '../../../config/index'
import {
  setCustomEndpoint,
  enableDevelopmentMode,
  setCustomChatEnv
} from '../../../utils/developmentMode'
import Header from '../../../components/header/Header.component'
import ThemeLinear from '../../havent-logged/components/ThemeLinear'

class HidenScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      endpoint: Config().BASE_URL,
      chatENV: Config().CHAT_ENV
    }
  }

  static navigationOptions = {
    header: props => <Header {...props} title={'Change endpoint'} />
  }

  onSubmit = async () => {
    if (!this.state.endpoint || !this.state.chatENV) {
      Alert.alert('Notice', 'Nothing changed')
      return
    }

    await enableDevelopmentMode()
    await setCustomEndpoint(this.state.endpoint)
    await setCustomChatEnv(this.state.chatENV)
    CodePush.restartApp()
  }

  render() {
    return (
      <View style={styles.container}>
        <ThemeLinear start="@gradStart" end="@gradEnd" style={styles.gradient}>

          <Text style={styles.appName}>
            Endpoint
          </Text>

          <View style={styles.content}>
            <View style={styles.phoneNumber}>
              <TextInput
                underlineColorAndroid="transparent"
                placeholder={'eg http://umbr-dev.yojee.com'}
                onChangeText={endpoint => this.setState({ endpoint })}
                style={{ flex: 1, alignSelf: 'stretch' }}
                value={this.state.endpoint}
                multiline
                numberOfLines={2}
                returnKeyType="done"
                blurOnSubmit
              />
            </View>
            <Text style={styles.appName}>
              Chat ENV
            </Text>
            <View style={styles.phoneNumber}>
              <TextInput
                underlineColorAndroid="transparent"
                placeholder={'Chat env, eg: dev'}
                onChangeText={chatENV => this.setState({ chatENV })}
                style={{ flex: 1, alignSelf: 'stretch' }}
                value={this.state.chatENV}
                multiline={false}
                numberOfLines={1}
                returnKeyType="done"
                blurOnSubmit
              />
            </View>

            <RoundedButton
              style={styles.agreeButton}
              onPress={this.onSubmit}
              color="#ffffff"
            >
              <Text style={{ color: '#fafbfc' }}>
                OK
              </Text>
            </RoundedButton>
          </View>
        </ThemeLinear>

      </View>
    )
  }
}

HidenScreen.defaultProps = {}

export default HidenScreen
