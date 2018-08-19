import { Dimensions, StyleSheet } from 'react-native'

import { colors, font } from '../../../theme'

const scale = Dimensions.get('window').width / 1084

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch'
  },
  gradient: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width: 488 * scale,
    height: 516 * scale
  },
  fingerprint: {
    width: 306 * scale,
    height: 306 * scale
  },
  appName: {
    fontSize: font.sizes.small,
    color: colors.white,
    backgroundColor: colors.transparent
  },
  loginWithTouchId: {
    marginTop: 100 * scale,
    fontSize: font.sizes.smaller,
    color: colors.white,
    backgroundColor: colors.transparent
  },
  registerHere: {
    marginTop: 234 * scale,
    fontSize: font.sizes.tiny,
    color: colors.white,
    width: 200,
    backgroundColor: colors.transparent,
    textAlign: 'center'
  },
  touchIdContainer: {
    marginTop: 180 * scale,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  }
})

export default styles
