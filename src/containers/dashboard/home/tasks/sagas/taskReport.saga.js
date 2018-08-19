import { put, takeLatest, select, take, call } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import * as t from '../../../../../state/actionsType'
import * as s from '../../../../../state/selectors'
import a from '../../../../../state/actions'
import * as c from '../../../../../state/constants'
import { convertTaskOnCompleteJobFlow } from '../../../../../utils/task.util'

function* backToHome() {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { routeName } = yield select(s.getCurrentRoute)
    if (routeName === 'HomeScreen') {
      yield put(a[t.FETCH_TASKS_REQUEST]({ reload: true }))
      break
    }
    yield put(a[t.BACK]())
    yield take(t.COMPLETE_TRANSITION)
  }
}

function* reporTaskFlow({ payload }) {
  try {
    const currentTask = yield select(s.getCurrentTask)
    yield put(
      a[t.REQUEST_LOG_REQUEST]({
        type: c.REQUEST_TYPE_REPORT_TASK_DEX,
        data: {
          task: convertTaskOnCompleteJobFlow(currentTask),
          reason: payload
        }
      })
    )
    yield take(t.REQUEST_LOG_SUCCESS)
    yield put(a[t.REPORT_TASK_SUCCESS](currentTask))
    yield put(a[t.HIDE_DIALOG]())
    yield call(delay, 500)
    yield backToHome()
  } catch (error) {
    yield put(a[t.REPORT_TASK_FAILED](error.message))
  }
}

export default function* reporTaskSaga() {
  yield takeLatest(t.REPORT_TASK_REQUEST, reporTaskFlow)
}
