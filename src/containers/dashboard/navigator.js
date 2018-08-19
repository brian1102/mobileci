import React from 'react'
import { Dimensions } from 'react-native'
import { DrawerNavigator, StackNavigator } from 'react-navigation'
import Home from './home/Home.screen'
import ChatScreen from './chat/ChatScreenContainer'
import HistoryScreen from './history/History.screen'
import ProfileScreen from './profile/Profile.screen'
import LeftMenu from '../../components/left-menu/LeftMenu'
import SettingScreen from './settings/Setting.screen'
import ScannerScreen from './scanner/Scanner.screen'

const { width } = Dimensions.get('window')

const DashboardNavigator = DrawerNavigator(
  {
    root: {
      screen: StackNavigator({
        HomeScreen: {
          screen: Home
        }
      })
    },
    History: {
      screen: StackNavigator({
        HistoryScreen: {
          screen: HistoryScreen
        }
      })
    },
    Profile: {
      screen: ProfileScreen
    },
    Chat: {
      screen: StackNavigator({
        ChatScreen: {
          screen: ChatScreen
        }
      })
    },
    Setting: {
      screen: StackNavigator({
        SettingScreen: {
          screen: SettingScreen
        }
      })
    },
    Scanner: {
      screen: StackNavigator({
        ScannerScreen: {
          screen: ScannerScreen
        }
      })
    }
  },
  {
    drawerWidth: width * 0.9,
    drawerPosition: 'left',
    drawerBackgroundColor: 'white',
    contentComponent: props => <LeftMenu {...props} />
  }
)

DashboardNavigator.navigationOptions = {
  header: null
}

export default DashboardNavigator
