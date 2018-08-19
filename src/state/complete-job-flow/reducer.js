import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import * as t from '../../state/actionsType'
import * as c from '../../state/constants'

const actionHandlers = {
  [t.REQUEST_LOG_SUCCESS]: (state, { payload }) => {
    const type = payload.type
    const currentQueue = state.get('queue', {})
    const taskID = payload.data.task.id

    if (currentQueue[taskID] && type !== c.REQUEST_TYPE_REPORT_TASK_DEX) {
      currentQueue[taskID].push(payload)
    } else currentQueue[taskID] = [payload]

    return state.set('queue', currentQueue)
  },
  [t.SYNCING_AN_ACTION_SUCCESS]: (state, { payload }) => {
    const taskId = payload.data.task.id
    const currentQueue = state.get('queue', {})

    const taskActionQueue = currentQueue[taskId].filter(a => a !== payload)

    if (taskActionQueue.length) currentQueue[taskId] = taskActionQueue
    else delete currentQueue[taskId]

    return state.set('queue', currentQueue)
  },
  [t.REMOVE_A_JOB_QUEUE]: (state, { payload: { jobId } }) => {
    const currentQueue = state.get('queue', {})
    delete currentQueue[jobId]
    return state.set('queue', currentQueue)
  },
  [t.SYNCING_AN_ACTION_FAILED]: (state, { payload: { data } }) => {
    const currentQueue = state.get('queue', {})
    if (data && data.task && data.task.id) delete currentQueue[data.task.id]
    return state.set('queue', currentQueue)
  },
  [t.PHOTO_CAPTURED]: (state, { payload }) =>
    state.set('photoCaptured', payload),
  [t.SET_CURRENT_CONDITION]: (state, { payload }) =>
    state.set('currentCondition', payload),
  [t.SYNCING_DEAMON_START]: state => state.set('synDeamonRunning', true),
  [t.SYNCING_DEAMON_FAIL]: state => state.set('synDeamonRunning', false),
  [t.SYNCING_DEAMON_STOP]: state => state.set('synDeamonRunning', false),
  [t.UPDATE_RECIPIENT]: (state, { payload }) =>
    state.set('actualRecipient', payload)
}

export default handleActions(actionHandlers, fromJS({}))
