import { createSelector } from 'reselect'

const getCompleteJobFlowData = state => state.completeJobFlow

export const getJobQueue = createSelector(
  [getCompleteJobFlowData],
  completeJobFlow => completeJobFlow.get('queue', {})
)

export const getCurrentCondition = createSelector(
  [getCompleteJobFlowData],
  completeJobFlow => completeJobFlow.get('currentCondition', null)
)

export const getProcessingConditions = createSelector(
  [getCompleteJobFlowData],
  completeJobFlow => completeJobFlow.get('processingConditions', [])
)

export const getIsPhotoCaptured = state => {
  return state.completeJobFlow.get('photoCaptured', false)
}

export const getIsDaemonRunning = state => {
  return state.completeJobFlow.get('synDeamonRunning', false)
}

export const getFailedCount = createSelector(
  [getCompleteJobFlowData],
  completeJobFlow => completeJobFlow.get('failCount', {})
)

export const getActualRecipient = createSelector(
  [getCompleteJobFlowData],
  completeJobFlow => completeJobFlow.get('actualRecipient', null)
)
