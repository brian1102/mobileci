import { put, takeLatest, call } from 'redux-saga/effects'
import HeaderManager from '../../../api/HeaderManager'
import * as t from '../../actionsType'
import a from '../../actions'
import * as u from '../../../utils'

function* checkUserLoggedFlow() {
  try {
    const accessToken = yield call(u.loadAccessToken)

    if (accessToken) {
      HeaderManager.setHeader('accessToken', accessToken)
      yield put(a[t.CHECK_IF_USER_LOGGED_SUCCESS](true))
    } else {
      yield put(a[t.NAVIGATE]('Login'))
      yield put(a[t.CHECK_IF_USER_LOGGED_SUCCESS](false))
    }
  } catch (error) {
    yield put(a[t.CHECK_IF_USER_LOGGED_FAILED]())
  }
}

export default function* checkUserLogged() {
  yield takeLatest(t.CHECK_IF_USER_LOGGED_REQUEST, checkUserLoggedFlow)
}
