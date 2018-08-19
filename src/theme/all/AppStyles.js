import { StyleSheet } from 'react-native'
import colors from './Colors'

export default StyleSheet.create({
  tabsContainerStyle: {
    margin: 8,
    marginLeft: 16,
    marginRight: 16,
  },
  tabStyle: {
    borderColor: colors.brand,
    borderWidth: 1,
    backgroundColor: colors.background,
  },
  tabTextStyle: {
    color: colors.brand,
    fontWeight: 'bold',
  },
  activeTabStyle: {
    backgroundColor: colors.brand,
  },
  activeTabTextStyle: {
    color: colors.title,
  },
})
