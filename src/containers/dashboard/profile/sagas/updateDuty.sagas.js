import { Alert } from 'react-native'
import { put, call, takeLatest, select, take } from 'redux-saga/effects'
import * as t from '../../../../state/actionsType'
import * as s from '../../../../state/selectors'
import a from '../../../../state/actions'
import * as api from '../../../../api'

function* updateDuty(action) {
  try {
    const { status, origin } = action.payload

    const isForceSelectionEnabled = yield select(s.isForceSelectionEnable)
    if (
      origin === 'manually-from-profile-screen' &&
      isForceSelectionEnabled &&
      status !== 'off_duty'
    ) {
      yield put(a[t.FORCE_VEHICLE_SELECT]('from_profile'))
      yield take(t.FORCE_VEHICLE_SELECT_SUCCESS)
    }
    const res = yield call(api.changeStatus, status)
    if (res && res.data) {
      yield put(a[t.UPDATE_DUTY_STATUS_SUCCESS](res.data.status))
    }
  } catch (error) {
    Alert.alert(error.message)
    yield put(a[t.UPDATE_DUTY_STATUS_FAILED](error.message))
  }
}

function* updateDutySaga() {
  yield takeLatest(t.UPDATE_DUTY_STATUS, updateDuty)
}

export default updateDutySaga
