import { takeLatest, put, call } from 'redux-saga/effects'
import * as t from '../../../../state/actionsType'
import a from '../../../../state/actions'
import * as u from '../../../../utils'

export function* saveAccessTokenFlow({ payload }) {
  try {
    const accessToken = payload.access_token
    yield call(u.saveAccessToken, accessToken)
  } catch (error) {
    yield put(a[t.SAVE_ACCESS_TOKEN_FAILED](error))
  }
}

function* saveAccessToken() {
  yield takeLatest(t.LOGIN_SUCCESS, saveAccessTokenFlow)
}

export default saveAccessToken
