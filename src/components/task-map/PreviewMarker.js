import PropTypes from 'prop-types'
import React from 'react'
import MapView from 'react-native-maps'
import { colors } from '../../theme'
import * as c from '../../state/constants'
import MarkerCircleView from '../marker-circle-view/MarkerCircleView'

const PreviewMarker = ({ task, coordinate }) => {
  const character = c.TYPE_DROPOFF === task.type ? 'D' : 'P'
  const circleColor = c.TYPE_DROPOFF === task.type ? colors.dropoff : colors.pickup

  return (
    <MapView.Marker
      coordinate={coordinate}
      key={task.id}
    >
      <MarkerCircleView
        character={character}
        circleColor={circleColor}
      />
    </MapView.Marker>
  )
}

PreviewMarker.propTypes = {
  task: PropTypes.object,
  coordinate: PropTypes.object
}

export default PreviewMarker
