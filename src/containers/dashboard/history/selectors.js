import { createSelector } from 'reselect'
import * as u from '../../../utils/index'

const getHistoryState = state => state.history

export const getHistoryToday = createSelector([getHistoryState], history =>
  history.get('today', [])
)

export const getHistoryLast7days = createSelector([getHistoryState], history =>
  history.get('last7days', [])
)
export const getHistoryLast4Weeks = createSelector([getHistoryState], history =>
  history.get('last4weeks', [])
)

export const getFetchHistoryTodayStatus = createSelector(
  [getHistoryState],
  history => history.get('fetchHistoryTodayStatus', u.defaultValOnSelector)
)

export const getFetchHistoryLast7daysStatus = createSelector(
  [getHistoryState],
  history => history.get('fetchHistoryLast7daysStatus', u.defaultValOnSelector)
)

export const getFetchHistory4WeeksStatus = createSelector(
  [getHistoryState],
  history => history.get('fetchHistoryLast4weeksStatus', u.defaultValOnSelector)
)
