import PropTypes from 'prop-types'
import React from 'react'
import { TouchableHighlight } from 'react-native'

const NativeFeedback = ({ children, onPress, style }) =>
  <TouchableHighlight style={style} onPress={onPress} underlayColor={null}>
    {children}
  </TouchableHighlight>

NativeFeedback.propTypes = {
  children: PropTypes.node.isRequired,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.any
}

export default NativeFeedback
