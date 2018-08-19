import React from 'react'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'
import LinearGradientBackground from 'react-native-linear-gradient'
import Loader from '../../../../components/loader/Loader'
import CardView from '../../../../components/card-view'
import styles from './statusScreen.style'
import EmptyContainer from '../../../../components/empty-container'
// import CircularGradientColor from '../../../../components/circular-gradient-progress/CircularSlider'
import tr from '../../../../i18n'
// redux
import connect from '../../../../utils/connect'
import * as s from '../../../../state/selectors'
import * as t from '../../../../state/actionsType'
import a from '../../../../state/actions'

@connect(
  state => ({
    dailyStatus: s.getDailyStatus(state),
    isFetching: s.getFetchingDailyStatus(state),
    isOnline: s.isNetworkConnected(state),
    tasks: s.getTask(state)
  }),
  {
    fetchDailyStatus: a[t.FETCH_DAILY_STATUS]
  }
)
class StatusScreen extends React.Component {
  componentDidMount() {
    this.props.fetchDailyStatus()
  }

  // eslint-disable-next-line
  renderContent = () => {
    const { dailyStatus, isFetching, tasks } = this.props

    if (isFetching)
      return (
        <View style={styles.topView}>
          <Loader />
        </View>
      )

    if (!dailyStatus || (dailyStatus && dailyStatus.length === 0)) return null

    const statusData = dailyStatus[0].tasks

    // TODO: comment for now and we will uncomment later when status logic has been changed
    //
    // const doneTasks = statusData.completed + statusData.failed
    // const totalTasks = statusData.accepted

    // let remainingTasks = totalTasks - doneTasks
    // if (remainingTasks <= 0) remainingTasks = 0

    // let percentDone = 0
    // if (totalTasks > 0) {
    //   percentDone = Math.floor(doneTasks * 100 / totalTasks)
    // } else {
    //   percentDone = 100
    // }

    // if (percentDone >= 100) {
    //   // small hack to render beautiful circle gradient
    //   percentDone = 99.9
    // }
    // const degree = percentDone * 360 / 100

    return (
      <View
        style={styles.topView}
        onLayout={e => {
          if (this.height) return
          const { height } = e.nativeEvent.layout
          this.height = height
        }}
      >
        <Text style={styles.todayText}>{tr('today')}</Text>
        <View>
          {/* <CircularGradientColor
            startDegree={0}
            degree={degree}
            segments={10}
            strokeWidth={18}
            radius={70}
            bgCircleColor="#2b3a4d"
            gradientColorTo="#5bbd5a"
            gradientColorFrom="#38a7df"
            style={styles.circleStatusContainer}
          > */}
          <View style={styles.moreContainerWithNoCircleGradient}>
            <Text style={styles.moreNumber}>{tasks.length}</Text>
            <Text style={styles.moreText}>{tr('more').toUpperCase()}</Text>
          </View>
          {/* </CircularGradientColor> */}
        </View>
        <View style={styles.detailView}>
          {/* <View style={styles.detailViewChild}>
            <Text style={styles.number}>{statusData.accepted}</Text>
            <Text style={styles.title}>{tr('accepted').toUpperCase()}</Text>
          </View>
          <View style={styles.separator} /> */}
          <View style={styles.detailViewChild}>
            <Text style={styles.number}>{statusData.completed}</Text>
            <Text style={styles.title}>{tr('completed').toUpperCase()}</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.detailViewChild}>
            <Text style={styles.number}>{statusData.failed}</Text>
            <Text style={styles.title}>{tr('reported').toUpperCase()}</Text>
          </View>
        </View>
      </View>
    )
  }

  render() {
    const { isOnline } = this.props
    return (
      <EmptyContainer offline={!isOnline}>
        <LinearGradientBackground
          start={{ x: 0.5, y: 0.5 }}
          end={{ x: 0.5, y: 1.0 }}
          colors={['#f0f0f0', '#dddddd']}
          style={styles.wrapper}
        >
          <CardView
            cardElevation={2}
            cornerRadius={10}
            style={styles.container}
          >
            {this.renderContent()}
          </CardView>
        </LinearGradientBackground>
      </EmptyContainer>
    )
  }
}
StatusScreen.propTypes = {
  fetchDailyStatus: PropTypes.func,
  dailyStatus: PropTypes.object,
  isFetching: PropTypes.bool,
  isOnline: PropTypes.bool,
  tasks: PropTypes.array
}

export default StatusScreen
