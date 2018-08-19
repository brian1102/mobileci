import PropTypes from 'prop-types'
import React from 'react'
import { Image, StyleSheet } from 'react-native'
import { images } from '../../theme'

const styles = StyleSheet.create({
  icon: {
    height: 64,
    marginRight: -8,
  },
})

const ActionIcon = ({ action, color }) =>
  <Image
    source={images.icons[action]}
    resizeMode="contain"
    style={[styles.icon, { tintColor: color }]}
  />

ActionIcon.propTypes = {
  action: PropTypes.string.isRequired,
  color: PropTypes.string,
}

export default ActionIcon
