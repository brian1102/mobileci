import { takeEvery, put, call } from 'redux-saga/effects'
import a from '../actions'
import * as t from '../../actionsType'
import * as api from '../../../api'
import { loadPODImage } from '../../../utils'

function* syncUploadProofOfDeliveryFlow({ payload }) {
  try {
    const task = payload.data.task
    const condition = payload.data.condition
    const completedAt = payload.completedAt

    const image = yield call(loadPODImage, { task, condition })
    const response = yield call(api.uploadPOD, {
      task,
      condition,
      image,
      completedAt,
      meta: 'photo as proof of delivery'
    })
    yield put(a[t.SYNC_UPLOAD_IMAGE_AS_POD_SUCCESS]({ response, payload }))
  } catch (error) {
    yield put(a[t.SYNC_UPLOAD_IMAGE_AS_POD_FAILED](error.message))
  }
}

export default function* syncUploadProofOfDeliverySaga() {
  yield takeEvery(
    t.SYNC_UPLOAD_IMAGE_AS_POD_REQUEST,
    syncUploadProofOfDeliveryFlow
  )
}
