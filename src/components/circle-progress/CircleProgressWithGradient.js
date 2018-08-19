import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { PanResponder, View } from 'react-native'
import Svg, {
  Circle,
  G,
  LinearGradient,
  Path,
  Defs,
  Stop,
  Text,
} from 'react-native-svg'
import range from 'lodash.range'
import { interpolateHcl as interpolateGradient } from 'd3-interpolate'

function calculateArcColor(
  index0,
  segments,
  gradientColorFrom,
  gradientColorTo
) {
  const interpolate = interpolateGradient(gradientColorFrom, gradientColorTo)

  return {
    fromColor: interpolate(index0 / segments),
    toColor: interpolate((index0 + 1) / segments),
  }
}

function calculateArcCircle(
  index0,
  segments,
  radius,
  startAngle0 = 0,
  angleLength0 = 2 * Math.PI
) {
  // Add 0.0001 to the possible angle so when start = stop angle, whole circle is drawn
  const startAngle = startAngle0 % (2 * Math.PI)
  const angleLength = angleLength0 % (2 * Math.PI)
  const index = index0 + 1
  const fromAngle = angleLength / segments * (index - 1) + startAngle
  const toAngle = angleLength / segments * index + startAngle
  const fromX = radius * Math.sin(fromAngle)
  const fromY = -radius * Math.cos(fromAngle)
  const realToX = radius * Math.sin(toAngle)
  const realToY = -radius * Math.cos(toAngle)

  // add 0.005 to start drawing a little bit earlier so segments stick together
  const toX = radius * Math.sin(toAngle + 0.005)
  const toY = -radius * Math.cos(toAngle + 0.005)

  return {
    fromX,
    fromY,
    toX,
    toY,
    realToX,
    realToY,
  }
}

function getGradientId(index) {
  return `gradient${index}`
}

export default class CircularSlider extends PureComponent {
  // eslint-disable-next-line
  static propTypes = {
    onUpdate: PropTypes.func,
    startAngle: PropTypes.number.isRequired,
    angleLength: PropTypes.number.isRequired,
    segments: PropTypes.number,
    strokeWidth: PropTypes.number,
    radius: PropTypes.number,
    gradientColorFrom: PropTypes.string,
    gradientColorTo: PropTypes.string,
    bgCircleColor: PropTypes.string,
    stopIcon: PropTypes.element,
    startIcon: PropTypes.element,
  }

  // eslint-disable-next-line
  static defaultProps = {
    segments: 5,
    strokeWidth: 40,
    radius: 145,
    gradientColorFrom: 'rgb(59,166,218)',
    gradientColorTo: 'rgb(94,186,90)',
    clockFaceColor: '#9d9d9d',
    bgCircleColor: '#171717',
    showClockFace: false,
    onUpdate: () => { },
  }

  // eslint-disable-next-line
  state = {
    circleCenterX: false,
    circleCenterY: false,
  }

