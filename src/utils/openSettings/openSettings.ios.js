import { Linking } from 'react-native'

const settingsURL = 'App-Prefs:root'

export const openLocationSettings = async () => {
  const canOpen = await Linking.canOpenURL(settingsURL)
  if (canOpen) {
    Linking.openURL(settingsURL)
  }
}
