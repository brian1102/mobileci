import PropTypes from 'prop-types'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { bindActionCreators } from 'redux'
import { createThemedComponent } from 'react-native-theming'
import TaskGroupMap from '../../../../../components/task-map/TaskGroupMap'
import TaskControlPanel from './components/TaskControlPanel'
import * as c from '../../../../../state/constants'
import connect from '../../../../../utils/connect'
import a from '../../../../../state/actions'
import * as t from '../../../../../state/actionsType'
import * as s from '../../../../../state/selectors'
import { images } from '../../../../../theme'
import store from '../../../../../state/getStore'
import tr from '../../../../../i18n/i18n'
import { isArrive } from '../../../../../utils'
import { info } from '../../../../../utils/logger'
import RNCircleButton from '../../../../../components/circle-button/CircleButton'
import LocationAPi from '../../../../../api/location/LocationApi'
import { openGoogleMapForNavigation } from '../../../../../utils/openAnotherApps/openGoogleMapForNavigation.util'
import Header from '../../../../../components/header/Header.component'

const CircleButton = createThemedComponent(RNCircleButton, ['background'])

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  navigationButton: {
    position: 'absolute',
    bottom: 20,
    right: 15
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
})

const createDeliveryExceptionDialog = selectableOptions => ({
  title: tr('delivery_exception_dialog_title'),
  icon: images.icons.report,
  color: '#FE7259',
  style: { paddingBottom: 0 },
  selectableOptions,
  singleSelect: true,
  onSubmitSelectableOptions: reason => {
    store.dispatch(a[t.HIDE_DIALOG]())

    store.dispatch(a[t.REPORT_TASK_REQUEST](reason))
  },
  hideDialog: () => {
    store.dispatch(a[t.HIDE_DIALOG]())
  }
})

const createPreCompletedDialog = (title, description) => ({
  title,
  description,
  color: '#FE7259',
  options: [
    {
      title: tr('cancel'),
      onPress: () => {
        store.dispatch(a[t.HIDE_DIALOG]())
      }
    },
    {
      title: tr('yes'),
      onPress: () => {
        store.dispatch(a[t.HIDE_DIALOG]())
        setTimeout(() => {
          store.dispatch(a[t.COMPLETE_TASK_REQUEST]())
        }, 600)
      }
    }
  ]
})

// eslint-disable-next-line react/prefer-stateless-function
class TaskDetail extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { state } = navigation
    const title = state.params ? state.params.title : tr('task_detail')
    return {
      header: props => <Header {...props} title={title} />
    }
  }

  onAttemptFinishTask = () => {
    const { act, currentTask, currentLocation } = this.props
    try {
      const isArrived = isArrive(currentLocation, currentTask)

      if (!isArrived) {
        act[t.SHOW_DIALOG](
          createPreCompletedDialog(
            tr('done_too_far'),
            tr('done_too_far_description')
          )
        )
        return
      }
    } catch (error) {
      info(error)
    }

    act[t.SHOW_DIALOG](
      createPreCompletedDialog(
        tr('complete_task'),
        tr('complete_task_description')
      )
    )
  }

  openGoogleMap = () => {
    const { currentLocation, currentTask } = this.props

    const data = {
      source: {
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude
      },
      destination: {
        latitude: currentTask.latitude,
        longitude: currentTask.longitude
      },
      params: [
        {
          key: 'dirflg',
          value: 'DRIVING'
        }
      ]
    }
    openGoogleMapForNavigation(data)
  }

  renderFloatButton = () => {
    if (!LocationAPi.hasFoundCurrentLocation(this.props.currentLocation))
      return null
    return (
      <CircleButton
        onPress={this.openGoogleMap}
        style={styles.navigationButton}
        background={'@brand'}
        size={8}
        titleColor={'white'}
        icon="ios-navigate"
      />
    )
  }

  render() {
    const {
      act,
      currentTask,
      startTaskStatus,
      onPressComplete,
      dex,
      currentTaskIndex
    } = this.props

    if (!currentTask) return null

    const isActive = currentTaskIndex === 0
    const shouldShowCompleteButton = isActive

    return (
      <View style={styles.container}>
        <TaskGroupMap
          style={styles.map}
          taskGroup={{ tasks: [currentTask] }}
          showsUserLocation
        />
        <TaskControlPanel
          shouldShowCompleteButton={shouldShowCompleteButton}
          currentTask={currentTask}
          isDropOff={currentTask.type === c.TYPE_DROPOFF}
          startTaskStatus={startTaskStatus}
          onPressReport={() =>
            act[t.SHOW_DIALOG](createDeliveryExceptionDialog(dex))}
          onPressComplete={onPressComplete}
          onPressStart={() => act[t.START_TASK_REQUEST]()}
          startCheckingCondition={this.onAttemptFinishTask}
        />
        {this.renderFloatButton()}
      </View>
    )
  }
}

TaskDetail.propTypes = {
  currentTask: PropTypes.object,
  currentLocation: PropTypes.object,
  currentTaskIndex: PropTypes.number,
  startTaskStatus: PropTypes.object,
  onPressComplete: PropTypes.func,
  act: PropTypes.any,
  dex: PropTypes.any
}

const mapDispatchToProps = dispatch => ({
  act: bindActionCreators(a, dispatch)
})

const mapStateToProps = state => {
  const currentLocation = s.getLocation(state)
  const currentTask = s.getCurrentTask(state)
  const currentTaskIndex = s.getCurrentTaskIndex(state)
  const startTaskStatus = s.getStartTaskStatus(state)
  const dex = s.getCompanyExceptions(state)

  return {
    currentTask,
    currentTaskIndex,
    startTaskStatus,
    dex,
    currentLocation
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskDetail)
