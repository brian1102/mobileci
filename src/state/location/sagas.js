import { channel } from 'redux-saga'
import { call, put, select, take, takeLatest } from 'redux-saga/effects'
import LocationApi from '../../api/location/LocationApi'
import { getLocation } from './selectors'
import { getIsDaemonRunning } from '../complete-job-flow/selectors'
import { DRIVER_STATUS_OFF_DUTY, DriverStatus } from '../user/constants'
import { info } from '../../utils/logger'
import * as t from '../actionsType'
import a from '../actions'
import Config from '../../config'

const updateLocationChannel = channel()

function* changeStatus(action) {
  const status = action.payload
  if (status === DriverStatus.indexOf(DRIVER_STATUS_OFF_DUTY)) {
    yield call(LocationApi.stopLocationWatch)
  } else {
    const location = yield select(getLocation)
    yield put(a[t.UPDATE_LOCATION](location))
    LocationApi.watchLocation(coords =>
      updateLocationChannel.put(a[t.UPDATE_LOCATION](coords))
    )
  }
}
// we have to make sure that it will alway call the update api atleast 1 time
let isCalledFirstTime = false
function* doUpdateLocation(action) {
  const isRunning = yield select(getIsDaemonRunning)
  if (isRunning) {
    info(
      'lastUpdatedSecondsAgo: ',
      'temporary paused due sync deamon is running'
    )
    yield take(t.SYNCING_DEAMON_STOP)
  }
  const coords = action.payload
  const newCoordinate = {
    latitude: coords.latitude,
    longitude: coords.longitude
  }
  const distance = LocationApi.getDistance(LocationApi.position, newCoordinate)
  info('[doUpdateLocation] Distance', `${distance}km`)
  if (
    distance === -1 ||
    distance > Config().DIFFERENT_UPDATE_USER_LOCATION ||
    isCalledFirstTime === false
  ) {
    info(
      '[doUpdateLocation] Distance is greater than 200m, will update current location now'
    )
    LocationApi.setCurrentLocation(coords)
    isCalledFirstTime = true
    yield call(LocationApi.updateLocation, newCoordinate)
  }
}

function* changeStatusSaga() {
  yield takeLatest(t.TRACKING_LOCATION_CHECK, changeStatus)
}

function* updateLocationSaga() {
  yield takeLatest(t.UPDATE_LOCATION, doUpdateLocation)
}

function* watchUpdateLocationChannel() {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const action = yield take(updateLocationChannel)
    yield put(action)
  }
}

export default [
  changeStatusSaga,
  updateLocationSaga,
  watchUpdateLocationChannel
]
