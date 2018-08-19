import { put, takeLatest, select, take, call } from 'redux-saga/effects'
import * as t from '../../../../state/actionsType'
import a from '../../../../state/actions'
import * as c from '../../../../state/constants'
import * as s from '../../../../state/selectors'
import { colors } from '../../../../theme/index'
import { showDialog, hideDialog } from '../../../../state/dialog/actions'
import {
  isVehicleSelectedOnStartup,
  markAsVehicleSelectedOnStartup
} from '../../../../utils'

export const extraActionDialog = () => ({
  ui: c.DIALOG_UI_VEHICLE_SELECTION,
  color: colors.brand
})

function* forceSelectionFlow({ payload: origin }) {
  try {
    const isForceSelectionEnabled = yield select(s.isForceSelectionEnable)
    const currentVehicleType = yield select(s.getCurrentVehicleType)
    const workerVehicleList = yield select(s.getVehicleList)
    const isVehicleSelectedBefore = yield call(isVehicleSelectedOnStartup)

    if (
      (isForceSelectionEnabled && !isVehicleSelectedBefore) ||
      !currentVehicleType ||
      origin === 'from_profile'
    ) {
      if (!workerVehicleList || !workerVehicleList.length) {
        yield put(a[t.FORCE_VEHICLE_SELECT_SUCCESS]())
        return
      }
      // if only options to choose, let's choose
      if (workerVehicleList.length === 2) {
        yield put(a[t.SELECT_VEHICLE](workerVehicleList[0].vehicleTypeId))
      } else {
        yield put(showDialog(extraActionDialog()))
      }

      yield take(t.SELECT_VEHICLE_SUCCESS)

      if (origin !== 'from_profile') {
        yield call(markAsVehicleSelectedOnStartup)
        const userInfo = yield select(s.getUserInfo)
        if (userInfo.status !== 'on_duty') {
          yield put(
            a[t.UPDATE_DUTY_STATUS]({
              status: 'on_duty',
              origin: 'automatic_on_start_up'
            })
          )
          yield take([
            t.UPDATE_DUTY_STATUS_SUCCESS,
            t.UPDATE_DUTY_STATUS_FAILED
          ])
        }
      }
      yield put(hideDialog())
    }
    yield put(a[t.FORCE_VEHICLE_SELECT_SUCCESS]())
  } catch (error) {
    yield put(a[t.FORCE_VEHICLE_SELECT_FAILED](error.message))
  }
}

function* forceSelectionSaga() {
  yield takeLatest(t.FORCE_VEHICLE_SELECT, forceSelectionFlow)
}

export default forceSelectionSaga
