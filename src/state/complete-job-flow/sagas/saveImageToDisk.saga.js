import { takeEvery, put, call, select } from 'redux-saga/effects'
import {
  saveSignatureImage,
  saveSignatureRecord,
  savePODImage,
  savePODRecord
} from '../../../utils/storage/storageEngine'
import {
  saveImageToDiskFailed,
  saveImageToDiskSuccess,
  logRequest
} from '../actions'
import { SAVE_IMAGE_TO_DISK_REQUEST } from './../actionsType'
import * as c from '../../constants'
import * as s from '../../selectors'
import { log } from '../../../utils/logger'
import { convertTaskOnCompleteJobFlow } from '../../../utils/task.util'

function* saveImageToDisk({ payload: { signature, pod } }) {
  try {
    let type = null
    const task = yield select(s.getCurrentTask)
    const filteredTask = convertTaskOnCompleteJobFlow(task)
    const condition = yield select(s.getCurrentCondition)
    const detail = { task: filteredTask, condition }

    if (signature) {
      const signaturePath = yield call(saveSignatureImage, {
        ...detail,
        signature
      })
      log('[saveImageToDisk.saga.js] Save signature image to', signaturePath)
      yield call(saveSignatureRecord, { ...detail, signaturePath })
      type = c.REQUEST_TYPE_UPLOAD_SIGNATURE
    } else if (pod) {
      const podPath = yield call(savePODImage, { ...detail, pod })
      log('[saveImageToDisk.saga.js] Save pod image to', podPath)
      yield call(savePODRecord, { ...detail, podPath })
      type = c.REQUEST_TYPE_UPLOAD_POD
    }
    yield put(saveImageToDiskSuccess())
    yield put(
      logRequest({
        type,
        data: {
          task: filteredTask,
          condition
        }
      })
    )
  } catch (error) {
    yield put(saveImageToDiskFailed(error.message))
  }
}

export default function* legStartSaga() {
  yield takeEvery(SAVE_IMAGE_TO_DISK_REQUEST, saveImageToDisk)
}
