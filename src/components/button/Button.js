import React from 'react'
import { ActivityIndicator } from 'react-native'
import Button from 'react-native-button'
import styles from './button.styles'

const getLoadingSpinner = loadingColor =>
  <ActivityIndicator color={loadingColor ? loadingColor : 'white'} /> // eslint-disable-line

/**
 * Custom button component with default styles
 * Disabled and shows spinner when isLoading is true
 */
function MainButton({
  children,
  style,
  containerStyle,
  isLoading,
  loadingColor,
  ...props
}) {
  return (
    <Button
      containerStyle={[styles.btnContainer, containerStyle]}
      style={[styles.btnText, style]}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? getLoadingSpinner(loadingColor) : children}
    </Button>
  )
}

MainButton.propTypes = {
  ...Button.propTypes
}

export default MainButton
