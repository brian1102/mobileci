import { takeEvery, put, call, take } from 'redux-saga/effects'
import globalObject from '../../../utils/globalObj'
import a from '../../../state/actions'
import * as t from '../../../state/actionsType'
import { completeTask } from '../../../api/task/task.api'

function* syncTaskComplete({ payload }) {
  try {
    const taskId = payload.data.task.id
    const completedAt = payload.completedAt
    const location = payload.location
    yield call(completeTask, {
      taskId,
      completedAt,
      location
    })
    yield put(a[t.SYNC_COMPLETE_TASK_SUCCESS](payload))
    globalObject.setLastCallCompleteApiTime()
    // manual loading
    yield put(a[t.FETCH_TASKS_REQUEST]({ reload: true }))
    yield take(t.FETCH_TASKS_SUCCESS, t.FETCH_TASKS_FAILED)
    yield put(a[t.FETCH_DAILY_STATUS]())
    yield take(t.FETCH_DAILY_STATUS_SUCCESS, t.FETCH_DAILY_STATUS_FAILED)
  } catch (error) {
    yield put(a[t.SYNC_COMPLETE_TASK_FAILED](error.message))
  }
}

export default function* legStartSaga() {
  yield takeEvery(t.SYNC_COMPLETE_TASK_REQUEST, syncTaskComplete)
}
