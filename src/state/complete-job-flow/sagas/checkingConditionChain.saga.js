import { takeLatest, take, select, put } from 'redux-saga/effects'
import store from '../../getStore'
import tr from '../../../i18n/i18n'
import { hideDialog, showDialog } from '../../dialog/actions'
import { getCurrentRoute } from '../../navigation/selectors'
import * as s from '../../selectors'
import * as t from '../../actionsType'
import * as c from '../../constants'
import { images } from '../../../theme'
import a from '../../actions'
import { setCurrentCondition, photoCaptured } from './../actions'
import { cloneObject } from '../../../utils'

const extraActionDialog = (icon, title, description) => ({
  title,
  icon,
  description,
  color: '#429EF3',
  options: [
    {
      title: tr('alert_button_ok'),
      onPress: () => {
        store.dispatch(hideDialog())
      }
    }
  ]
})

function* checkingConditionChainFlow() {
  try {
    let task = yield select(s.getCurrentTask)

    // eslint-disable-next-line
    while (true) {
      if (!task.rules || !task.rules.length) {
        yield put(a[t.CHECKING_CONDITIONS_SUCCESS](task))
        return
      }
      const rules = cloneObject(task.rules)
      const condition = rules.shift()
      yield put(setCurrentCondition(condition))

      const { routeName } = yield select(getCurrentRoute)
      switch (condition.action) {
        case c.EXTRA_ACTION_UPLOAD_SIGNATURE:
          if (routeName !== 'SignaturePOD') {
            yield put(
              a[routeName === 'TaskDetail' ? t.NAVIGATE : t.REPLACE](
                'SignaturePOD'
              )
            )
            yield take(t.COMPLETE_TRANSITION)
          }
          yield put(
            showDialog(
              extraActionDialog(images.icons.signature, condition.title)
            )
          )
          break

        case c.EXTRA_ACTION_UPLOAD_PHOTO:
          yield put(photoCaptured(false))
          if (routeName !== 'PhotoPOD') {
            yield put(
              a[routeName === 'TaskDetail' ? t.NAVIGATE : t.REPLACE]('PhotoPOD')
            )
            yield take(t.COMPLETE_TRANSITION)
          }

          yield put(
            showDialog(extraActionDialog(images.icons.camera, condition.title))
          )
          break

        default:
          return
      }
      yield take(t.REQUEST_LOG_SUCCESS)
      // reducer will do removing rule since creating condition of rule are done
      yield put(a[t.PROCESS_CONDITION_OF_RULE_SUCCESS]({ task, condition }))
      // reget task rule
      task = yield select(s.getCurrentTask)
    }
  } catch (e) {
    yield put(a[t.CHECKING_CONDITIONS_FAILED](e.message))
  }
}

export default function* checkingConditionChainSaga() {
  yield takeLatest(t.CHECKING_CONDITIONS_REQUEST, checkingConditionChainFlow)
}
