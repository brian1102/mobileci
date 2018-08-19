import { takeLatest, call, put, select } from 'redux-saga/effects'
import * as t from '../../../../state/actionsType'
import a from '../../../../state/actions'
import * as api from '../../../../api/index'
import * as s from '../../../../state/selectors'

export function* getOtpFlow() {
  try {
    const phoneNumber = yield select(s.getPhoneNumber)
    const result = yield call(api.getOtp, phoneNumber)
    yield put(a[t.GET_OTP_SUCCESS](result))
  } catch (error) {
    yield put(a[t.GET_OTP_FAILED](error.message))
  }
}

function* getOtp() {
  yield takeLatest(t.GET_OTP_REQUEST, getOtpFlow)
}

export default getOtp
