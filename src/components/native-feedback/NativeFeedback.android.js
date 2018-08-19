import PropTypes from 'prop-types'
import React from 'react'
import { TouchableNativeFeedback } from 'react-native'

const NativeFeedback = ({ children, onPress, style }) =>
  <TouchableNativeFeedback
    delayPressIn={0}
    onPress={onPress}
    style={style}
    background={TouchableNativeFeedback.SelectableBackground()}
  >
    {children}
  </TouchableNativeFeedback>

NativeFeedback.propTypes = {
  children: PropTypes.node.isRequired,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.any,
}

export default NativeFeedback
