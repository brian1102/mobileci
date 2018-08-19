import React from 'react'
import { View, Text } from 'react-native'
import StyleSheet from 'react-native-extended-stylesheet'
import PropsType from 'prop-types'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MainButton from '../button/Button'

const styles = StyleSheet.create({
  button: {
    width: '88%',
    alignItems: 'center'
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff'
  },
  socialIconSmall: {
    marginRight: 20
  },
  iconLeft: {
    backgroundColor: 'transparent',
    marginRight: 20
  },
  iconRight: {
    backgroundColor: 'transparent',
    marginLeft: 20
  }
})

const renderIcon = (prop, left) => {
  const {
    iconLeft,
    iconRight,
    iconLeftColor,
    iconRightColor,
    iconLeftSize,
    iconRightSize,
    iconLeftStyle,
    iconRightStyle
  } = prop

  if (left) {
    if (typeof iconLeft === 'string') {
      return (
        <Ionicons
          style={[styles.iconLeft, iconLeftStyle]}
          name={iconLeft}
          color={iconLeftColor}
          size={iconLeftSize}
        />
      )
    }
    return iconLeft ? iconLeft() : null
  }

  if (typeof iconRight === 'string') {
    return (
      <Ionicons
        style={[styles.iconRight, iconRightStyle]}
        name={iconRight}
        color={iconRightColor}
        size={iconRightSize}
      />
    )
  }
  return iconRight ? iconRight() : null
}

const ButtonWithIcon = props => {
  const {
    renderContent,
    iconLeft,
    iconRight,
    onPress,
    isLoading,
    title,
    style,
    buttonTitleStyle,
    loadingColor,
    ...otherProps
  } = props
  return (
    <MainButton
      onPress={onPress}
      loadingColor={loadingColor}
      isLoading={isLoading}
      containerStyle={[styles.button, style]}
      {...otherProps}
    >
      {renderContent
        ? renderContent()
        : <View style={styles.content}>
            {iconLeft && renderIcon(props, true)}
            <Text style={[styles.buttonText, buttonTitleStyle]}>{title}</Text>
            {iconRight && renderIcon(props, false)}
          </View>}
    </MainButton>
  )
}

ButtonWithIcon.propTypes = {
  onPress: PropsType.func,
  renderContent: PropsType.func,
  isLoading: PropsType.bool,
  iconLeft: PropsType.string,
  iconLeftColor: PropsType.string, // eslint-disable-line
  iconRight: PropsType.string,
  iconRightColor: PropsType.string, // eslint-disable-line
  title: PropsType.string,
  style: PropsType.any,
  buttonTitleStyle: PropsType.any,
  iconLeftStyle: PropsType.any, // eslint-disable-line
  iconRightStyle: PropsType.any, // eslint-disable-line
  loadingColor: PropsType.any // eslint-disable-line
}

ButtonWithIcon.defaultProps = {
  onPress: () => {},
  isLoading: false,
  iconLeft: null,
  iconLeftColor: 'rgba(255, 255, 255, .9)',
  iconRight: null,
  iconRightColor: 'rgba(255, 255, 255, .9)',
  title: 'Click here',
  iconLeftSize: 24,
  iconRightSize: 24
}

export default ButtonWithIcon
