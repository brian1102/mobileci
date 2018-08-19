import { put, takeLatest, select, call } from 'redux-saga/effects'
import { Alert } from 'react-native'
import { rejectTaskGroup } from '../../../../../../../api'
import a from '../../../../../../../state/actions'
import globalObject from '../../../../../../../utils/globalObj'
import * as t from '../../../../../../../state/actionsType'
import * as s from '../../../../../../../state/selectors'

let apiCallSuccess = false

function* manualRefresh() {
  yield put(a[t.HIDE_INCOMING_TASKGROUPS_POPUP]())
  yield put(a[t.FECTH_INCOMING_TASKGROUPS]())
}

function* rejectTaskGroupFlow() {
  try {
    apiCallSuccess = false
    const taskgroup = yield select(s.getCurrentTaskGroup)
    const res = yield call(rejectTaskGroup, taskgroup.id)
    globalObject.setLastCallRejectApiTime()
    apiCallSuccess = true
    yield put(a[t.REJECT_TASKGROUPS_SUCCESS](res))
    yield manualRefresh()
  } catch (error) {
    if (apiCallSuccess) {
      yield manualRefresh()
      return
    }
    Alert.alert('Reject task failed', error.message)
    yield put(a[t.REJECT_TASKGROUPS_FAILED](error.message))
  }
}

function* rejectTaskGroupSaga() {
  yield takeLatest(t.REJECT_TASKGROUPS, rejectTaskGroupFlow)
}

export default rejectTaskGroupSaga