  componentWillMount() {
    this.sleepPanResponder = PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: () => this.setCircleCenter(),
      onPanResponderMove: (evt, { moveX, moveY }) => {
        const { circleCenterX, circleCenterY } = this.state
        const { angleLength, startAngle, onUpdate } = this.props

        const currentAngleStop = (startAngle + angleLength) % (2 * Math.PI)
        let newAngle =
          Math.atan2(moveY - circleCenterY, moveX - circleCenterX) + Math.PI / 2

        if (newAngle < 0) {
          newAngle += 2 * Math.PI
        }

        let newAngleLength = currentAngleStop - newAngle

        if (newAngleLength < 0) {
          newAngleLength += 2 * Math.PI
        }

        onUpdate({
          startAngle: newAngle,
          angleLength: newAngleLength % (2 * Math.PI),
        })
      },
    })

    this.wakePanResponder = PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: () => this.setCircleCenter(),
      onPanResponderMove: (evt, { moveX, moveY }) => {
        const {
          startAngle,
          onUpdate,
          circleCenterX,
          circleCenterY,
        } = this.state

        const newAngle =
          Math.atan2(moveY - circleCenterY, moveX - circleCenterX) + Math.PI / 2
        let newAngleLength = (newAngle - startAngle) % (2 * Math.PI)

        if (newAngleLength < 0) {
          newAngleLength += 2 * Math.PI
        }

        onUpdate({ startAngle, angleLength: newAngleLength })
      },
    })
  }

  // eslint-disable-next-line
  onLayout = () => {
    this.setCircleCenter()
  }

  // eslint-disable-next-line
  setCircleCenter = () => {
    this.circle.measure((x, y, w, h, px, py) => {
      const halfOfContainer = this.getContainerWidth() / 2
      this.setState({
        circleCenterX: px + halfOfContainer,
        circleCenterY: py + halfOfContainer,
      })
    })
  }

  getContainerWidth() {
    const { strokeWidth, radius } = this.props
    return strokeWidth + radius * 2 + 2
  }

  render() {
    const {
      startAngle,
      angleLength,
      segments,
      strokeWidth,
      radius,
      gradientColorFrom,
      gradientColorTo,
      bgCircleColor,
      startIcon,
      stopIcon,
    } = this.props

    const containerWidth = this.getContainerWidth()

    const start = calculateArcCircle(
      0,
      segments,
      radius,
      startAngle,
      angleLength
    )
    const stop = calculateArcCircle(
      segments - 1,
      segments,
      radius,
      startAngle,
      angleLength
    )

    return (
      <View
        style={{ width: containerWidth, height: containerWidth }}
        onLayout={this.onLayout}
      >
        <Svg
          height={containerWidth}
          width={containerWidth}
          ref={circle => (this.circle = circle)}
        >
          <Defs>
            {range(segments).map(i => {
              const { fromX, fromY, toX, toY } = calculateArcCircle(
                i,
                segments,
                radius,
                startAngle,
                angleLength
              )
              const { fromColor, toColor } = calculateArcColor(
                i,
                segments,
                gradientColorFrom,
                gradientColorTo
              )
              return (
                <LinearGradient
                  key={i}
                  id={getGradientId(i)}
                  x1={fromX.toFixed(2)}
                  y1={fromY.toFixed(2)}
                  x2={toX.toFixed(2)}
                  y2={toY.toFixed(2)}
                >
                  <Stop offset="0%" stopColor={fromColor} />
                  <Stop offset="1" stopColor={toColor} />
                </LinearGradient>
              )
            })}
          </Defs>

          {/*
            ##### Circle
          */}

          <G
            transform={{
              translate: `${strokeWidth / 2 + radius + 1}, ${strokeWidth / 2 +
                radius +
                1}`,
            }}
          >
            <Circle
              r={radius}
              strokeWidth={strokeWidth}
              fill="transparent"
              stroke={bgCircleColor}
            />

            <G>
              <Text
                fill={'#34313F'}
                fontSize="46"
                textAnchor="middle"
                x={-2}
                y={-35}
              >
                {this.props.text}
              </Text>
              <Text
                fill={'#34313F'}
                fontSize="13"
                textAnchor="middle"
                x={0}
                y={18}
              >
                {this.props.subText}
              </Text>
            </G>
            {range(segments).map(i => {
              const { fromX, fromY, toX, toY } = calculateArcCircle(
                i,
                segments,
                radius,
                startAngle,
                angleLength
              )
              const d = `M ${fromX.toFixed(2)} ${fromY.toFixed(
                2
              )} A ${radius} ${radius} 0 0 1 ${toX.toFixed(2)} ${toY.toFixed(
                2
              )}`

              return (
                <Path
                  d={d}
                  key={i}
                  strokeWidth={strokeWidth}
                  stroke={`url(#${getGradientId(i)})`}
                  fill="transparent"
                />
              )
            })}

            {/*
              ##### Stop Icon
            */}

            <G
              fill={gradientColorTo}
              transform={{ translate: `${stop.toX}, ${stop.toY}` }}
              onPressIn={() =>
                this.setState({ angleLength: angleLength + Math.PI / 2 })}
              {...this.wakePanResponder.panHandlers}
            >
              <Circle
                r={(strokeWidth - 1) / 2}
                fill={gradientColorTo}
                stroke={gradientColorTo}
                strokeWidth="1"
              />
              {stopIcon}
            </G>

            {/*
              ##### Start Icon
            */}

            <G
              fill={gradientColorFrom}
              transform={{ translate: `${start.fromX}, ${start.fromY}` }}
              onPressIn={() =>
                this.setState({
                  startAngle: startAngle - Math.PI / 2,
                  angleLength: angleLength + Math.PI / 2,
                })}
              {...this.sleepPanResponder.panHandlers}
            >
              <Circle
                r={(strokeWidth - 1) / 2}
                fill={gradientColorFrom}
                stroke={gradientColorFrom}
                strokeWidth="1"
              />
              {startIcon}
            </G>
          </G>
        </Svg>
      </View>
    )
  }
}

CircularSlider.propTypes = {
  text: PropTypes.string,
  subText: PropTypes.string,
}
