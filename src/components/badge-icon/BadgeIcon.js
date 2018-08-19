import PropTypes from 'prop-types'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { colors, font } from '../../theme/index'

const styles = StyleSheet.create({
  container: {
    width: 32,
    height: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  icon: {
    marginTop: 4,
    marginLeft: 4,
    width: 24,
    height: 24,
  },
  badgeTitle: {
    color: colors.title,
    fontWeight: 'bold',
    backgroundColor: colors.transparent,
    textAlign: 'center',
  },
  badge: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    right: 0,
    top: 0,
    position: 'absolute',
    borderRadius: 8,
    width: 16,
    height: 16,
    backgroundColor: colors.directionColor,
  },
})

const getFontSize = count =>
  count < 10 ? font.sizes.tinier : count < 100 ? font.sizes.tab : font.sizes.badge

const BadgeIcon = ({ count, icon, tintColor }) =>
  <View style={styles.container}>
    <Image
      source={icon}
      resizeMode="contain"
      style={[styles.icon, { tintColor }]}
    />
    {count > 0 &&
      <View style={styles.badge}>
        <Text
          style={[
            styles.badgeTitle,
            {
              fontSize: getFontSize(count),
            },
          ]}
        >
          {count}
        </Text>
      </View>}
  </View>

BadgeIcon.propTypes = {
  count: PropTypes.number,
  icon: PropTypes.number.isRequired,
  tintColor: PropTypes.string,
}

BadgeIcon.defaultProps = {
  count: 0,
}

export default BadgeIcon
