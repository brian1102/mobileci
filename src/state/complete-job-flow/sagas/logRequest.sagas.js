import { takeEvery, put, select } from 'redux-saga/effects'
import a from '../actions'
import * as s from '../../selectors'
import * as t from '../../actionsType'
import println from '../../../utils/FileLoggerAndroid'
import { convertToUtc } from '../../../utils'

function* logRequest({ payload: { type, data } }) {
  try {
    const request = {
      type,
      data
    }

    const jobQueue = yield select(s.getJobQueue)
    const { [Object.keys(jobQueue).pop()]: lastItem } = jobQueue
    // duplicated request
    if (lastItem === request) {
      println('duplicated request circumvented')
      return
    }

    const completedAt = convertToUtc().format()
    request.completedAt = completedAt

    const location = yield select(s.getLocation)
    request.location = { lat: location.latitude, lng: location.longitude }
    yield put(a[t.REQUEST_LOG_SUCCESS](request))
  } catch (error) {
    println(`logRequestFailed ${JSON.stringify(error)}`)
    yield put(a[t.REQUEST_LOG_FAILED]())
  }
}

export default function* legStartSaga() {
  yield takeEvery(t.REQUEST_LOG_REQUEST, logRequest)
}
