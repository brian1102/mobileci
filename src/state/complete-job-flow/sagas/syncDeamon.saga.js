import { Alert } from 'react-native'
import { put, select, takeLatest, take, call } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import * as t from '../../actionsType'
import * as s from '../../selectors'
import tr from '../../../i18n/i18n'
import a from '../../actions'
import {
  REQUEST_TYPE_COMPLETE_TASK,
  REQUEST_TYPE_UPLOAD_POD,
  REQUEST_TYPE_UPLOAD_SIGNATURE,
  REQUEST_TYPE_REPORT_TASK_DEX
} from '../constants'
import { getIsDaemonRunning, getJobQueue } from '../selectors'

let isDeamonRunning = false
let countActionCameWhenDeamonIsRunning = 0

let countFailedActions = 0

function getAction(act) {
  switch (act.type) {
    case REQUEST_TYPE_COMPLETE_TASK: {
      return {
        request: t.SYNC_COMPLETE_TASK_REQUEST,
        success: t.SYNC_COMPLETE_TASK_SUCCESS,
        failed: t.SYNC_COMPLETE_TASK_FAILED
      }
    }
    case REQUEST_TYPE_UPLOAD_POD: {
      return {
        request: t.SYNC_UPLOAD_IMAGE_AS_POD_REQUEST,
        success: t.SYNC_UPLOAD_IMAGE_AS_POD_SUCCESS,
        failed: t.SYNC_UPLOAD_IMAGE_AS_POD_FAILED
      }
    }
    case REQUEST_TYPE_UPLOAD_SIGNATURE: {
      return {
        request: t.SYNC_UPLOAD_IMAGE_AS_SIGNATURE_REQUEST,
        success: t.SYNC_UPLOAD_IMAGE_AS_SIGNATURE_SUCCESS,
        failed: t.SYNC_UPLOAD_IMAGE_AS_SIGNATURE_FAILED
      }
    }
    case REQUEST_TYPE_REPORT_TASK_DEX: {
      return {
        request: t.SYNC_REPORT_TASK_REQUEST,
        success: t.SYNC_REPORT_TASK_SUCCESS,
        failed: t.SYNC_REPORT_TASK_FAILED
      }
    }
    default:
      return null
  }
}

function* doOnFailedAnAction(act, message) {
  countFailedActions += 1
  Alert.alert(
    tr('syncing_failed_title', act.data.task.id),
    tr('syncing_failed_message', message)
  )
  yield put(a[t.SYNCING_AN_ACTION_FAILED](act))
}

function* syncDeamon(action) {
  try {
    const isHasNetwork = yield select(s.isNetworkConnected)
    if (!isHasNetwork) {
      return
    }

    // startup: circumvent deamon run at startup and wait for dashboard stuffs done
    if (action.type === t.NETWORK_CHANGE) {
      const isLogged = yield select(s.isLogged)
      if (!isLogged) {
        yield take(t.RESET)
        yield take(t.FETCH_TASKS_SUCCESS)
      } else {
        // when network is back, we will sync user info from remote api again
        yield put(a[t.DO_ON_LOGGED_REQUEST]())
        yield take(t.DO_ON_LOGGED_SUCCESS)
      }
    }

    const isRunning = yield select(getIsDaemonRunning)
    if (isRunning || isDeamonRunning) {
      countActionCameWhenDeamonIsRunning += 1
      return
    }

    const queue = yield select(getJobQueue)

    if (queue === null || Object.keys(queue).length === 0) return
    isDeamonRunning = true
    countFailedActions = 0
    yield put(a[t.SYNCING_DEAMON_START]())

    for (const key in queue) {
      if (queue.hasOwnProperty(key)) {
        const taskQueue = queue[key]
        // eslint-disable-next-line
        loopEachActionOfTask: for (const i in taskQueue) {
          if (taskQueue.hasOwnProperty(i)) {
            const act = taskQueue[i]
            const actions = getAction(act)

            if (actions) {
              yield put(a[actions.request](act))
              const res = yield take([actions.failed, actions.success])
              if (res.type === actions.success)
                yield put(a[t.SYNCING_AN_ACTION_SUCCESS](act))
              else {
                yield doOnFailedAnAction(act, res.payload)
                // if syncing one action of task queue failed,
                // stop working with the next queue's items of this task
                break loopEachActionOfTask // eslint-disable-line
              }
            } else {
              yield doOnFailedAnAction(act)
              break loopEachActionOfTask // eslint-disable-line
            }
          }
        }
      }
    }
    isDeamonRunning = false
    yield put(a[t.SYNCING_DEAMON_STOP]())

    if (countFailedActions > 0) {
      countFailedActions = 0
      yield call(delay, 1000)
      yield put(a[t.FETCH_TASKS_REQUEST]({ reload: true }))
      yield take([t.FETCH_TASKS_FAILED, t.FETCH_TASKS_SUCCESS])
    }

    if (countActionCameWhenDeamonIsRunning) {
      countActionCameWhenDeamonIsRunning = 0
      yield put(a[t.SYNCING_DEAMON_REQUEST]())
    }
  } catch (error) {
    isDeamonRunning = false
    yield put(a[t.SYNCING_DEAMON_FAIL](error.message))
  }
}

export default function* syncDeamonSaga() {
  yield takeLatest(t.NETWORK_CHANGE, syncDeamon)
  yield takeLatest(t.COMPLETE_TASK_SUCCESS, syncDeamon)
  yield takeLatest(t.REPORT_TASK_SUCCESS, syncDeamon)
  yield takeLatest(t.SYNCING_DEAMON_REQUEST, syncDeamon)
}
