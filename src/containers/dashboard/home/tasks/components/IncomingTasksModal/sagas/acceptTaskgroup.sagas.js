import { put, takeLatest, select, call, take } from 'redux-saga/effects'
import { Alert } from 'react-native'
import { acceptTaskGroup } from '../../../../../../../api'
import globalObject from '../../../../../../../utils/globalObj'
import a from '../../../../../../../state/actions'
import * as t from '../../../../../../../state/actionsType'
import * as s from '../../../../../../../state/selectors'

let apiCallSuccess = false

function* manualRefresh() {
  // manual loading

  yield put(a[t.HIDE_INCOMING_TASKGROUPS_POPUP]())
  yield put(a[t.FECTH_INCOMING_TASKGROUPS]())
  yield take([
    t.FECTH_INCOMING_TASKGROUPS_FAILED,
    t.FECTH_INCOMING_TASKGROUPS_SUCCESS
  ])
  yield put(a[t.FETCH_TASKS_REQUEST]({ reload: true }))
  yield take([t.FETCH_TASKS_FAILED, t.FETCH_TASKS_SUCCESS])
  yield put(a[t.FETCH_DAILY_STATUS]())
}

function* acceptTaskGroupFlow() {
  try {
    apiCallSuccess = false
    const taskgroup = yield select(s.getCurrentTaskGroup)
    const res = yield call(acceptTaskGroup, taskgroup.id)
    yield put(a[t.ACCEPT_TASKGROUPS_SUCCESS](res))
    globalObject.setLastCallAcceptApiTime()
    yield manualRefresh()
  } catch (error) {
    if (apiCallSuccess) {
      yield manualRefresh()
      return
    }
    Alert.alert('Accept task failed', error.message)
    yield put(a[t.ACCEPT_TASKGROUPS_FAILED](error.message))
  }
}

function* acceptTaskGroupSaga() {
  yield takeLatest(t.ACCEPT_TASKGROUPS, acceptTaskGroupFlow)
}

export default acceptTaskGroupSaga
