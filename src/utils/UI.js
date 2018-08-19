import {
  Dimensions,
  Platform,
  InteractionManager,
  StatusBar,
} from 'react-native'

const runAfterInteractions = f => {
  let called = false
  const timeout = setTimeout(() => {
    called = true
    f()
  }, 500)
  InteractionManager.runAfterInteractions(() => {
    if (called) return
    clearTimeout(timeout)
    f()
  })
}

function isIphoneX() {
  const dimen = Dimensions.get('window')
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 812 || dimen.width === 812)
  )
}

function ifIphoneX(iphoneXStyle, regularStyle) {
  if (isIphoneX()) {
    return iphoneXStyle
  }
  return regularStyle
}

function getStatusBarHeight(skipAndroid) {
  if (Platform.OS === 'ios') {
    return ifIphoneX(44, 20)
  }

  if (skipAndroid) {
    return 0
  }

  return StatusBar.currentHeight
}

export default {
  runAfterInteractions,
  getStatusBarHeight,
}
