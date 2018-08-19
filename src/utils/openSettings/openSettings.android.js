import RNANAndroidSettingsLibrary from 'react-native-android-settings-library'

export const openLocationSettings = async () => {
  RNANAndroidSettingsLibrary.open('ACTION_LOCATION_SOURCE_SETTINGS')
}

export const openAppDetailSetting = async () => {
  RNANAndroidSettingsLibrary.open('ACTION_APPLICATION_DETAILS_SETTINGS')
}
