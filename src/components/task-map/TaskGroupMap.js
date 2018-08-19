import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import Theme, { createStyle } from 'react-native-theming'
import MapView from 'react-native-maps'
import LocationApi from '../../api/location/LocationApi'
import UI from '../../utils/UI'
import Loader from '../../components/loader/Loader'
import { colors } from '../../theme'
import mapStyle from '../../config/map.config.json'
import tr from '../../i18n/i18n'
import { getPreviewMarker, getWorkerMarker, getDetailMarker } from './markers'

const styles = createStyle({
  mapContainer: {
    position: 'relative'
  },
  map: {
    width: '100%',
    height: '100%'
  },
  loadingView: {
    backgroundColor: '@brand',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 5,
    paddingTop: 5,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
  loadingText: {
    marginBottom: 3,
    color: 'white'
  }
})

const min = 0.999998
const max = 1.000003

export default class TaskMap extends Component {
  static propTypes = {
    taskGroup: PropTypes.object,
    manualLoadMap: PropTypes.bool,
    shouldRenderDirection: PropTypes.bool,
    style: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
      PropTypes.array
    ]),
    onDirectionCalculated: PropTypes.func,
    onGotCurrentLocation: PropTypes.func,
    needShowStatus: PropTypes.bool,
    showDetailMarker: PropTypes.bool
  }

  static defaultProps = {
    manualLoadMap: false,
    shouldRenderDirection: true,
    needShowStatus: true,
    showDetailMarker: true
  }

  constructor(props) {
    super(props)
    this.state = {
      shouldRenderMap: false,
      loading: true,
      directions: null,
      markers: [],
      region: {},
      fetchingDirection: true,
      currentLocation: null
    }
  }

  componentDidMount() {
    UI.runAfterInteractions(() => {
      this.setState({ loading: false })
    })
  }

  startRenderManually = () => {
    this.getCurrentLocation()
  }

  getCurrentLocation = () => {
    const updateCurrentLocation = position => {
      this.setState(
        {
          currentLocation: position
        },
        () => {
          if (this.props.onGotCurrentLocation)
            this.props.onGotCurrentLocation(position)
          this.updateMapData()
        }
      )
    }

    const position = LocationApi.position
    updateCurrentLocation(position)
    if (!position) {
      LocationApi.watchLocation(position => {
        if (position) {
          updateCurrentLocation(position)
        }
      }, true)
    }
  }

  createMarkers = (taskGroup, currentLocation) => {
    const latlong = []

    if (taskGroup.length !== 0) {
      for (let i = 0; i < taskGroup.length; i++) {
        const posExistingMarker = taskGroup[i]
        // update the position of the coincident marker by applying a small multipler to its coordinates
        // TODO find a better method
        const newLat =
          posExistingMarker.latitude * (Math.random() * (max - min) + min)
        const newLng =
          posExistingMarker.longitude * (Math.random() * (max - min) + min)
        latlong.push({
          ...posExistingMarker,
          latitude: newLat,
          longitude: newLng
        })
      }
    }

    if (currentLocation) {
      const workerMarker = getWorkerMarker(currentLocation)
      if (workerMarker) latlong.push(workerMarker)
    }
    return latlong
      .map(item => getPreviewMarker(item))
      .filter(item => item !== null)
  }

  updateMapData = async () => {
    const { taskGroup, shouldRenderDirection, showDetailMarker } = this.props
    const { currentLocation } = this.state

    const destination = taskGroup.tasks[taskGroup.tasks.length - 1]

    const regionPoint = [...taskGroup.tasks]

    if (currentLocation) {
      regionPoint.push(currentLocation)
    }
    const region = LocationApi.getRegionForCoordinates(regionPoint)

    const markers = this.createMarkers(taskGroup.tasks, currentLocation)

    let directions = null

    if (shouldRenderDirection) {
      try {
        if (taskGroup.tasks.length > 1) {
          const taskWaypoints = taskGroup.tasks.filter(
            t => t.id !== destination.id
          )
          directions = currentLocation
            ? await LocationApi.getDirectionWithWayPoints(
                currentLocation,
                destination,
                taskWaypoints
              )
            : null
        } else {
          directions = currentLocation
            ? await LocationApi.getDirection(currentLocation, destination)
            : null
        }
      } catch (error) {
        this.setState({
          region,
          markers,
          fetchingDirection: false
        })
      }

      if (
        directions &&
        directions.steps &&
        directions.steps.length &&
        showDetailMarker
      ) {
        const midlePoint =
          directions.steps[parseInt(directions.steps.length / 2, 10)]
        const detailMarker = getDetailMarker(midlePoint, directions)
        if (detailMarker) markers.push(detailMarker)
      }
    }

    this.setState(
      {
        markers,
        directions,
        region,
        fetchingDirection: false
      },
      () => {
        // sometimes, the Map need time to move to current location
        setTimeout(() => {
          if (this.map && region) this.map.animateToRegion(region, 500)
        }, 2000)
        if (this.props.onDirectionCalculated)
          this.props.onDirectionCalculated(directions)
      }
    )
  }

  onMapReady = () => {
    if (!this.props.manualLoadMap) this.getCurrentLocation()
  }

  renderStatus = () => {
    const { fetchingDirection } = this.state
    const { needShowStatus } = this.props

    if (!needShowStatus) return null

    // TODO: we can add more map status here, maybe offline, can't load map, etc
    if (fetchingDirection) {
      return (
        <Theme.View style={[styles.loadingView]}>
          <Text style={styles.loadingText}>{tr('fetching_direction')}</Text>
          <Loader color="white" />
        </Theme.View>
      )
    }
    return null
  }

  render() {
    const { loading, directions, markers } = this.state

    if (loading)
      return (
        <View style={this.props.style}>
          <Loader color={colors.brand} />
        </View>
      )

    const { style, ...others } = this.props
    return (
      <View style={[styles.mapContainer, style]}>
        <MapView
          ref={ref => (this.map = ref)}
          minZoomLevel={4}
          onMapReady={this.onMapReady}
          customMapStyle={mapStyle}
          style={styles.map}
          {...others}
        >
          {directions &&
            directions.steps &&
            <MapView.Polyline
              coordinates={directions.steps}
              strokeWidth={4}
              strokeColor={colors.directionColor}
            />}
          {markers}
        </MapView>
        {this.renderStatus()}
      </View>
    )
  }
}
