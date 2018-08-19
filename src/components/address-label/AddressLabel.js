import PropTypes from 'prop-types'
import React from 'react'
import { StyleSheet, Text } from 'react-native'
import t from '../../i18n/i18n'
import { colors, font } from '../../theme/index'
import formatBold from '../../utils/formatBold'

const styles = StyleSheet.create({
  address: {
    paddingLeft: 8,
    fontSize: font.sizes.tiny,
    color: colors.background,
  },
})

// noinspection JSUnusedGlobalSymbols
const AddressLabel = ({ action, address, color, shouldClipAddress }) =>
  <Text
    style={[styles.address, color && { color }]}
    ellipsizeMode="tail"
    numberOfLines={shouldClipAddress ? 4 : 100}
  >
    {formatBold(
      t(action, typeof address === 'string' ? address : address.address)
    )}
  </Text>

AddressLabel.propTypes = {
  action: PropTypes.string.isRequired,
  address: PropTypes.any,
  color: PropTypes.string,
  shouldClipAddress: PropTypes.bool,
}

AddressLabel.defaultProps = {
  color: null,
  address: '',
}

// noinspection JSUnusedGlobalSymbols
export default AddressLabel
