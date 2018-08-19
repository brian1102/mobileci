import { createSelector } from 'reselect'
import { defaultValOnSelector } from '../../../../../../utils'

const getIncomingTasksState = state => state.incomingTasks

export const getTaskGroupIds = createSelector(
  [getIncomingTasksState],
  taskGroupIds => taskGroupIds.get('taskGroupIds', [])
)
export const getIncomingTaskGroups = createSelector(
  [getIncomingTasksState],
  taskGroups => taskGroups.get('taskGroups', [])
)
export const getMobileVisible = createSelector(
  [getIncomingTasksState],
  modalVisible => modalVisible.get('modalVisible', false)
)
export const getFetchingIncomingTaskStatus = createSelector(
  [getIncomingTasksState],
  isFetching =>
    isFetching.get('fetchIncomingTaskGroupStatus', defaultValOnSelector)
)
export const getAcceptApiStatus = createSelector(
  [getIncomingTasksState],
  state => state.get('acceptApiStatus', defaultValOnSelector)
)
export const getRejectApiStatus = createSelector(
  [getIncomingTasksState],
  state => state.get('rejectApiStatus', defaultValOnSelector)
)
export const getCurrentTaskGroup = createSelector(
  [getIncomingTasksState],
  state => state.get('currentTaskGroup', null)
)
export const getTotalCountIncomingTaskGroups = createSelector(
  [getIncomingTasksState],
  state => state.get('total')
)
