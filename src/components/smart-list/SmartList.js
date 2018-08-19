import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
  ActivityIndicator as RNActivityIndicator,
  LayoutAnimation
} from 'react-native'
import { createThemedComponent } from 'react-native-theming'
import * as c from '../../state/constants'

const ActivityIndicator = createThemedComponent(RNActivityIndicator, ['color'])

export default class SmartList extends Component {
  static propTypes = {
    data: PropTypes.array,
    contentContainerStyle: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.array,
      PropTypes.object
    ]),
    style: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.array,
      PropTypes.object
    ]),
    horizontal: PropTypes.bool,
    onLoadData: PropTypes.func,
    onLoadMore: PropTypes.func,
    emptyContainer: PropTypes.object,
    distanceFromEndToLoadMore: PropTypes.number,
    pageSize: PropTypes.number
  }

  static defaultProps = {
    distanceFromEndToLoadMore: 75,
    pageSize: c.TASK_PAGE_SIZE
  }

  constructor(props) {
    super(props)
    this.oldDataLength = props.data ? props.data.length : 0
    this.state = {
      refreshing: false,
      loadingMore: false,
      hasMoreData: true,
      firstTimeFetching: false
    }
    // TODO: the layout animation can cause crash app on android when reload the task list
    // if (Platform.OS === 'android') {
    //   // eslint-disable-next-line
    //   UIManager.setLayoutAnimationEnabledExperimental &&
    //     UIManager.setLayoutAnimationEnabledExperimental(true)
    // }
  }

  componentDidMount() {
    if (this.oldDataLength === 0) this.onRefresh(true)
  }

  componentWillUpdate() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
  }

  onScroll = event => {
    const { onLoadMore, distanceFromEndToLoadMore, pageSize, data } = this.props
    const { loadingMore, hasMoreData, refreshing } = this.state

    if (!hasMoreData || refreshing) {
      return
    }

    const distanceFromEnd = this.distanceFromEnd(event)

    if (distanceFromEnd < distanceFromEndToLoadMore) {
      if (onLoadMore && !loadingMore) {
        this.setState({ loadingMore: true }, () => {
          const nextPage = Math.ceil(data.length / pageSize) + 1
          onLoadMore(
            {
              page: nextPage,
              pageSize,
              offset: data.length
            },
            newLength => {
              this.endLoadData(newLength)
            }
          )
        })
      }
    }
  }

  onRefresh = firstTime => {
    const { onLoadData, pageSize } = this.props
    if (this.props.onLoadData) {
      this.startRefresh(firstTime)
      onLoadData(
        {
          page: 1,
          pageSize,
          refresh: true
        },
        newLength => {
          this.endLoadData(newLength)
        }
      )
    }
  }

  startRefresh(firstTime) {
    this.setState({
      refreshing: !firstTime,
      hasMoreData: true,
      firstTimeFetching: true
    })
  }

  endRefresh() {
    this.setState({ refreshing: false })
  }

  endLoadData(newLength) {
    const { pageSize } = this.props

    let hasMoreData =
      this.oldDataLength === 0 ||
      (this.oldDataLength > 0 && this.oldDataLength < newLength)

    // check for first time, optimize the data fetching
    if (newLength < pageSize) hasMoreData = false
    this.oldDataLength = newLength

    this.setState({
      refreshing: false,
      loadingMore: false,
      hasMoreData,
      firstTimeFetching: false
    })
  }

  distanceFromEnd(event) {
    const {
      contentSize,
      contentInset,
      contentOffset,
      layoutMeasurement
    } = event.nativeEvent
    let contentLength = null
    let trailingInset = null
    let scrollOffset = null
    let viewportLength = null

    if (this.props.horizontal) {
      contentLength = contentSize.width
      trailingInset = contentInset.right
      scrollOffset = contentOffset.x
      viewportLength = layoutMeasurement.width
    } else {
      contentLength = contentSize.height
      trailingInset = contentInset.bottom
      scrollOffset = contentOffset.y
      viewportLength = layoutMeasurement.height
    }

    return contentLength + trailingInset - scrollOffset - viewportLength // eslint-disable-line no-mixed-operators
  }

  scrollToTop() {
    if (this.listView) {
      this.listView.scrollToOffset({ y: 0 })
    }
  }

  shouldItemUpdate = (prev, next) => {
    return prev.item !== next.item
  }

  renderFooter = () => {
    return (
      <View style={styles.loadMoreSpinnerView}>
        <ActivityIndicator color={'@brand'} />
      </View>
    )
  }

  renderFetchingIndicator = () => {
    return (
      <View style={styles.loadMoreSpinnerView}>
        <ActivityIndicator color={'@brand'} />
      </View>
    )
  }

  render() {
    const { emptyContainer, contentContainerStyle, data } = this.props

    const {
      hasMoreData,
      refreshing,
      loadingMore,
      firstTimeFetching
    } = this.state

    if (!data || (data.length === 0 && !hasMoreData)) {
      return (
        <ScrollView
          contentContainerStyle={[{ flex: 1 }, contentContainerStyle]}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this.onRefresh}
            />
          }
        >
          {emptyContainer}
        </ScrollView>
      )
    }

    return (
      <FlatList
        {...this.props}
        style={[{ flex: 1 }, this.props.style]}
        data={data}
        ref={ref => {
          this.listView = ref
        }}
        onRefresh={this.onRefresh}
        refreshing={this.state.refreshing}
        shouldItemUpdate={this.shouldItemUpdate}
        onScroll={hasMoreData && this.onScroll}
        ListHeaderComponent={
          firstTimeFetching && !refreshing && this.renderFetchingIndicator
        }
        ListFooterComponent={loadingMore && this.renderFooter}
      />
    )
  }
}

const styles = StyleSheet.create({
  loadMoreSpinnerView: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 5,
    paddingBottom: 5
  }
})
