import PropTypes from 'prop-types'
import React from 'react'
import {
  StyleSheet
} from 'react-native'
import { colors, images } from '../../../../theme/index'
import EmptyContainer from '../../../../components/empty-container/index'
import TaskItem from '../../components/Task.item'
import SmartList from '../../../../components/smart-list/SmartList'
import * as c from '../../../../state/constants'
import tr from '../../../../i18n/i18n'
import UI from '../../../../utils/UI'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 5
  },
  sectionHeader: {
    marginLeft: 7,
    marginTop: 5,
    color: '#0A0A0A'
  }
})

class HistoryList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    UI.runAfterInteractions(() => {
      this.setState({ loading: false })
    })
  }

  renderItem = item => {
    const task = item.item
    return (
      <TaskItem
        isDropOff={task.type === c.TYPE_DROPOFF}
        address={task.address}
        tracking={task.order_item_tracking_number}
        theme={task.state === 'failed' ? c.RED : c.WHITE}
      />
    )
  }

  render() {
    const { tasks } = this.props

    return (
      <SmartList
        data={tasks}
        keyExtractor={item => `key_${item.id * Math.random()}`}
        renderItem={this.renderItem}
        onLoadData={this.props.onLoadData}
        onLoadMore={this.props.onLoadMore}
        style={styles.container}
        emptyContainer={<EmptyContainer
          isEmpty
          image={images.icons.noJobs}
          title={tr('history_no_item')}
          subtitle={tr('curjob_not_found_subtitle')}
          style={{ flex: 1 }}
        />}
      />
    )
  }
}

HistoryList.propTypes = {
  tasks: PropTypes.array,
  onLoadData: PropTypes.func,
  onLoadMore: PropTypes.func
}

export default HistoryList
