import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Animated } from 'react-native'
import CircularProgress from './CircularProgress'

const AnimatedProgress = Animated.createAnimatedComponent(CircularProgress)

export default class AnimatedCircularProgress extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chartFillAnimation: new Animated.Value(props.prefill || 0)
    }
  }

  componentDidMount() {
    this.animateFill()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.fill !== this.props.fill) {
      this.animateFill()
    }
  }

  animateFill() {
    const { tension, friction } = this.props

    Animated.spring(this.state.chartFillAnimation, {
      toValue: this.props.fill,
      tension,
      friction
    }).start()
  }

  render() {
    const { fill, prefill, children, style, ...other } = this.props

    return (
      <Animated.View style={this.props.style}>
        <AnimatedProgress {...other} fill={this.state.chartFillAnimation} />
        {children}
      </Animated.View>
    )
  }
}

AnimatedCircularProgress.propTypes = {
  style: PropTypes.any,
  size: PropTypes.number.isRequired,
  fill: PropTypes.number,
  prefill: PropTypes.number,
  width: PropTypes.number.isRequired,
  tintColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  tension: PropTypes.number,
  friction: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.array,
    PropTypes.object
  ])
}

AnimatedCircularProgress.defaultProps = {
  tension: 7,
  friction: 10
}
