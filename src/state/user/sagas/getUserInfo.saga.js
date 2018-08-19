import { put, takeLatest, call } from 'redux-saga/effects'
import a from '../../actions'
import * as t from '../../../state/actionsType'
import * as api from '../../../api'
import tr from '../../../i18n/i18n'
import { userDataParse } from './user.parse'

function* getUserInfoFlow() {
  try {
    const userInfoResponse = yield call(api.getUserInfo)
    userInfoResponse.data = userDataParse(userInfoResponse.data)
    userInfoResponse.data.vehicles.push({
      vehicleTypeId: -1,
      name: tr('cancel')
    })
    const currentVehicleType = userInfoResponse.data.vehicles.filter(
      v => v.vehicleTypeId === userInfoResponse.data.current_vehicle_type_id
    )
    userInfoResponse.data.currentVehicleType = currentVehicleType.length
      ? currentVehicleType[0]
      : null

    yield put(a[t.GET_USERINFO_SUCCESS](userInfoResponse.data))
  } catch (error) {
    yield put(a[t.GET_USERINFO_FAILED](error.message))
  }
}

export default function* getUserInfo() {
  yield takeLatest(t.GET_USERINFO_REQUEST, getUserInfoFlow)
}
