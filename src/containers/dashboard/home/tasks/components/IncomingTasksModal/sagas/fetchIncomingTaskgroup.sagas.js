import { put, takeLatest, call } from 'redux-saga/effects'
import { getUnacceptedTaskgroup } from '../../../../../../../api'
import { convertTaskgroup } from '../../../../../../../utils/task.util'
import * as t from '../../../../../../../state/actionsType'
import a from '../../../../../../../state/actions'

// TODO temporary fix
// sometime server return some taskgroups that doen't have any tasks, that weird :)
// we will circumvent it because we don't believe them anymore haha ^^

function* fetchTasksInfo() {
  try {
    const rawRes = yield call(getUnacceptedTaskgroup)
    yield put(a[t.FECTH_INCOMING_TASKGROUPS_SUCCESS](convertTaskgroup(rawRes.data.entries)))
  } catch (error) {
    yield put(a[t.FECTH_INCOMING_TASKGROUPS_FAILED](error.message))
  }
}

function* fetchTasksInfoSagas() {
  yield takeLatest(t.FECTH_INCOMING_TASKGROUPS, fetchTasksInfo)
}

export default fetchTasksInfoSagas
