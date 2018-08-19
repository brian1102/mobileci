import { put, call, takeLatest, take } from 'redux-saga/effects'
import * as t from '../../../../state/actionsType'
import a from '../../../../state/actions'
import * as api from '../../../../api'

function* selectVehicleFlow({ payload: vehicleTypeId }) {
  try {
    const res = yield call(api.registerVehicleType, vehicleTypeId)
    yield put(a[t.GET_USERINFO_REQUEST](res))
    yield take([t.GET_USERINFO_SUCCESS, t.GET_USERINFO_FAILED])
    yield put(a[t.SELECT_VEHICLE_SUCCESS](res))
  } catch (error) {
    yield put(a[t.SELECT_VEHICLE_FAILED](error.message))
  }
}

function* selectVehicleSaga() {
  yield takeLatest(t.SELECT_VEHICLE, selectVehicleFlow)
}

export default selectVehicleSaga
