import PropTypes from 'prop-types'
import React from 'react'
import { createStyle } from 'react-native-theming'
import { Text, View } from 'react-native'
import t from '../../i18n/i18n'
import { font } from '../../theme/index'

const styles = createStyle({
  container: {
    alignSelf: 'stretch',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: 8
  },
  time: {
    fontSize: font.sizes.bigger,
    fontWeight: 'bold'
  },
  timeLabel: {
    fontSize: font.sizes.tiny
  },
  pickup: {
    color: '@background'
  },
  dropoff: {
    color: '@brand'
  }
})

const DurationView = ({ action, color, duration }) =>
  <View style={styles.container}>
    <Text
      style={[styles.time, styles[action], color && { color }]}
      numberOfLines={1}
    >
      {duration.value === 0.0 ? '--' : duration.value.toFixed(1)}
    </Text>
    <Text style={[styles.timeLabel, styles[action], color && { color }]}>
      {t(duration.label)}
    </Text>
  </View>

DurationView.propTypes = {
  action: PropTypes.string.isRequired,
  color: PropTypes.string,
  duration: PropTypes.object
}

DurationView.defaultProps = {
  color: null,
  duration: { label: 'duration_subtitle', value: 0.0 }
}

export default DurationView
