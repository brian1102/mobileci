import fetchTaskSaga from './fetchTasks.saga'
import taskComplete from './taskComplete.saga'
import taskReport from './taskReport.saga'

export default [fetchTaskSaga, taskComplete, taskReport]
