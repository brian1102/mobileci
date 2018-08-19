import { takeEvery, put, call } from 'redux-saga/effects'
import a from '../actions'
import * as t from '../../actionsType'
import * as api from '../../../api'
import { loadSignatureImage } from '../../../utils'

function* syncUploadSignatureFlow({ payload }) {
  try {
    const task = payload.data.task
    const condition = payload.data.condition
    const completedAt = payload.completedAt

    const image = yield call(loadSignatureImage, { task, condition })
    const response = yield call(api.uploadPOD, {
      task,
      condition,
      image,
      completedAt,
      meta: 'signature as proof of delivery'
    })
    yield put(
      a[t.SYNC_UPLOAD_IMAGE_AS_SIGNATURE_SUCCESS]({ payload, response })
    )
  } catch (error) {
    yield put(a[t.SYNC_UPLOAD_IMAGE_AS_SIGNATURE_FAILED](error.message))
  }
}

export default function* syncUploadSignatureSaga() {
  yield takeEvery(
    t.SYNC_UPLOAD_IMAGE_AS_SIGNATURE_REQUEST,
    syncUploadSignatureFlow
  )
}
