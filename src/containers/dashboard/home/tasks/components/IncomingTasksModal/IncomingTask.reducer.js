import { handleActions } from 'redux-actions'
import { fromJS, Map } from 'immutable'
import * as t from '../../../../../../state/actionsType'
import * as u from '../../../../../../utils'

const actionHandlers = {
  [t.SHOW_INCOMING_TASKGROUPS_POPUP]: (state, { payload }) =>
    state.merge(
      Map({
        taskGroupIds: payload,
        modalVisible: true
      })
    ),
  [t.HIDE_INCOMING_TASKGROUPS_POPUP]: state => state.set('modalVisible', false),
  [t.FECTH_INCOMING_TASKGROUPS]: state =>
    state.set('fetchIncomingTaskGroupStatus', u.requestState),
  [t.FECTH_INCOMING_TASKGROUPS_SUCCESS]: (state, { payload }) =>
    state
      .merge(
        Map({
          taskGroups: payload.taskGroups,
          total: payload.total
        })
      )
      .set('fetchIncomingTaskGroupStatus', u.successState),
  [t.FECTH_INCOMING_TASKGROUPS_FAILED]: (state, { payload }) =>
    state.set('fetchIncomingTaskGroupStatus', u.failedState(payload)),
  [t.ACCEPT_TASKGROUPS]: state => state.set('acceptApiStatus', u.requestState),
  [t.ACCEPT_TASKGROUPS_FAILED]: (state, { payload }) =>
    state.set('acceptApiStatus', u.failedState(payload)),
  [t.ACCEPT_TASKGROUPS_SUCCESS]: state =>
    state.set('acceptApiStatus', u.successState),
  [t.REJECT_TASKGROUPS]: state => state.set('rejectApiStatus', u.requestState),
  [t.REJECT_TASKGROUPS_FAILED]: (state, { payload }) =>
    state.set('rejectApiStatus', u.failedState(payload)),
  [t.REJECT_TASKGROUPS_SUCCESS]: state =>
    state.set('rejectApiStatus', u.successState),
  [t.SET_CURRENT_TASKGROUP]: (state, { payload }) => {
    const taskGroups = state.get('taskGroups')
    return taskGroups && taskGroups.length && payload < taskGroups.length
      ? state.set('currentTaskGroup', taskGroups[payload])
      : state
  }
}

export default handleActions(actionHandlers, fromJS({}))
