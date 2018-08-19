import { takeEvery, put, call, take } from 'redux-saga/effects'
import a from '../../actions'
import * as t from '../../actionsType'
import { reportTask } from '../../../api'
import globalObject from '../../../utils/globalObj'

function* syncReportTaskFlow({ payload }) {
  try {
    const task = payload.data.task
    const completedAt = payload.completedAt

    const params = {
      id: task.id,
      descriptions: payload.data.reason,
      completion_time: completedAt
    }
    yield call(reportTask, { id: task.id, params })
    yield put(a[t.SYNC_REPORT_TASK_SUCCESS](payload))
    globalObject.setLastCallReportApiTime()
    // manual loading
    yield put(a[t.FETCH_TASKS_REQUEST]({ reload: true }))
    yield take(t.FETCH_TASKS_SUCCESS, t.FETCH_TASKS_FAILED)
    yield put(a[t.FETCH_DAILY_STATUS]())
    yield take(t.FETCH_DAILY_STATUS_SUCCESS, t.FETCH_DAILY_STATUS_FAILED)
  } catch (error) {
    yield put(a[t.SYNC_REPORT_TASK_FAILED](error.message))
  }
}

export default function* syncReportTaskSaga() {
  yield takeEvery(t.SYNC_REPORT_TASK_REQUEST, syncReportTaskFlow)
}
