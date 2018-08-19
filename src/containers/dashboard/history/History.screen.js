import PropTypes from 'prop-types'
import React from 'react'
import {
  View,
  ActivityIndicator
} from 'react-native'
import RNScrollableTabView from 'react-native-scrollable-tab-view'
import { bindActionCreators } from 'redux'
import { createThemedComponent } from 'react-native-theming'
import tr from '../../../i18n'
import { colors } from '../../../theme'
import styles from './history.styles'
import connect from '../../../utils/connect'
import * as s from '../../../state/selectors'
import * as t from '../../../state/actionsType'
import a from '../../../state/actions'
import EmptyContainer from '../../../components/empty-container'
import HistoryList from './components/HistoryList.component'
import UI from '../../../utils/UI'
import Header from '../../../components/header/Header.component'

const ScrollableTabView = createThemedComponent(RNScrollableTabView, [
  'tabBarActiveTextColor',
  'tabBarBackgroundColor'
])

@connect(
  state => ({
    isOnline: s.isNetworkConnected(state),
    today: s.getHistoryToday(state),
    last4weeks: s.getHistoryLast4Weeks(state),
    last7days: s.getHistoryLast7days(state)
  }),
  dispatch => ({
    act: bindActionCreators(a, dispatch)
  })
)
export default class HistoryScreen extends React.Component {
  static navigationOptions = {
    header: props =>
      <Header
        {...props}
        showMenuButton
        title={tr('tab_history').toUpperCase()}
      />
  }

  static propTypes = {
    act: PropTypes.object,
    today: PropTypes.array,
    last4weeks: PropTypes.array,
    last7days: PropTypes.array,
    isOnline: PropTypes.bool
  }

  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }

    this.wasLast4weeksApiCalled = false
    this.wasLast7DaysApiCalled = false
  }

  fetchToday = (listParams, done) => {
    this.props.act[t.FETCH_HISTORY_TODAY_REQUEST]({ done, listParams })
  }

  fetchLast7Days = (listParams, done) => {
    this.props.act[t.FETCH_HISTORY_LAST7DAYS_REQUEST]({ done, listParams })
  }

  fetchLast4Weeks = (listParams, done) => {
    this.props.act[t.FETCH_HISTORY_LAST4WEEKS_REQUEST]({ done, listParams })
  }

  componentDidMount() {
    UI.runAfterInteractions(() => {
      this.setState({ loading: false })
      // this.fetchToday()
    })
  }

  onChangeTab = ({ i }) => {
    if (i === 1 && !this.wasLast7DaysApiCalled) {
      this.wasLast7DaysApiCalled = true
      // this.fetchLast7Days()
    }
    if (i === 2 && !this.wasLast4weeksApiCalled) {
      this.wasLast4weeksApiCalled = true
      // this.fetchLast4Weeks()
    }
  }

  render() {
    const {
      today,
      last4weeks,
      last7days,
      isOnline
    } = this.props
    const { loading } = this.state

    if (loading)
      return (
        <View style={styles.container}>
          <ActivityIndicator color={colors.brand} />
        </View>
      )

    return (
      <EmptyContainer offline={!isOnline}>
        <ScrollableTabView
          tabBarBackgroundColor={'@brand'}
          tabBarUnderlineStyle={styles.tabBarUnderline}
          tabBarActiveTextColor={'@tabActiveColor'}
          tabBarTextStyle={styles.tabBarText}
          tabBarInactiveTextColor={'rgba(255,255,255,0.6)'}
          style={{ borderWidth: 0, borderColor: 'transparent' }}
          onChangeTab={this.onChangeTab}
        >
          <HistoryList
            onLoadData={this.fetchToday}
            onLoadMore={this.fetchToday}
            tasks={today}
            tabLabel={tr('history_range_today').toUpperCase()}
          />
          <HistoryList
            onLoadData={this.fetchLast7Days}
            onLoadMore={this.fetchLast7Days}
            tasks={last7days}
            tabLabel={tr('history_range_1_week').toUpperCase()}
          />
          <HistoryList
            onLoadData={this.fetchLast4Weeks}
            onLoadMore={this.fetchLast4Weeks}
            tasks={last4weeks}
            tabLabel={tr('history_range_1_month').toUpperCase()}
          />
        </ScrollableTabView>
      </EmptyContainer>
    )
  }
}
