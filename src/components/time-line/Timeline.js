import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ScrollView, StyleSheet, View, Text, Animated } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { colors } from '../../theme'
import timelineSampleData from './timelineSampleData.json'

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient)

export default class Timeline extends Component {
  static propTypes = {
    data: PropTypes.array,
    itemMarginBottom: PropTypes.number,
    connectionWidth: PropTypes.number,
    circleSize: PropTypes.number
  }

  static defaultProps = {
    data: timelineSampleData,
    itemMarginBottom: 15,
    connectionWidth: 4,
    circleSize: 28
  }

  constructor(props) {
    super(props)
    this.reset()
    this.state = {
      cWidth: 0,
      cHeight: new Animated.Value(0),
      cColors: null
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.measureConnectionLayout()
    }, 2000)
  }

  reset = () => {
    this.itemLayouts = []
  }

  measureConnectionLayout = () => {
    const { data } = this.props

    if (this.itemLayouts.length > 1) {
      const cWidth = this.props.connectionWidth
      let cHeight = 0
      for (let i = 0; i < this.itemLayouts.length - 1; i++) {
        cHeight += this.itemLayouts[i].height + this.props.itemMarginBottom
      }

      const cColors = []

      data.forEach(item => {
        if (item.style && item.style.circleColor) {
          cColors.push(item.style.circleColor)
        }
      })

      this.setState(
        {
          cWidth,
          cColors,
          cHeight: new Animated.Value(0)
        },
        () => {
          Animated.timing(this.state.cHeight, {
            toValue: cHeight
          }).start()
        }
      )
    }
  }

  onLayoutItem = (id, index, { nativeEvent }) => {
    if (nativeEvent.layout) {
      this.itemLayouts[index] = nativeEvent.layout
    }
  }

  renderItem = ({ item, index }) => {
    const { itemMarginBottom, circleSize } = this.props
    const {
      character,
      title,
      address,
      style,
      timeDescription,
      dimension,
      description
    } = item

    const extCircleContainterStyle = {
      width: circleSize,
      height: circleSize,
      padding: 3,
      borderRadius: circleSize / 2
    }

    const extCircleInsideStyle = {
      width: circleSize - 8,
      height: circleSize - 8,
      borderRadius: (circleSize - 8) / 2
    }

    const extItemContainer = {
      marginBottom: itemMarginBottom
    }

    if (style) {
      if (style.circleColor) {
        extCircleContainterStyle.borderColor = style.circleColor
        extCircleInsideStyle.backgroundColor = style.circleColor
      }
    }

    return (
      <View
        key={index}
        onLayout={event => this.onLayoutItem(item.id, index, event)}
        style={[styles.itemContainer, extItemContainer]}
      >
        <View style={[styles.itemCircleContainer, extCircleContainterStyle]}>
          <View style={[styles.itemCircleInside, extCircleInsideStyle]}>
            <Text style={[styles.character]}>{character}</Text>
          </View>
        </View>
        <View style={styles.itemContent}>
          <Text style={styles.itemTitle}>{title}</Text>
          <Text>{address}</Text>
          {dimension && <Text>{dimension}</Text>}
          {timeDescription &&
            <Text style={styles.itemSubDescription}>{timeDescription}</Text>}
          {description &&
            <Text style={styles.itemSubDescription}>{description}</Text>}
        </View>
      </View>
    )
  }

  renderConnection() {
    const { circleSize } = this.props
    const { cWidth, cHeight, cColors } = this.state

    const extConnectionStyle = {
      width: cWidth,
      height: cHeight,
      left: (circleSize - cWidth) / 2,
      top: circleSize / 2
    }

    if (!cWidth || !cHeight) return null

    return (
      <AnimatedLinearGradient
        colors={cColors}
        style={[styles.connection, extConnectionStyle]}
      />
    )
  }

  render() {
    const { data } = this.props

    return (
      <ScrollView style={styles.container}>
        {this.renderConnection()}
        {data.map((item, index) => this.renderItem({ item, index }))}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative'
  },
  itemContainer: {
    position: 'relative',
    marginBottom: 15,
    flexDirection: 'row'
  },
  itemContent: {
    flex: 1
  },
  itemTitle: {
    fontSize: 12,
    color: colors.inactive,
    fontWeight: '600'
  },
  itemCircleContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderColor: 'blue',
    borderWidth: 1,
    marginRight: 10,
    padding: 3
  },
  itemCircleInside: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemSubDescription: {
    marginTop: 5,
    color: '#666',
    fontSize: 12
  },
  character: {
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    fontSize: 12,
    paddingLeft: 1
  },
  connection: {
    position: 'absolute'
  }
})
