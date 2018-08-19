import PropTypes from 'prop-types'
import React from 'react'
import { TouchableHighlight, ActivityIndicator } from 'react-native'
import {
  responsiveHeight,
  responsiveWidth
} from 'react-native-responsive-dimensions'
import Theme, { createStyle } from 'react-native-theming'
import { colors, font } from '../../theme/index'

const View = Theme.View
const Text = Theme.Text

const borderRadius = 24

const getButtonStyle = (scale, borderColor, backgroundColor) => ({
  borderColor,
  backgroundColor: backgroundColor || 'transparent',
  borderWidth: 1,
  borderRadius,
  alignItems: 'center',
  justifyContent: 'center',
  height: responsiveHeight(7) * scale,
  width: responsiveWidth(30) * scale
})

const styles = createStyle({
  title: {
    textAlign: 'center',
    fontSize: font.sizes.smaller
  },
  loadingView: {
    flexDirection: 'row'
  }
})

class RoundedButton extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      pressed: false,
      clicked: false
    }
  }

  pressIn = () => this.setState({ pressed: true })

  pressOut = () => this.setState({ pressed: false })

  renderChild() {
    const {
      enabled,
      highlightTitleColor,
      title,
      children,
      color,
      scale
    } = this.props
    const { pressed } = this.state
    const titleColor = this.getTitleColor(
      pressed,
      highlightTitleColor,
      color,
      enabled
    )

    return (
      <View>
        {title &&
          <Text
            style={[
              styles.title,
              {
                color: titleColor,
                fontSize: scale
                  ? font.sizes.smaller * scale
                  : font.sizes.smaller
              }
            ]}
          >
            {title}
          </Text>}
        {children}
      </View>
    )
  }
  render() {
    const {
      background,
      color,
      enabled,
      highlightColor,
      highlightTitleColor,
      scale,
      style,
      onPress,
      isLoading,
      loadingPercent
    } = this.props
    const { clicked, pressed } = this.state

    const enabledUnderlayColor = highlightColor || `${color}88`
    const underlayColor = enabled ? enabledUnderlayColor : null

    const enabledButtonStyle = pressed
      ? getButtonStyle(scale, underlayColor)
      : getButtonStyle(scale, color, background)
    const buttonStyle = enabled
      ? enabledButtonStyle
      : getButtonStyle(scale, colors.disabled, background)

    const titleColor = this.getTitleColor(
      pressed,
      highlightTitleColor,
      color,
      enabled
    )

    return (
      <TouchableHighlight
        style={[buttonStyle, style]}
        onPress={() => {
          if (clicked || isLoading || !enabled) return
          this.setState(
            {
              clicked: true
            },
            () => {
              onPress()
              setTimeout(() => {
                this.setState({ clicked: false })
              }, 500)
            }
          )
        }}
        onPressIn={this.pressIn}
        onPressOut={this.pressOut}
        underlayColor={underlayColor}
      >
        {isLoading
          ? <View style={styles.loadingView}>
              {loadingPercent > 0 &&
                loadingPercent <= 100 &&
                <Text>{loadingPercent.toFixed()}%</Text>}
              <ActivityIndicator color={titleColor} />
            </View>
          : this.renderChild()}
      </TouchableHighlight>
    )
  }

  // eslint-disable-next-line
  getTitleColor = (pressed, highlightTitleColor, color, enabled) => {
    const enabledTitleColor = pressed ? highlightTitleColor : color
    return enabled ? enabledTitleColor : colors.disabled
  }
}

RoundedButton.propTypes = {
  background: PropTypes.string,
  color: PropTypes.string,
  enabled: PropTypes.bool,
  highlightColor: PropTypes.string,
  highlightTitleColor: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  scale: PropTypes.number,
  style: PropTypes.any,
  title: PropTypes.string,
  loadingPercent: PropTypes.number,
  isLoading: PropTypes.bool,
  children: PropTypes.any
}

RoundedButton.defaultProps = {
  background: null,
  color: colors.mainGray,
  enabled: true,
  highlightColor: null,
  highlightTitleColor: colors.background,
  isLoading: false,
  scale: 1.0
}

export default RoundedButton
