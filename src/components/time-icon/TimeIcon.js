import PropTypes from 'prop-types'
import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { images } from '../../theme'

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  icon: {
    width: 20,
    height: 20,
    marginLeft: 4,
  },
})

const TimeIcon = ({ color, icons }) =>
  <View style={styles.container}>
    {icons.map((icon, index) =>
      <Image
        key={index}
        source={icon}
        resizeMode="contain"
        style={[styles.icon, { tintColor: color }]}
      />
    )}
  </View>

TimeIcon.propTypes = {
  color: PropTypes.string,
  icons: PropTypes.arrayOf(PropTypes.number),
}

TimeIcon.defaultProps = {
  color: null,
  icons: [images.icons.crosshair, images.icons.clock],
}

export default TimeIcon
