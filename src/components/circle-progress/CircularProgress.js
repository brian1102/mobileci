/* eslint-disable */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import Svg, { Defs, Stop, G, Path, LinearGradient } from 'react-native-svg'
import { arc } from 'd3-shape'
import range from 'lodash/range'
import { generateGradientColors } from '../../utils/Color'

const noOfSeg = 10
const LINEAR_GRADIENT_PREFIX_ID = 'gradientRing'
const r1 = 60
const r2 = 80

export default class CircularProgress extends Component {
  renderLinearGradients() {
    let startAngle = 0
    let stopAngle = 2 * Math.PI / noOfSeg
    const colors = generateGradientColors('#39a8e0', '#5bbd5b', noOfSeg + 1)

    return range(1, noOfSeg + 1).map(i => {
      const linearGradient = (
        <LinearGradient
          id={LINEAR_GRADIENT_PREFIX_ID + i}
          key={LINEAR_GRADIENT_PREFIX_ID + i}
          x1={r1 * Math.sin(startAngle)}
          y1={-r1 * Math.cos(startAngle)}
          x2={r1 * Math.sin(stopAngle)}
          y2={-r1 * Math.cos(stopAngle)}
        >
          <Stop offset="0" stopColor={`#${colors[i - 1]}`} />
          <Stop offset="1" stopColor={`#${colors[i]}`} />
        </LinearGradient>
      )
      startAngle = stopAngle
      stopAngle += (2 * Math.PI / noOfSeg)

      return linearGradient
    })
  }

  extractFill() {
    return Math.min(100, Math.max(0, this.props.fill))
  }

  renderBackgroundPath() {
    const { size, backgroundColor } = this.props
    const backgroundPath = arc()
      .innerRadius(r1)
      .outerRadius(r2)
      .startAngle(0)
      .endAngle(2 * Math.PI)

    return (
      <Path
        x={size / 2}
        y={size / 2}
        d={backgroundPath()}
        fill={backgroundColor}
      />
    )
  }

  renderCirclePaths() {
    const fill = this.extractFill()

    let numberOfPathsToDraw = Math.floor(
      2 * Math.PI * (fill / 100) / (2 * Math.PI / noOfSeg)
    )
    const rem = 2 * Math.PI * (fill / 100) / (2 * Math.PI / noOfSeg) % 1
    if (rem > 0) {
      numberOfPathsToDraw += 1
    }
    let startAngle = 0
    let stopAngle = (2 * Math.PI) / noOfSeg
    return range(1, numberOfPathsToDraw + 1).map(i => {
      if (i === numberOfPathsToDraw && rem) {
        stopAngle = 2 * Math.PI * (fill / 100)
      }
      const circlePath = arc()
        .innerRadius(r1)
        .outerRadius(r2)
        .startAngle(startAngle)
        .endAngle(stopAngle + 0.05)

      const path = (
        <Path
          x={this.props.size / 2}
          y={this.props.size / 2}
          key={fill + i}
          d={circlePath()}
          fill={'url(#' + LINEAR_GRADIENT_PREFIX_ID + (noOfSeg - i + 1) + ')'}
        />
      )
      startAngle = stopAngle
      stopAngle += 2 * Math.PI / noOfSeg

      return path
    })
  }

  render() {
    const { size, rotation, style, children } = this.props
    const fill = this.extractFill()

    return (
      <View style={style}>
        <Svg width={size} height={size}>
          <Defs>
            {this.renderLinearGradients()}
          </Defs>
          <G rotate={rotation - 90}>
            {this.renderBackgroundPath()}
            {this.renderCirclePaths()}

          </G>
        </Svg>
        {children && children(fill)}
      </View>
    )
  }
}

CircularProgress.propTypes = {
  backgroundColor: PropTypes.string,
  children: PropTypes.func,
  fill: PropTypes.number.isRequired,
  rotation: PropTypes.number,
  size: PropTypes.number.isRequired,
  style: PropTypes.any,
}

CircularProgress.defaultProps = {
  tintColor: 'black',
  backgroundColor: '#e4e4e4',
  rotation: 90,
  linecap: 'butt',
}
