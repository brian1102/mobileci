import { takeLatest, put, take, call } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import * as t from '../../../../state/actionsType'
import a from '../../../../state/actions'
import HeaderManager from '../../../../api/HeaderManager'

export function* getOtpFlow() {
  try {
    yield call(delay, 500)
    yield put(a[t.GET_OTP_REQUEST]())
    yield take(t.GET_OTP_SUCCESS)

    yield put(a[t.NAVIGATE]('VerifyOtp'))
    const verifyOtpResult = yield take(t.VERIFY_OTP_SUCCESS)
    const accessToken = verifyOtpResult.payload.access_token

    HeaderManager.setHeader('accessToken', accessToken)

    yield put(a[t.DO_ON_LOGGED_REQUEST]())
    yield take(t.DO_ON_LOGGED_SUCCESS)

    yield put(a[t.LOGIN_SUCCESS](verifyOtpResult.payload))
  } catch (error) {
    yield put(a[t.LOGIN_FAILED](error.message))
  }
}

function* getOtp() {
  yield takeLatest(t.LOGIN_REQUEST, getOtpFlow)
}

export default getOtp
