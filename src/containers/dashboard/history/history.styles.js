import { StyleSheet } from 'react-native'
import { colors } from '../../../theme'

export default StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f6f6f6'
  },
  tabBarUnderline: {
    backgroundColor: colors.white,
    height: 2
  },
  tabBarText: {
    fontWeight: '600',
    paddingTop: 10
  }
})
