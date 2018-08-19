import { call, put, takeLatest, select } from 'redux-saga/effects'
import * as api from '../../../../api'
import * as t from '../actionTypes'
import * as c from '../constants'
import * as s from '../selectors'
import a from '../../../../state/actions'

function* getHistory({ payload }) {
  const done = payload.done
  const listParams = payload.listParams
  try {
    // smart list params
    const nextPage = listParams ? listParams.page : 1
    const pageSize = listParams ? listParams.pageSize : c.HISTORY_TASK_PAGE_SIZE
    const refresh = listParams ? listParams.refresh : false

    let oldTasks = yield select(s.getHistoryLast4Weeks)
    if (refresh) oldTasks = []

    const { data: last4weeks } = yield call(api.getHistory, c.HISTORY_LAST4WEEK, nextPage, pageSize)
    const newTasks = [...oldTasks, ...last4weeks]

    yield put(a[t.FETCH_HISTORY_LAST4WEEKS_SUCCESS](newTasks))

    if (done) done(newTasks.length)
  } catch (error) {
    yield put(a[t.FETCH_HISTORY_LAST4WEEKS_FAILED](error.message))
    if (done) done(0)
  }
}

export default function* getHistoryLast4WeeksSaga() {
  yield takeLatest(t.FETCH_HISTORY_LAST4WEEKS_REQUEST, getHistory)
}
