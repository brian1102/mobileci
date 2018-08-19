import PropTypes from 'prop-types'
import React from 'react'
import { Text, StyleSheet, View } from 'react-native'
import MapView from 'react-native-maps'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EB4A48',
    borderRadius: 5,
    flexDirection: 'row',
    padding: 5
  },
  text: {
    color: 'white',
    fontSize: 14,
    fontWeight: '800'
  },
  smallText: {
    color: 'white',
    fontSize: 12,
    marginTop: 2
  }
})

const DetailMarker = ({ detail, coordinate }) => {
  return (
    <MapView.Marker coordinate={coordinate}>
      <View style={styles.container}>
        {
          <Text style={styles.smallText}>
            {`${detail.distance.text}  ${detail.duration.text}`}
          </Text>
        }
      </View>
    </MapView.Marker>
  )
}

DetailMarker.propTypes = {
  detail: PropTypes.object,
  coordinate: PropTypes.object
}

export default DetailMarker
