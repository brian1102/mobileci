import { put, call, takeLatest } from 'redux-saga/effects'
import * as t from '../../../../../state/actionsType'
import a from '../../../../../state/actions'
import * as api from '../../../../../api'

function* fetchTasksFlow() {
  try {
    const response = yield call(api.getDailyStatus)
    yield put(a[t.FETCH_DAILY_STATUS_SUCCESS](response.data))
  } catch (error) {
    yield put(a[t.FETCH_DAILY_STATUS_FAILED](error.message))
  }
}

function* fetchTasksSaga() {
  yield takeLatest(t.FETCH_DAILY_STATUS, fetchTasksFlow)
}

export default fetchTasksSaga
