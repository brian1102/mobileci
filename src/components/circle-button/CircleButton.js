import PropTypes from 'prop-types'
import React from 'react'
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import { responsiveHeight } from 'react-native-responsive-dimensions'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { colors, font } from '../../theme/index'

const getButtonStyle = (scale, borderColor, backgroundColor, size) => {
  const heightWidth = responsiveHeight(size || 15) * scale

  return {
    borderColor,
    backgroundColor: backgroundColor || colors.transparent,
    borderWidth: 1,
    borderRadius: heightWidth / 2,
    alignItems: 'center',
    justifyContent: 'center',
    height: heightWidth,
    width: heightWidth
  }
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: font.sizes.sizessmaller
  }
})

class CircleButton extends React.PureComponent {
  constructor(props) {
    // noinspection JSCheckFunctionSignatures
    super(props)
    this.state = {
      pressed: false
    }
  }

  // eslint-disable-next-line
  pressIn = () => this.setState({ pressed: true })

  // eslint-disable-next-line
  pressOut = () => this.setState({ pressed: false })

  render() {
    const {
      background,
      color,
      highlightColor,
      highlightTitleColor,
      scale,
      style,
      onPress,
      title,
      icon,
      size
    } = this.props
    const { pressed } = this.state
    const underlayColor = highlightColor || `${color}88`
    const buttonStyle = pressed
      ? getButtonStyle(scale, color, underlayColor, size)
      : getButtonStyle(scale, color, background, size)
    const titleColor = pressed ? highlightTitleColor : color

    return (
      <TouchableHighlight
        style={[style, buttonStyle]}
        onPress={onPress}
        onPressIn={this.pressIn}
        onPressOut={this.pressOut}
        underlayColor={underlayColor}
      >
        <View>
          {title &&
            <Text style={[styles.title, { color: titleColor }]}>{title}</Text>}
          {icon && <Ionicons name={icon} color={titleColor} size={30} />}
        </View>
      </TouchableHighlight>
    )
  }
}

CircleButton.propTypes = {
  background: PropTypes.string,
  color: PropTypes.string,
  highlightColor: PropTypes.string,
  highlightTitleColor: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  scale: PropTypes.number,
  style: PropTypes.number,
  title: PropTypes.string,
  size: PropTypes.any,
  icon: PropTypes.string
}

CircleButton.defaultProps = {
  background: null,
  color: colors.title,
  highlightColor: null,
  highlightTitleColor: colors.background,
  scale: 1.0
}

export default CircleButton
