import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { colors } from '../../theme/index'

const styles = StyleSheet.create({
  container: {},
  underline: {
    borderColor: colors.background,
    borderWidth: 1,
    top: -10,
    height: 1,
  },
})

const UnderlineTextInput = props =>
  <View style={props.style}>
    <TextInput
      {...props}
      style={[
        props.style,
        { fontSize: props.fontSize, textAlign: props.textAlign },
      ]}
      autoCorrect={false}
      autoCapitalize="none"
    />
    <View style={styles.underline} />
  </View>

UnderlineTextInput.propTypes = TextInput.propTypes

export default UnderlineTextInput
