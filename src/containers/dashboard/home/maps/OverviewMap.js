import React from 'react'
import { connect } from 'react-redux'
import CardView from 'react-native-cardview'
import { View, Text, StyleSheet, InteractionManager, ActivityIndicator as RNActivityIndicator } from 'react-native'

import { createThemedComponent } from 'react-native-theming'
import MapView from 'react-native-maps'
import moment from 'moment'
import PropTypes from 'prop-types'
import * as s from '../../../../state/selectors'
import tr from '../../../../i18n/i18n'
import EmptyContainer from '../../../../components/empty-container'
import { colors } from '../../../../theme'
import a from '../../../../state/actions'
import * as t from '../../../../state/actionsType'
import LocationApi from '../../../../api/location/LocationApi'
import globalObject from '../../../../utils/globalObj'

const ActivityIndicator = createThemedComponent(RNActivityIndicator, ['color'])

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  detailView: {
    width: '90%',
    backgroundColor: 'white',
    padding: 15,
    marginTop: 10,
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  detailViewChild: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  number: {
    color: '#4290EA',
    fontSize: 32
  },
  title: {
    color: 'gray',
    fontSize: 12
  }
})

@connect(
  state => {
    return {
      isOnline: s.isNetworkConnected(state),
      ...state.mapOverview
    }
  },
  dispatch => ({
    fetchMapOverviewData: () => dispatch(a[t.FETCH_OVERVIEW_MAP_DATA]()),
    updateFirstRoute: curLoc => dispatch(a[t.UPDATE_ROUTE_TO_FIRST_WAYPOINT](curLoc))
  }),
  null,
  { withRef: true }
)
export default class OverviewMap extends React.Component {
  state = {
    isReady: false
  }
  static propTypes = {
    isOnline: PropTypes.bool,
    fetchMapOverviewData: PropTypes.func,
    updateFirstRoute: PropTypes.func,
    duration: PropTypes.number,
    distance: PropTypes.number,
    steps: PropTypes.array,
    markers: PropTypes.array,
    firstRoute: PropTypes.object,
    tasks: PropTypes.array
  }
  componentDidMount() {
    const { updateFirstRoute } = this.props
    InteractionManager.runAfterInteractions(() => {
      this.setState({ isReady: true })
      LocationApi.watchLocation(pos => {
        if (pos) updateFirstRoute()
      })
    })
  }

  renderContent = tasks => {
    const { duration, distance, firstRoute } = this.props
    let finalDurationVal = duration
    let finalDistanceVal = distance
    let durationLabel = '--'
    let distanceLabel = '--'
    if (firstRoute) {
      finalDistanceVal += firstRoute.distance
      finalDurationVal += firstRoute.duration
      durationLabel = moment('2015-01-01').startOf('day').seconds(finalDurationVal).format('H[h] m[m]')
      durationLabel = durationLabel.charAt(0) === '0'
        ? durationLabel.substring(durationLabel.indexOf(' '))
        : durationLabel
      const distanceNumber = parseFloat(finalDistanceVal / 1000).toFixed(1)
      distanceLabel = distanceNumber - Math.floor(distanceNumber) === 0 ? Math.floor(distanceNumber) : distanceNumber
    }
    return (
      <CardView style={styles.detailView} cardElevation={2} cornerRadius={5}>
        <View style={styles.detailViewChild}>
          <Text style={styles.number}>{tasks.length}</Text>
          <Text style={styles.title}>{tr('tasks').toUpperCase()}</Text>
        </View>
        <View style={styles.detailViewChild}>
          {
            <Text style={styles.number}>
              {durationLabel}
            </Text>
          }
          <Text style={styles.title}>{tr('estimated_time').toUpperCase()}</Text>
        </View>
        <View style={styles.detailViewChild}>
          <Text style={styles.number}>
            {distanceLabel}
          </Text>
          <Text style={styles.title}>{tr('kilometers').toUpperCase()}</Text>
        </View>
      </CardView>
    )
  }

  render() {
    const { isReady } = this.state
    const { isOnline, fetchMapOverviewData } = this.props
    const { tasks, steps, markers, firstRoute } = this.props
    if (!isReady) return <ActivityIndicator color={'@brand'} />
    return (
      <EmptyContainer offline={!isOnline}>
        <View style={styles.container}>
          <MapView
            ref={c => {
              globalObject.mainMap = c
            }}
            style={styles.map}
            onMapReady={fetchMapOverviewData}
            showsUserLocation
          >
            {steps && <MapView.Polyline coordinates={steps} strokeWidth={4} strokeColor={colors.black} />}
            {firstRoute &&
              <MapView.Polyline coordinates={firstRoute.steps} strokeWidth={4} strokeColor={colors.directionColor} />}
            {markers}
          </MapView>
          {this.renderContent(tasks)}
        </View>
      </EmptyContainer>
    )
  }
}
