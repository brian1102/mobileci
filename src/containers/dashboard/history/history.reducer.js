import { handleActions } from 'redux-actions'
import { fromJS } from 'immutable'
import * as u from '../../../utils/index'
import * as t from '../../../state/actionsType'

const actionHandlers = {
  [t.FETCH_HISTORY_TODAY_SUCCESS]: (state, { payload }) =>
    state.set('today', payload).set('fetchHistoryTodayStatus', u.successState),
  [t.FETCH_HISTORY_TODAY_REQUEST]: state =>
    state.set('fetchHistoryTodayStatus', u.requestState),
  [t.FETCH_HISTORY_TODAY_FAILED]: (state, { payload }) =>
    state.set('fetchHistoryTodayStatus', u.failedState(payload)),

  [t.FETCH_HISTORY_LAST7DAYS_SUCCESS]: (state, { payload }) =>
    state
      .set('last7days', payload)
      .set('fetchHistoryLast7daysStatus', u.successState),
  [t.FETCH_HISTORY_LAST7DAYS_REQUEST]: state =>
    state.set('fetchHistoryLast7daysStatus', u.requestState),
  [t.FETCH_HISTORY_LAST7DAYS_FAILED]: (state, { payload }) =>
    state.set('fetchHistoryLast7daysStatus', u.failedState(payload)),

  [t.FETCH_HISTORY_LAST4WEEKS_SUCCESS]: (state, { payload }) =>
    state
      .set('last4weeks', payload)
      .set('fetchHistoryLast4weeksStatus', u.successState),
  [t.FETCH_HISTORY_LAST4WEEKS_REQUEST]: state =>
    state.set('fetchHistoryLast4weeksStatus', u.requestState),
  [t.FETCH_HISTORY_LAST4WEEKS_FAILED]: (state, { payload }) =>
    state.set('fetchHistoryLast4weeksStatus', u.failedState(payload))
}
export default handleActions(actionHandlers, fromJS({}))
