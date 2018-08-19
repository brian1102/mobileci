import { takeEvery, put, call, select } from 'redux-saga/effects'
import {
  removeSignatureImage,
  removePODImage,
} from '../../../utils/storage/storageEngine'
import * as t from '../actionsType'
import a from '../actions'
import { getJobQueue, getFailedCount } from '../selectors'

function* postAction() {
  yield put(a[t.REMOVE_IMAGE_FROM_DISK_SUCCESS]())
}

function* removeImageFromDisk({ type, payload: { data } }) {
  try {
    // force remove images of all legs request
    const { task } = data
    const jobId = task.id
    if (type === t.SYNCING_AN_ACTION_FAILED) {
      const failedCount = yield select(getFailedCount)

      if (parseInt(failedCount[jobId], 10) === -1) {
        const queue = yield select(getJobQueue)
        if (queue == null || Object.keys(queue).length === 0) return
        const jobQueue = queue[jobId]
        for (const key in jobQueue) {
          if (jobQueue.hasOwnProperty(key)) {
            const action = jobQueue[key]
            yield removeImage(action)
          }
        }
        yield put(a[t.REMOVE_A_JOB_QUEUE]({ jobId }))
      }
      return
    }
    yield removeImage(data)
  } catch (error) {
    yield put(a[t.REMOVE_IMAGE_FROM_DISK_FAILED](error.message))
  }
}

function* removeImage(data) {
  yield call(removeSignatureImage, data)
  yield call(removePODImage, data)
  yield postAction()
}

export default function* legStartSaga() {
  yield takeEvery(t.SYNCING_AN_ACTION_SUCCESS, removeImageFromDisk)
  yield takeEvery(t.SYNCING_AN_ACTION_FAILED, removeImageFromDisk)
}
