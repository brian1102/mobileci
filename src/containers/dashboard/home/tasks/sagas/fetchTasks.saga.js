import { call, put, takeLatest, select } from 'redux-saga/effects'
import * as t from '../../../../../state/actionsType'
import * as s from '../../../../../state/selectors'
import a from '../../../../../state/actions'
import * as c from '../../../../../state/constants'
import * as api from '../../../../../api/index'
import { convertTasksData } from '../../../../../utils/task.util'

function* fetchTasksFlow({ payload }) {
  const reload = payload.reload
  const done = payload.done
  const listParams = payload.listParams
  // smart list params
  const nextPage = listParams ? listParams.page : 1
  const pageSize = listParams ? listParams.pageSize : c.TASK_PAGE_SIZE
  const refresh = listParams ? listParams.refresh : false

  const isConnected = yield select(s.isNetworkConnected)
  const queue = yield select(s.getJobQueue)
  let oldTasks = yield select(s.getTask)
  if (!oldTasks || reload || refresh) oldTasks = []
  // make sure that it doesn't reload the data when device is offline or there are some job need to be sync in queue
  if (isConnected && (queue == null || Object.keys(queue).length === 0))
    try {
      const response = yield call(api.getTasks, nextPage, pageSize)
      const companyRules = yield select(s.getCompanyRules)
      /**
       * TODO: Note for Brian
       * To make smartlist works, everytime we need to past new data array.
       * SmartList will compare length between old data array and new data array
       * to see it has more data or note. If they are equal, the loading more
       * function will be stopped. And only reset when we pulled to refresh
       */
      const newTasks = [...oldTasks, ...convertTasksData(response.data, companyRules)]

      yield put(
        a[t.FETCH_TASKS_SUCCESS](newTasks)
      )
      if (done) done(newTasks.length)
    } catch (error) {
      yield put(a[t.FETCH_TASKS_FAILED](error.message))
      if (done) done(oldTasks.length)
    }
  else {
    const data = yield select(s.getTask)
    yield put(a[t.FETCH_TASKS_SUCCESS](data))
  }
}

export default function* fetchTasksSaga() {
  yield takeLatest(t.FETCH_TASKS_REQUEST, fetchTasksFlow)
}
