import React from 'react'
import PropTypes from 'prop-types'
import { Text, StyleSheet } from 'react-native'
import ProgressCircle from './Base'

const styles = StyleSheet.create({
  container: {},
})

const CircleProgress = ({
  percent,
  radius,
  borderWidth,
  color,
  shadowColor,
  style,
  textStyle,
  text,
  subTextStyle,
  subText,
}) => {
  return (
    <ProgressCircle
      percent={percent}
      radius={radius}
      borderWidth={borderWidth}
      color={color}
      shadowColor={shadowColor}
      style={[styles.container, style]}
      bgColor="#fff"
    >
      <Text style={textStyle}>{text}</Text>
      {subText && <Text style={subTextStyle}>{subText}</Text>}
    </ProgressCircle>
  )
}

CircleProgress.propTypes = {
  percent: PropTypes.number,
  radius: PropTypes.number,
  borderWidth: PropTypes.number,
  color: PropTypes.string,
  shadowColor: PropTypes.string,
  style: PropTypes.any,
  textStyle: PropTypes.any,
  text: PropTypes.string,
  subTextStyle: PropTypes.any,
  subText: PropTypes.string,
}

export default CircleProgress
