import { DURATION } from 'react-native-easy-toast'
import CodePush from 'react-native-code-push'
import { AsyncStorage } from 'react-native'

export async function setLanguage(lang) {
  return AsyncStorage.setItem('language', lang)
}

export async function setCustomShowServiceType(shouldShow) {
  return AsyncStorage.setItem(
    '@yojee_development_setCustomShowServiceType',
    `${shouldShow}`
  )
}

export async function setCustomCompanySlug(slug) {
  return AsyncStorage.setItem('@yojee_development_mode_slug', slug)
}

export async function setCustomTheme(theme) {
  return AsyncStorage.setItem('@yojee_development_mode_theme', theme)
}

export async function setCustomEndpoint(endpoint) {
  return AsyncStorage.setItem('@yojee_development_mode_endpoint', endpoint)
}

export async function setCustomChatEnv(chatENV) {
  return AsyncStorage.setItem('@yojee_development_mode_chat_env', chatENV)
}

export async function getCustomEndpoint() {
  try {
    return await AsyncStorage.getItem('@yojee_development_mode_endpoint')
  } catch (err) {
    return null
  }
}
export async function getCustomShowServiceType() {
  try {
    return await AsyncStorage.getItem(
      '@yojee_development_setCustomShowServiceType'
    )
  } catch (err) {
    return null
  }
}
export async function getLanguage() {
  try {
    return await AsyncStorage.getItem('language')
  } catch (err) {
    return null
  }
}

export async function getCustomChatENV() {
  try {
    return await AsyncStorage.getItem('@yojee_development_mode_chat_env')
  } catch (err) {
    return null
  }
}

export async function getCustomTheme() {
  try {
    return await AsyncStorage.getItem('@yojee_development_mode_theme')
  } catch (err) {
    return null
  }
}

export async function getCustomCompanySlug() {
  try {
    return await AsyncStorage.getItem('@yojee_development_mode_slug')
  } catch (err) {
    return null
  }
}

export async function isDevelopmentEnable() {
  try {
    const mode = await AsyncStorage.getItem('@yojee_development_mode')
    return mode === '1'
  } catch (err) {
    return false
  }
}

export async function enableDevelopmentMode() {
  await AsyncStorage.setItem('@yojee_development_mode', '1')
  CodePush.restartApp()
}

let timeout = null

export const wakeUpDevelopmentMode = config => {
  const minimumTimeToWakeUpDevelopmentMode = 6
  const minimumTimeToShowToastOfWakeUpDevelopmentMode = 4
  // eslint-disable-next-line
  config.pressedCount = config.pressedCount + 1
  if (timeout) {
    clearTimeout(timeout)
  }
  const timeLeft = minimumTimeToWakeUpDevelopmentMode - config.pressedCount
  if (timeLeft < 0) return
  if (
    timeLeft <=
    minimumTimeToWakeUpDevelopmentMode -
      minimumTimeToShowToastOfWakeUpDevelopmentMode
  ) {
    if (timeLeft === 0) {
      if (config.mToast)
        config.mToast.show(`Development mode activated`, DURATION.LENGTH_SHORT)
      enableDevelopmentMode()
      return
    }
    if (config.mToast)
      config.mToast.show(
        `Press more ${timeLeft}  times to switch to development mode`,
        DURATION.LENGTH_SHORT
      )
  }

  timeout = setTimeout(() => {
    // eslint-disable-next-line
    config.pressedCount = 0
  }, 2000)
}
