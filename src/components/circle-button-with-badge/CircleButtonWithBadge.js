import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#F86759',
    width: 22,
    height: 22,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    color: 'white',
  },
})

const renderBadge = (badgeCount, badgeFontSize) => {
  if (badgeCount)
    return (
      <View style={styles.badgeContainer}>
        <Text style={[styles.badge, { fontSize: badgeFontSize }]}>
          {badgeCount}
        </Text>
      </View>
    )
  return null
}

const CircleButtonWithBadge = ({
  style,
  size,
  iconSize,
  badgeFontSize,
  backgroundColor,
  icon,
  badgeCount,
  onPress,
}) => {
  if (!badgeCount) return null
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          borderRadius: size / 2,
          height: size,
          width: size,
          backgroundColor,
        },
        style,
      ]}
      onPress={onPress}
    >
      {renderBadge(badgeCount, badgeFontSize)}
      <SimpleLineIcons name={icon} color="white" size={iconSize} />
    </TouchableOpacity>
  )
}

CircleButtonWithBadge.propTypes = {
  style: PropTypes.any,
  size: PropTypes.number,
  iconSize: PropTypes.number,
  badgeFontSize: PropTypes.number,
  backgroundColor: PropTypes.string,
  icon: PropTypes.string,
  badgeCount: PropTypes.number,
  onPress: PropTypes.func,
}

CircleButtonWithBadge.defaultProps = {
  size: 60,
  iconSize: 22,
  badgeFontSize: 12,
  backgroundColor: '#2c3e50',
  icon: 'briefcase',
  badgeCount: 0,
}

export default CircleButtonWithBadge
