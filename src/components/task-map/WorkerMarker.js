import PropTypes from 'prop-types'
import React from 'react'
import MapView from 'react-native-maps'
import { images } from '../../theme'

const WorkerMarker = ({ coordinate }) => {
  return (
    <MapView.Marker
      coordinate={coordinate}
      image={images.icons.currentLocation}
    />
  )
}

WorkerMarker.propTypes = {
  coordinate: PropTypes.object
}

// noinspection JSUnusedGlobalSymbols
export default WorkerMarker
