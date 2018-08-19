import { put, takeLatest, select, take } from 'redux-saga/effects'
import * as t from '../../../../../state/actionsType'
import * as s from '../../../../../state/selectors'
import a from '../../../../../state/actions'
import * as c from '../../../../../state/constants'
import { convertTaskOnCompleteJobFlow } from '../../../../../utils/task.util'

function* backToHome(currentTask) {
  // eslint-disable-next-line
  while (true) {
    const { routeName } = yield select(s.getCurrentRoute)
    if (routeName === 'HomeScreen') {
      yield put(a[t.COMPLETE_TASK_SUCCESS](currentTask))
      break
    }
    yield put(a[t.BACK]())
    yield take(t.COMPLETE_TRANSITION)
  }
}

function* completeTaskFlow() {
  try {
    yield put(a[t.CHECKING_CONDITIONS_REQUEST]())
    yield take(t.CHECKING_CONDITIONS_SUCCESS)
    const currentTask = yield select(s.getCurrentTask)
    yield put(
      a[t.REQUEST_LOG_REQUEST]({
        type: c.REQUEST_TYPE_COMPLETE_TASK,
        data: {
          task: convertTaskOnCompleteJobFlow(currentTask)
        }
      })
    )
    yield take(t.REQUEST_LOG_SUCCESS)
    yield backToHome(currentTask)
  } catch (error) {
    yield put(a[t.COMPLETE_TASK_FAILED](error.message))
  }
}

export default function* completeTaskSaga() {
  yield takeLatest(t.COMPLETE_TASK_REQUEST, completeTaskFlow)
}
