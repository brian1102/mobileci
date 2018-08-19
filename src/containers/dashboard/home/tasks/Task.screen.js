import PropTypes from 'prop-types'
import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator as RNActivityIndicator,
} from 'react-native'
import { createThemedComponent } from 'react-native-theming'
import { colors } from '../../../../theme/index'
import TaskItem from '../../components/Task.item'
import * as c from '../../../../state/constants'
import connect from '../../../../utils/connect'
import * as t from '../../../../state/actionsType'
import a from '../../../../state/actions'
import * as s from '../../../../state/selectors'
import SmartList from '../../../../components/smart-list/SmartList'

const ActivityIndicator = createThemedComponent(RNActivityIndicator, ['color'])

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 5,
  },
  sectionHeader: {
    marginLeft: 7,
    marginTop: 5,
    color: '#0A0A0A',
  },
  loadMoreSpinnerView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})

class TaskScreenContainer extends React.Component {
  onTabPress = selectedTabIndex =>
    this.setState({
      selectedTabIndex,
    })

  renderSectionHeader = section => {
    return (
      <Text style={styles.sectionHeader}>
        {section.section.title.toUpperCase()}
      </Text>
    )
  }

  renderItem = item => {
    const task = item.item
    const isActive = item.index === 0
    return (
      <TaskItem
        onPress={() => this.props.onPress(item)}
        isDropOff={task.type === c.TYPE_DROPOFF}
        address={task.address}
        theme={isActive ? c.BLACK : c.WHITE}
        tracking={task.item.trackingNumber}
      />
    )
  }

  renderFooter = () => {
    return (
      <View style={styles.loadMoreSpinnerView}>
        <ActivityIndicator color={'@brand'} />
      </View>
    )
  }
  render() {
    const {
      tasks,
      pullToRefresh,
      loadMoreTask
    } = this.props

    return (
      <View style={styles.container}>
        <SmartList
          data={tasks}
          keyExtractor={item => `key_${item.id}`}
          renderItem={this.renderItem}
          onLoadData={pullToRefresh}
          onLoadMore={loadMoreTask}
          pageSize={c.TASK_PAGE_SIZE}
        />
      </View>
    )
  }
}

TaskScreenContainer.propTypes = {
  onPress: PropTypes.func,
  tasks: PropTypes.array,
  pullToRefresh: PropTypes.func,
  loadMoreTask: PropTypes.func
}

const mapDispatchToProps = dispatch => ({
  onPress: item => {
    dispatch(a[t.SET_CURRENT_TASK](item))
    dispatch(
      a[t.NAVIGATE]({
        routeName: 'TaskDetail',
        params: {
          title: item && item.item && item.item.item
            ? item.item.item.trackingNumber
            : '',
        },
      })
    )
  },
  pullToRefresh: (listParams, done) => {
    dispatch(a[t.FECTH_INCOMING_TASKGROUPS]())
    dispatch(a[t.FETCH_TASKS_REQUEST]({ reload: true, done, listParams }))
  },
  loadMoreTask: (listParams, done) => {
    dispatch(a[t.FETCH_TASKS_REQUEST]({ reload: false, done, listParams }))
  }
})

const mapStateToProps = state => {
  const tasks = s.getTask(state)
  const fetchIncomingTaskGroupStatus = s.getFetchingIncomingTaskStatus(state)
  const fetchTaskStatus = s.getFetchTasksStatus(state)

  return {
    tasks,
    fetchIncomingTaskGroupStatus,
    fetchTaskStatus,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskScreenContainer)
