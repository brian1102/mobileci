import PropTypes from 'prop-types'
import React from 'react'
import { Linking, StyleSheet, Text } from 'react-native'
import NativeFeedback from '../native-feedback/index'
import { colors } from '../../theme/index'

const styles = StyleSheet.create({
  link: {
    color: colors.link,
  },
})

const PhoneNumber = ({ number }) =>
  <NativeFeedback onPress={() => Linking.openURL(`tel:${number}`)}>
    <Text style={styles.link}>{number}</Text>
  </NativeFeedback>

PhoneNumber.propTypes = {
  number: PropTypes.string.isRequired,
}

export default PhoneNumber
