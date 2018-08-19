import { put, takeLatest, call, select, take } from 'redux-saga/effects'
import a from '../../actions'
import * as t from '../../actionsType'
import * as s from '../../selectors'
import * as api from '../../../api'

function* registerFlow(action) {
  try {
    const isLogged = yield select(s.isLogged)
    if (!isLogged) yield take(t.DO_ON_LOGGED_SUCCESS)
    const res = yield call(api.registerFcmDevice, action.payload)
    yield put(a[t.FCM_REGISTER_TOKEN_SUCCESS]({ response: res }))
  } catch (error) {
    yield put(a[t.FCM_REGISTER_TOKEN_FAILED](error.message))
  }
}

function* registerFCMToken() {
  yield takeLatest(t.FCM_RECEIVED_TOKEN, registerFlow)
}

export default registerFCMToken
