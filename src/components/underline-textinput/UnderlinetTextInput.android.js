import React from 'react'
import { TextInput } from 'react-native'

const UnderlineTextInput = props =>
  <TextInput {...props} style={[props.style, { fontSize: props.fontSize }]} />

UnderlineTextInput.propTypes = TextInput.propTypes

export default UnderlineTextInput
