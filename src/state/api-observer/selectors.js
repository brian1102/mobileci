const defaultVal = {
  isWorking: false,
  isFailed: false,
  error: null,
  isCalled: false
}

export const getFetchTasksStatus = state =>
  state.apiObserver.get('fetchTasks', defaultVal)

export const getFetchTasksDirectionStatus = state =>
  state.apiObserver.get('fetchTasksDirection', defaultVal)

export const getStartTaskStatus = state =>
  state.apiObserver.get('startTaskStatus', defaultVal)

export const getSaveImageStatus = state =>
  state.apiObserver.get('savingImageStatus', defaultVal)

export const getFetchConversationStatus = state =>
  state.apiObserver.get('fetchConversation', defaultVal)
