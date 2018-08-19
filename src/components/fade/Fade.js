import PropTypes from 'prop-types'
import React from 'react'
import { Animated, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    position: 'absolute',
    backgroundColor: 'rgba(25, 25, 25, 0.5)'
  }
})

class Fade extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      oldChildren: null,
      animatedAlpha: new Animated.Value(0)
    }
  }

  componentWillReceiveProps() {
    const { children: oldChildren } = this.props

    this.setState(
      {
        oldChildren
      },
      () => this.startAnimation()
    )
  }

  startAnimation = () => {
    const { animatedAlpha } = this.state
    animatedAlpha.setValue(0)

    Animated.timing(animatedAlpha, {
      toValue: 1,
      duration: 600
    }).start(this.reset)
  }

  reset = () =>
    this.setState({
      oldChildren: null
    })

  render() {
    const { backgroundColor, children } = this.props
    const { animatedAlpha, oldChildren } = this.state

    if (children === null && oldChildren === null) {
      return null
    }

    const fadeIn = oldChildren === null
    const comp = fadeIn ? children : oldChildren

    const contentStyle = {
      opacity: animatedAlpha.interpolate({
        inputRange: [0, 1],
        outputRange: fadeIn ? [0, 1] : [1, 0]
      }),
      transform: [
        {
          scale: animatedAlpha.interpolate({
            inputRange: [0, 1],
            outputRange: fadeIn ? [0.7, 1] : [1, 0.7]
          })
        }
      ]
    }

    const containerStyle = {
      opacity: animatedAlpha.interpolate({
        inputRange: [0, 1],
        outputRange: fadeIn ? [0, 1] : [1, 0]
      })
    }

    return (
      <Animated.View
        style={[styles.container, { backgroundColor }, containerStyle]}
      >
        <Animated.View style={[styles.container, contentStyle]}>
          {comp}
        </Animated.View>
      </Animated.View>
    )
  }
}

Fade.propTypes = {
  backgroundColor: PropTypes.string,
  children: PropTypes.any
}

export default Fade
