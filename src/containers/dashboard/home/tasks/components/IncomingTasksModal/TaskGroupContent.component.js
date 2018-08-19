import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  ActivityIndicator,
  ScrollView,
  Dimensions
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { connect } from 'react-redux'
import * as s from '../../../../../../state/selectors'
import tr from '../../../../../../i18n'
import UI from '../../../../../../utils/UI'
import { colors, images } from '../../../../../../theme'
import Timeline from '../../../../../../components/time-line/Timeline'
import TaskGroupMap from '../../../../../../components/task-map/TaskGroupMap'
import LocationApi from '../../../../../../api/location/LocationApi'
import { getPackageSizeDescription } from '../../../../../../utils/task.util'

@connect(
  state => ({
    acceptApiStatus: s.getAcceptApiStatus(state),
    rejectApiStatus: s.getRejectApiStatus(state)
  }),
  null,
  null,
  { withRef: true }
)
export default class TaskGroupContent extends Component {
  static propTypes = {
    taskGroup: PropTypes.object,
    acceptApiStatus: PropTypes.object,
    rejectApiStatus: PropTypes.object,
    index: PropTypes.number,
    total: PropTypes.number,
    onPrev: PropTypes.func,
    onNext: PropTypes.func,
    onAccept: PropTypes.func,
    onReject: PropTypes.func,
    isOnline: PropTypes.bool
  }

  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      contentRendered: false,
      distance: null
    }
  }

  componentDidMount() {
    UI.runAfterInteractions(() => {
      this.setState({ loading: false }, () => {
        this.calculateDistance()
      })
    })
  }

  startRenderContent() {
    if (!this.state.contentRendered) {
      UI.runAfterInteractions(() => {
        this.generateData()
      })
    }
  }

  generateData = () => {
    const { taskGroup } = this.props
    const timelineData = taskGroup.tasks.map(t => {
      const character = t.type === 'pickup' ? 'P' : 'D'
      const title = t.type === 'pickup'
        ? tr('pickup_location')
        : tr('dropoff_location')
      const circleColor = t.type === 'pickup' ? colors.pickup : colors.dropoff

      return {
        id: t.id,
        character,
        title,
        description: t.description,
        address: t.address,
        dimension: getPackageSizeDescription(t),
        timeDescription: t.timeDescription,
        style: {
          circleColor
        }
      }
    })

    this.setState(
      {
        timelineData,
        contentRendered: true
      },
      () => {
        this.startRenderMap()
      }
    )
  }

  startRenderMap = () => {
    setTimeout(() => {
      if (this.taskGroupMap) this.taskGroupMap.startRenderManually()
    }, 1500)
  }

  calculateDistance = async () => {
    const { tasks } = this.props.taskGroup
    if (tasks.length > 1) {
      const first = tasks[0]
      const last = tasks[tasks.length - 1]
      const waypoints = tasks.filter(t => t.id !== first.id && t.id !== last.id)
      let directions = null
      if (waypoints.length === 0) {
        directions = await LocationApi.getDirection(first, last)
      } else {
        directions = await LocationApi.getDirection(first, last, waypoints)
      }

      if (directions) {
        const { distance } = directions
        this.setState({ distance })
      }
    }
  }

  getDistanceText = () => {
    const { distance } = this.state
    if (distance) {
      return LocationApi.getDistanceText(distance.value)
    }
    return ''
  }

  renderHeader() {
    const { index, total, onPrev, onNext } = this.props

    const isDisablePrev = index === 0
    const isDisableNext = index === total - 1

    return (
      <View style={styles.header}>
        <TouchableOpacity
          disabled={isDisablePrev}
          style={styles.btn}
          onPress={onPrev}
        >
          <Text
            style={[styles.btnText, isDisablePrev && styles.btnTextNegative]}
          >
            {tr('prev')}
          </Text>
        </TouchableOpacity>

        <Text style={styles.indexTitle}>{index + 1}/{total}</Text>

        <TouchableOpacity
          disabled={isDisableNext}
          style={styles.btn}
          onPress={onNext}
        >
          <Text
            style={[styles.btnText, isDisableNext && styles.btnTextNegative]}
          >
            {tr('next')}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderJobContent() {
    const { taskGroup } = this.props

    return (
      <View style={styles.jobContent}>
        <Text style={styles.subtitle}>{tr('detail')}</Text>
        <View style={[styles.row, styles.section]}>
          <Text style={styles.deliveryDate}>{`${taskGroup.tasks.length} ${tr(
            'tasks'
          )}`}</Text>
          <View style={[styles.row, styles.property]}>
            <Icon name="flag" style={styles.icon} />
            <Text>{this.getDistanceText()}</Text>
          </View>
          {taskGroup.price &&
            <View style={[styles.row, styles.property]}>
              <Icon name="attach-money" style={styles.icon} />
              <Text>{taskGroup.price}</Text>
            </View>}
        </View>

        <View style={[styles.dottedLine]} />
      </View>
    )
  }

  renderJobDirections() {
    const { timelineData } = this.state
    return (
      <View style={styles.jobDirectionContainer}>
        <Timeline data={timelineData} />
      </View>
    )
  }

  renderMap() {
    const { taskGroup } = this.props
    return (
      <TaskGroupMap
        ref={ref => {
          this.taskGroupMap = ref
        }}
        style={styles.map}
        taskGroup={taskGroup}
        manualLoadMap
        shouldRenderDirection={false}
        scrollEnabled={false}
        zoomEnabled={false}
        rotateEnabled={false}
        pitchEnabled={false}
        zoomControlEnabled={false}
        toolbarEnabled={false}
        needShowStatus={false}
      />
    )
  }

  renderActions() {
    const {
      onAccept,
      onReject,
      acceptApiStatus,
      rejectApiStatus,
      isOnline
    } = this.props

    const disableButton =
      (acceptApiStatus && acceptApiStatus.isWorking) ||
      (rejectApiStatus && rejectApiStatus.isWorking) ||
      !isOnline

    return (
      <View style={styles.actions}>

        <TouchableOpacity
          disabled={disableButton}
          onPress={onReject}
          style={[
            styles.btn,
            styles.btnLeft,
            disableButton && styles.btnDisable
          ]}
        >

          {rejectApiStatus && rejectApiStatus.isWorking
            ? <ActivityIndicator color="white" />
            : <Text
                style={[styles.btnText, disableButton && styles.btnDisableText]}
              >
                {tr('reject').toUpperCase()}
              </Text>}

        </TouchableOpacity>
        <TouchableOpacity
          disabled={disableButton}
          onPress={onAccept}
          style={[styles.btn, disableButton && styles.btnDisable]}
        >
          {acceptApiStatus && acceptApiStatus.isWorking
            ? <ActivityIndicator color="white" />
            : <Text
                style={[styles.btnText, disableButton && styles.btnDisableText]}
              >
                {tr('accept').toUpperCase()}
              </Text>}
        </TouchableOpacity>
      </View>
    )
  }

  renderContent = () => {
    if (!this.state.contentRendered) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator />
        </View>
      )
    }

    return (
      <ScrollView>
        <View style={styles.jobInformation}>
          <Image
            style={styles.iconPackage}
            source={images.icons.package}
            resizeMode="contain"
          />
          {this.renderJobContent()}
        </View>
        {this.renderJobDirections()}
        {this.renderMap()}
      </ScrollView>
    )
  }

  render() {
    if (this.state.loading) return <ActivityIndicator />

    return (
      <View style={styles.container}>
        {this.renderHeader()}
        {this.renderContent()}
        {this.renderActions()}
      </View>
    )
  }
}

