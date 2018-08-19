import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  ActivityIndicator
} from 'react-native'
import Carousel from 'react-native-snap-carousel'
import connect from '../../../../../../utils/connect'
import tr from '../../../../../../i18n'
import Modal from '../../../../../../components/modal/Modal'
import { font, colors } from '../../../../../../theme'
import TaskGroupContent from './TaskGroupContent.component'
import * as s from '../../../../../../state/selectors'
import * as t from '../../../../../../state/actionsType'
import a from '../../../../../../state/actions'

const { width } = Dimensions.get('window')
const sliderWidth = width - 80

@connect(
  state => ({
    modalVisible: s.getMobileVisible(state),
    taskGroupIds: s.getTaskGroupIds(state),
    taskGroups: s.getIncomingTaskGroups(state),
    fetchIncomingTaskGroupStatus: s.getFetchingIncomingTaskStatus(state),
    acceptApiStatus: s.getAcceptApiStatus(state),
    rejectApiStatus: s.getRejectApiStatus(state),
    currentTaskGroup: s.getCurrentTaskGroup(state),
    isOnline: s.isNetworkConnected(state)
  }),
  {
    showTaskGroups: a[t.SHOW_INCOMING_TASKGROUPS_POPUP],
    closeTaskGroups: a[t.HIDE_INCOMING_TASKGROUPS_POPUP],
    fetchTaskGroups: a[t.FECTH_INCOMING_TASKGROUPS],
    acceptTaskGroup: a[t.ACCEPT_TASKGROUPS],
    rejectTaskGroup: a[t.REJECT_TASKGROUPS],
    setCurrentTaskgroup: a[t.SET_CURRENT_TASKGROUP]
  }
)
export default class IncomingTasksModal extends Component {
  static propTypes = {
    modalVisible: PropTypes.bool,
    taskGroups: PropTypes.array,
    closeTaskGroups: PropTypes.func,
    acceptTaskGroup: PropTypes.func,
    rejectTaskGroup: PropTypes.func,
    fetchIncomingTaskGroupStatus: PropTypes.object,
    setCurrentTaskgroup: PropTypes.func,
    isOnline: PropTypes.bool
  }

  constructor(props) {
    super(props)
    this.taskContentRefs = []
  }

  onModalShowing = () => {
    this.onSnapToItem(0)
  }

  onPrevTask = () => {
    if (this.carousel) this.carousel.snapToPrev()
  }

  onNextTask = () => {
    if (this.carousel) this.carousel.snapToNext()
  }

  onSnapToItem = index => {
    this.props.setCurrentTaskgroup(index)
    if (this.taskContentRefs[index]) {
      this.taskContentRefs[index].getWrappedInstance().startRenderContent()
    }
  }

  renderCarouselItem = ({ item, index }) => {
    const {
      taskGroups,
      acceptTaskGroup,
      rejectTaskGroup,
      isOnline
    } = this.props
    return (
      <View style={styles.slider}>

        <TaskGroupContent
          ref={ref => {
            this.taskContentRefs[index] = ref
          }}
          taskGroup={item}
          index={index}
          total={taskGroups.length}
          onPrev={this.onPrevTask}
          onNext={this.onNextTask}
          onAccept={acceptTaskGroup}
          onReject={rejectTaskGroup}
          isOnline={isOnline}
        />
      </View>
    )
  }

  renderContent = () => {
    const { taskGroups } = this.props
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{tr('job_incoming')}</Text>
        <Carousel
          ref={c => {
            this.carousel = c
          }}
          onSnapToItem={this.onSnapToItem}
          data={taskGroups}
          renderItem={this.renderCarouselItem}
          sliderWidth={width}
          itemWidth={sliderWidth}
        />
      </View>
    )
  }

  render() {
    const { modalVisible, fetchIncomingTaskGroupStatus } = this.props

    return (
      <Modal
        visible={modalVisible}
        onPreDismiss={this.props.closeTaskGroups}
        onShow={this.onModalShowing}
      >
        {fetchIncomingTaskGroupStatus && fetchIncomingTaskGroupStatus.isWorking
          ? <ActivityIndicator color={colors.white} />
          : this.renderContent()}
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  title: {
    color: 'white',
    fontSize: font.sizes.smaller,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center'
  },
  slider: {
    width: sliderWidth
  }
})
