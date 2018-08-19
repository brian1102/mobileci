import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text } from 'react-native'

const styles = StyleSheet.create({
  container: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderColor: 'blue',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  circleInside: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center'
  },
  character: {
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    fontSize: 12,
    paddingLeft: 1
  },
})

const MarkerCircleView = ({ character, circleSize, circleColor, paddingInside, textStyle }) => {
  const extCircleContainterStyle = {
    width: circleSize,
    height: circleSize,
    padding: 3,
    borderRadius: circleSize / 2
  }

  const extCircleInsideStyle = {
    width: circleSize - paddingInside,
    height: circleSize - paddingInside,
    borderRadius: (circleSize - paddingInside) / 2
  }

  if (circleColor) {
    extCircleContainterStyle.borderColor = circleColor
    extCircleInsideStyle.backgroundColor = circleColor
  }

  return (
    <View style={[styles.container, extCircleContainterStyle]}>
      <View style={[styles.circleInside, extCircleInsideStyle]}>
        <Text style={[styles.character, textStyle]}>{character}</Text>
      </View>
    </View>
  )
}

MarkerCircleView.propTypes = {
  character: PropTypes.string,
  circleSize: PropTypes.number,
  circleColor: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  paddingInside: PropTypes.number,
  textStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
}

MarkerCircleView.defaultProps = {
  paddingInside: 10,
  character: 'P',
  circleSize: 36,
  textStyle: {
    fontSize: 14
  }
}

export default MarkerCircleView
