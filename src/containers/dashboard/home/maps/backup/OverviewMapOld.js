import React from 'react'
import { connect } from 'react-redux'
import CardView from 'react-native-cardview'
import {
  View,
  Text,
  StyleSheet,
  InteractionManager,
  ActivityIndicator as RNActivityIndicator
} from 'react-native'

import { createThemedComponent } from 'react-native-theming'
import moment from 'moment'
import PropTypes from 'prop-types'
import * as s from '../../../../state/selectors'
import tr from '../../../../i18n/i18n'
import TaskGroupMap from '../../../../components/task-map/TaskGroupMap'
import { getTasksCountAndLatLongForMapOverview } from '../../../../api/task/task.api'
import EmptyContainer from '../../../../components/empty-container'
import { info } from '../../../../utils/logger'
import { convertTasksData } from '../../../../utils/task.util'

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
  state => ({
    tasks: s.getTask(state),
    isOnline: s.isNetworkConnected(state)
  }),
  null,
  null,
  { withRef: true }
)
export default class OverviewMap extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      directions: null,
      fetchingOverview: true
    }
  }

  static propTypes = {
    isOnline: PropTypes.bool
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.getOverviewData()
    })
  }

  getOverviewData = async () => {
    let data = null
    try {
      const raw = await getTasksCountAndLatLongForMapOverview()
      data = convertTasksData(raw.data)
    } catch (error) {
      info('getOverviewData', error.message)
    }
    this.setState({
      fetchingOverview: false,
      tasks: data || []
    })
  }

  onDirectionCalculated = directions => {
    this.setState({
      directions
    })
  }

  renderContent = tasks => {
    const { directions } = this.state

    let formattedTime = null
    if (directions) {
      const seconds = directions.duration.value
      formattedTime = moment('2015-01-01')
        .startOf('day')
        .seconds(seconds)
        .format('H[h] mm[m]')
      formattedTime = formattedTime.charAt(0) === '0'
        ? formattedTime.substring(formattedTime.indexOf(' '))
        : formattedTime
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
              {formattedTime || '--'}
            </Text>
          }
          <Text style={styles.title}>{tr('estimated_time').toUpperCase()}</Text>
        </View>
        <View style={styles.detailViewChild}>
          <Text style={styles.number}>
            {directions
              ? parseFloat(directions.distance.value / 1000).toFixed(1)
              : '--'}
          </Text>
          <Text style={styles.title}>{tr('kilometers').toUpperCase()}</Text>
        </View>
      </CardView>
    )
  }

  render() {
    const { tasks, fetchingOverview } = this.state
    const { isOnline } = this.props

    if (fetchingOverview) return <ActivityIndicator color={'@brand'} />
    return (
      <EmptyContainer offline={!isOnline}>
        <View style={styles.container}>
          <TaskGroupMap
            ref={ref => {
              this.taskGroupMap = ref
            }}
            style={styles.map}
            taskGroup={{ tasks }}
            onDirectionCalculated={this.onDirectionCalculated}
            showDetailMarker={false}
            showsUserLocation
          />
          {this.renderContent(tasks)}
        </View>
      </EmptyContainer>
    )
  }
}
