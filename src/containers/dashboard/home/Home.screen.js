import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RNScrollableTabView from 'react-native-scrollable-tab-view'
// Redux
import { connect } from 'react-redux'
import { createThemedComponent, createStyle } from 'react-native-theming'
import * as s from '../../../state/selectors'
import a from '../../../state/actions'
import * as t from '../../../state/actionsType'
// Localization & helpers
import tr from '../../../i18n'
import UI from '../../../utils/UI'
// Components
import EmptyContainer from '../../../components/empty-container'
import TaskScreen from './tasks/Task.screen'
import MapScreen from './maps/OverviewMap'
import StatusScreen from './status/StatusScreen'
import OfflineStatus from '../../../components/offline-status/OfflineStatus'
// Theme & Resources
import { images } from '../../../theme'
import Header from '../../../components/header/Header.component'

const ScrollableTabView = createThemedComponent(RNScrollableTabView, [
  'tabBarActiveTextColor',
  'tabBarBackgroundColor',
])

@connect(
  state => {
    const tasks = s.getTask(state)
    const fetchIncomingTaskGroupStatus = s.getFetchingIncomingTaskStatus(state)
    const isOnline = s.isNetworkConnected(state)
    const isDaemonRunning = s.getIsDaemonRunning(state)
    const jobQueue = s.getJobQueue(state)

    return {
      tasks,
      fetchIncomingTaskGroupStatus,
      isOnline,
      isDaemonRunning,
      jobQueue,
    }
  },
  dispatch => ({
    fetchTask: () => dispatch(a[t.FETCH_TASKS_REQUEST]({ reload: true })),
    fetchIncomingTaskGroup: () => {
      dispatch(a[t.FECTH_INCOMING_TASKGROUPS]())
    },
    onRetrySync: () => dispatch(a[t.SYNCING_DEAMON_REQUEST]()),
  })
)
export default class HomeScreen extends Component {
  static navigationOptions = {
    header: props =>
      <Header
        {...props}
        style={styles.header}
        showMenuButton
        title={tr('tasks').toUpperCase()}
      />,
  }

  static propTypes = {
    fetchIncomingTaskGroupStatus: PropTypes.object,
    tasks: PropTypes.array,
    fetchTask: PropTypes.func,
    fetchIncomingTaskGroup: PropTypes.func,
    isOnline: PropTypes.bool.isRequired,
    isDaemonRunning: PropTypes.bool.isRequired,
    onRetrySync: PropTypes.any,
  }

  constructor(props) {
    super(props)
    this.state = {
      loading: true,
    }
  }

  componentDidMount() {
    UI.runAfterInteractions(() => {
      this.setState({ loading: false })
    })
  }

  render() {
    const {
      fetchIncomingTaskGroupStatus,
      fetchIncomingTaskGroup,
      tasks,
      fetchTask,
      isOnline,
      isDaemonRunning,
      onRetrySync,
    } = this.props

    return (
      <EmptyContainer
        isEmpty={tasks && tasks.length === 0}
        image={images.icons.noJobs}
        title={tr('curjob_not_found')}
        subtitle={tr('curjob_not_found_subtitle')}
        allowPullToRefresh
        onRefreshData={() => {
          fetchIncomingTaskGroup()
          fetchTask()
        }}
        refreshing={
          (fetchIncomingTaskGroupStatus &&
            fetchIncomingTaskGroupStatus.isWorking)
        }
      >
        <OfflineStatus
          isOnline={isOnline}
          isLoading={isDaemonRunning}
          showTryButton={false}
          onPressRetry={onRetrySync}
        />
        <ScrollableTabView
          tabBarBackgroundColor={'@brand'}
          tabBarUnderlineStyle={styles.tabBarUnderline}
          tabBarActiveTextColor={'@tabActiveColor'}
          tabBarTextStyle={styles.tabBarText}
          tabBarInactiveTextColor={'rgba(255,255,255,0.6)'}
          style={{ borderWidth: 0, borderColor: 'transparent' }}
          onChangeTab={this.onChangeTab}
        >
          <TaskScreen tabLabel={tr('home_list')} />
          <MapScreen
            tabLabel={tr('home_map')}
          />
          <StatusScreen tabLabel={tr('home_status')} />
        </ScrollableTabView>
      </EmptyContainer>
    )
  }
}

const styles = createStyle({
  tabBarUnderline: {
    backgroundColor: '#ffffff',
    height: 2,
  },
  tabBarText: {
    fontWeight: '600',
    paddingTop: 10,
  },
})
