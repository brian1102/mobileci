import { handleActions } from 'redux-actions'
import { fromJS } from 'immutable'
import * as t from '../../../../state/actionsType'
import * as s from '../../../../state/selectors'

const actionHandlers = {
  [t.FETCH_TASKS_SUCCESS]: (state, { payload }) => state.set('tasks', payload),
  [t.SET_CURRENT_TASK]: (state, { payload }) =>
    state.set('currentTask', payload.index),
  [t.START_TASK_SUCCESS]: state => {
    const tasks = s.getTask(state)
    const currentTask = s.getCurrentTaskIndex(state)
    tasks[currentTask].startedTime = new Date()

    return state.set('tasks', tasks)
  },
  [t.COMPLETE_TASK_SUCCESS]: state => {
    const tasks = s.getTask(state)
    const currentTask = s.getCurrentTaskIndex(state)
    tasks[currentTask].completedTime = new Date()

    return state.set('tasks', tasks)
  },
  [t.REPORT_TASK_SUCCESS]: state => {
    const tasks = s.getTask(state)
    const currentTask = s.getCurrentTaskIndex(state)
    tasks[currentTask].completedTime = new Date()

    return state.set('tasks', tasks)
  },
  [t.PROCESS_CONDITION_OF_RULE_SUCCESS]: state => {
    const tasks = s.getTask(state)
    const currentTask = s.getCurrentTaskIndex(state)
    tasks[currentTask].rules.shift()

    return state.set('tasks', tasks)
  }
}

export default handleActions(actionHandlers, fromJS({}))
