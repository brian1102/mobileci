import { put, takeLatest, take, select } from 'redux-saga/effects'
import CodePush from 'react-native-code-push'
import * as t from '../../actionsType'
import a from '../../actions'
import * as s from '../../selectors'
import { info } from '../../../utils/logger'
import Global from '../../../utils/globalObj'

function* appGotoForegroundFlow() {
  try {
    if (Global.hasJustLeaveTheAppByGotoSetting()) {
      CodePush.restartApp()
      return
    }

    const incomingTaskgroupVisibleAlready = yield select(s.getMobileVisible)
    if (incomingTaskgroupVisibleAlready) return
    yield put(a[t.FECTH_INCOMING_TASKGROUPS]())
    yield take([
      t.FECTH_INCOMING_TASKGROUPS_SUCCESS,
      t.FETCH_CONVERSATION_FAILED
    ])

    const incomingTaskgroup = yield select(s.getIncomingTaskGroups)

    const shouldShowPopup = incomingTaskgroup.length > 0
    if (shouldShowPopup) yield put(a[t.SHOW_INCOMING_TASKGROUPS_POPUP]())
  } catch (error) {
    info(error)
  }
}

export default function* appGotoForeground() {
  yield takeLatest(t.ON_APP_GO_TO_FOREGROUND, appGotoForegroundFlow)
}
