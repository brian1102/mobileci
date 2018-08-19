import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import * as t from '../../state/actionsType'

const requestState = {
  isWorking: true,
  isFailed: false,
  error: null,
  isCalled: true
}
const successState = { isWorking: false, isFailed: false, error: null }
const failedState = payload => ({
  isWorking: false,
  isFailed: true,
  error: payload
})

const actionHandlers = {
  [t.FETCH_TASKS_REQUEST]: state => state.set('fetchTasks', requestState),
  [t.FETCH_TASKS_FAILED]: (state, { payload }) =>
    state.set('fetchTasks', failedState(payload)),
  [t.FETCH_TASKS_SUCCESS]: state => state.set('fetchTasks', successState),

  [t.START_TASK_REQUEST]: state => state.set('startTaskStatus', requestState),
  [t.START_TASK_FAILED]: (state, { payload }) =>
    state.set('startTaskStatus', failedState(payload)),
  [t.START_TASK_SUCCESS]: state => state.set('startTaskStatus', successState),

  [t.SAVE_IMAGE_TO_DISK_REQUEST]: state =>
    state.set('savingImageStatus', requestState),
  [t.SAVE_IMAGE_TO_DISK_FAILED]: (state, { payload }) =>
    state.set('savingImageStatus', failedState(payload)),
  [t.SAVE_IMAGE_TO_DISK_SUCCESS]: state =>
    state.set('savingImageStatus', successState),

  [t.FETCH_CONVERSATION_REQUEST]: state =>
    state.set('fetchConversation', requestState),
  [t.FETCH_CONVERSATION_FAILED]: (state, { payload }) =>
    state.set('fetchConversation', failedState(payload)),
  [t.FETCH_CONVERSATION_SUCCESS]: state =>
    state.set('fetchConversation', successState)
}

export default handleActions(actionHandlers, fromJS({}))