const { height } = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: 'white',
    borderRadius: 10,
    maxHeight: height * 0.6
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.8
  },
  header: {
    flexDirection: 'row',
    backgroundColor: 'rgb(24,34,40)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btn: {
    flex: 1,
    alignSelf: 'stretch',
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnText: {
    color: 'white',
    fontWeight: '600'
  },
  btnTextNegative: {
    color: 'rgba(255,255,255,0.5)'
  },
  indexTitle: {
    flex: 1,
    color: 'white',
    fontWeight: '600',
    textAlign: 'center'
  },
  jobInformation: {
    flexDirection: 'row',
    padding: 15
  },
  iconPackage: {
    width: 28,
    height: 28,
    marginRight: 10
  },
  jobContent: {
    flex: 1
  },
  subtitle: {
    fontSize: 12,
    color: colors.inactive,
    fontWeight: '600',
    lineHeight: 15
  },
  row: {
    flexDirection: 'row'
  },
  section: {
    marginBottom: 15
  },
  property: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 5
  },
  deliveryDate: {
    fontWeight: '600',
    flex: 1
  },
  icon: {
    marginRight: 1
  },
  dottedLine: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: colors.inactive
  },
  direction: {
    flexDirection: 'row'
  },
  jobDirectionContainer: {
    paddingHorizontal: 15
  },
  map: {
    width: '100%',
    height: 250
  },
  actions: {
    flexDirection: 'row',
    backgroundColor: colors.blueLink
  },
  btnLeft: {
    borderRightWidth: 1,
    borderRightColor: '#ccc'
  },
  btnDisableText: {
    color: 'gray'
  }
})
