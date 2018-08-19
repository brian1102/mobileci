import { takeLatest, call, put, select } from 'redux-saga/effects'
import * as t from '../../../../state/actionsType'
import a from '../../../../state/actions'
import * as api from '../../../../api/index'
import * as s from '../../../../state/selectors'
import { savePhoneNumber } from '../../../../utils'

export function* verifyOtpFlow() {
  try {
    const phoneNumber = yield select(s.getPhoneNumber)
    const code = yield select(s.getCode)
    const result = yield call(api.verifyOtp, phoneNumber, code)
    yield call(savePhoneNumber, phoneNumber)
    yield put(a[t.VERIFY_OTP_SUCCESS](result.data))
  } catch (error) {
    yield put(a[t.VERIFY_OTP_FAILED](error.message))
  }
}

function* verifyOtp() {
  yield takeLatest(t.VERIFY_OTP_REQUEST, verifyOtpFlow)
}

export default verifyOtp
