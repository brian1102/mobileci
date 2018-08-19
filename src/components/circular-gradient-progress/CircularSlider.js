import React, { PureComponent } from 'react';
import PropTypes from 'prop-types'
import { View } from 'react-native';
import Svg, { Circle, G, LinearGradient, Path, Defs, Stop } from 'react-native-svg';
import range from 'lodash.range';
import { interpolateHcl as interpolateGradient } from 'd3-interpolate';


function calculateArcColor(index0, segments, gradientColorFrom, gradientColorTo) {
  const interpolate = interpolateGradient(gradientColorFrom, gradientColorTo);

  return {
    fromColor: interpolate(index0 / segments),
    toColor: interpolate((index0 + 1) / segments),
  }
}

function calculateArcCircle(index0, segments, radius, startAngle0 = 0, angleLength0 = 2 * Math.PI) {
  // Add 0.0001 to the possible angle so when start = stop angle, whole circle is drawn
  const startAngle = startAngle0 % (2 * Math.PI);
  const angleLength = angleLength0 % (2 * Math.PI);
  const index = index0 + 1;
  const fromAngle = angleLength / segments * (index - 1) + startAngle;
  const toAngle = angleLength / segments * index + startAngle;
  const fromX = radius * Math.sin(fromAngle);
  const fromY = -radius * Math.cos(fromAngle);
  const realToX = radius * Math.sin(toAngle);
  const realToY = -radius * Math.cos(toAngle);

  // add 0.005 to start drawing a little bit earlier so segments stick together
  const toX = radius * Math.sin(toAngle + 0.005);
  const toY = -radius * Math.cos(toAngle + 0.005);

  return {
    fromX,
    fromY,
    toX,
    toY,
    realToX,
    realToY,
  };
}

function getGradientId(index) {
  return `gradient${index}`;
}

export default class CircularSlider extends PureComponent {
  static propTypes = {
    startDegree: PropTypes.number,
    degree: PropTypes.number,
    segments: PropTypes.number,
    strokeWidth: PropTypes.number,
    radius: PropTypes.number,
    gradientColorFrom: PropTypes.string,
    gradientColorTo: PropTypes.string,
    bgCircleColor: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    style: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.number])
  }

  static defaultProps = {
    startDegree: 0,
    segments: 5,
    strokeWidth: 40,
    radius: 145,
    gradientColorFrom: '#ff9800',
    gradientColorTo: '#ffcf00',
    bgCircleColor: '#171717',
  }

  state = {
    circleCenterX: false,
    circleCenterY: false,
  }

  onLayout = () => {
    this.setCircleCenter();
  }

  setCircleCenter = () => {
    // eslint-disable-next-line no-underscore-dang
    if (this.circle) {
      this.circle.measure((x, y, w, h, px, py) => {
        const halfOfContainer = this.getContainerWidth() / 2;
        this.setState({ circleCenterX: px + halfOfContainer, circleCenterY: py + halfOfContainer });
      });
    }
  }

  getContainerWidth() {
    const { strokeWidth, radius } = this.props;
    return strokeWidth + radius * 2 + 2;
  }

  render() {
    const {
      startDegree,
      degree,
      segments,
      strokeWidth,
      radius,
      gradientColorFrom,
      gradientColorTo,
      bgCircleColor
    } = this.props

    const limitGradientDegreeFrom = 25
    const angleLength = (degree / 180 * Math.PI)
    const startAngle = (startDegree / 180 * Math.PI)
    const adjustedSegments = degree <= limitGradientDegreeFrom ? 1 : segments

    const containerWidth = this.getContainerWidth();

    const start = calculateArcCircle(0, adjustedSegments, radius, startAngle, angleLength);
    const stop = calculateArcCircle(adjustedSegments - 1, adjustedSegments, radius, startAngle, angleLength);

    const gradientColors = range(adjustedSegments).map(i => {
      const { fromX, fromY, toX, toY } = calculateArcCircle(i, adjustedSegments, radius, startAngle, angleLength);
      let { fromColor, toColor } = calculateArcColor(i, adjustedSegments, gradientColorFrom, gradientColorTo)

      if (degree < limitGradientDegreeFrom) {
        fromColor = gradientColorFrom
        toColor = gradientColorFrom
      }

      return {
        i,
        fromX,
        fromY,
        toX,
        toY,
        fromColor,
        toColor
      }
    })

    const gradientsPath = range(adjustedSegments).map(i => {
      const { fromX, fromY, toX, toY } = calculateArcCircle(i, adjustedSegments, radius, startAngle, angleLength);
      // eslint-disable-next-line max-len
      const d = `M ${fromX.toFixed(2)} ${fromY.toFixed(2)} A ${radius} ${radius} 0 0 1 ${toX.toFixed(2)} ${toY.toFixed(2)}`;

      return { d, i, color: getGradientId(i) }
    })

    let firstColor = null
    let lastColor = null

    if (gradientColors.length > 0) {
      firstColor = gradientColors[0].toColor
      lastColor = gradientColors[gradientColors.length - 1].fromColor
    }

    return (
      <View
        style={[{
          width: containerWidth,
          height: containerWidth
        }, this.props.style]}
        onLayout={this.onLayout}
      >
        <Svg
          height={containerWidth}
          width={containerWidth}
          ref={circle => this.circle = circle}
        >
          <Defs>
            {
              gradientColors.map(item => {
                const {
                  i,
                  fromX,
                  fromY,
                  toX,
                  toY,
                  fromColor,
                  toColor
                } = item

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
              })
            }
          </Defs>

          <G
            x={strokeWidth / 2 + radius + 1}
            y={strokeWidth / 2 + radius + 1}
          >
            {

            }
            <Circle
              r={radius}
              strokeWidth={strokeWidth}
              fill="transparent"
              stroke={bgCircleColor}
            />

            {
              angleLength > 0 &&
              <G
                x={start.fromX}
                y={start.fromY}
              >
                <Circle
                  r={(strokeWidth - 1) / 2}
                  fill={firstColor}
                />
              </G>
            }

            {
              angleLength > 0 &&
              gradientsPath.map(({ d, i, color }) => {
                return (
                  <Path
                    d={d}
                    key={i}
                    strokeWidth={strokeWidth}
                    stroke={`url(#${color})`}
                    fill="transparent"
                  />
                )
              })
            }

            {
              angleLength > 0 &&
              <G
                x={stop.toX}
                y={stop.toY}
              >
                <Circle
                  r={(strokeWidth - 1) / 2}
                  fill={lastColor}
                />
              </G>
            }
          </G>
        </Svg>
        {this.props.children}
      </View>
    );
  }
}