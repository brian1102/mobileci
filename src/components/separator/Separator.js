import React from 'react'
import { StyleSheet, View } from 'react-native'
import { colors } from '../../theme/index'

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: colors.lightGray,
    marginLeft: 20,
    marginRight: 20,
  },
})

const Separator = () => <View style={styles.separator} />

export default Separator
