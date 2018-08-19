import { delay } from 'redux-saga'
import { call, takeLatest, put, select } from 'redux-saga/effects'
import LocationApi from '../../../api/location/LocationApi'
import { info } from '../../../utils/logger'
import * as t from '../../actionsType'
import { showDialog } from '../../dialog/actions'
import * as c from '../../constants'
import * as s from '../../selectors'
import a from '../../actions'

const createLocationDialog = () => ({
  color: '#429EF3',
  ui: c.DIALOG_UI_LOCATION
})

function* initLocationFlow() {
  const maxRetries = 10
  let success = false
  for (let i = 1; i <= maxRetries; i++) {
    try {
      const coords = yield call(LocationApi.getCurrentPosition)
      yield put(a[t.UPDATE_LOCATION_LOCALLY](coords))

      success = true
      break
    } catch (err) {
      const retrySleep = 1
      if (i < maxRetries) {
        yield delay(retrySleep * 2000)
        info(
          `Location fetch failed, retry in ${retrySleep} seconds (${i} / ${maxRetries}) with error: ${err}`
        )
      }
    }
  }

  if (!success) {
    info(`Failed to fetch location after ${maxRetries} tries.`)
    const dialog = yield select(s.getDialog)
    if (!dialog) yield put(showDialog(createLocationDialog()))
    else {
      yield call(delay, 10000)
      yield put(a[t.INIT_LOCATION]())
    }
  }
}

export default function* initLocationSaga() {
  yield takeLatest(t.INIT_LOCATION, initLocationFlow)
}
