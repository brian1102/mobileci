import { takeEvery, put, take, select } from 'redux-saga/effects'
import globalObject from '../../../utils/globalObj'
import * as t from '../../actionsType'
import * as c from '../../constants'
import * as s from '../../selectors'
import a from '../../actions'
import FCMApi from '../../../api/push/FCMApi'
import { info } from '../../../utils/logger'

// do some specific action here and wait for it to be done
function* handleNotificationFlow({ payload }) {
  try {
    const eventType = payload.event_type
    // if the payload doesnt have event type, mean that it's an applogiz message
    if (!eventType) {
      yield put(a[t.HANDLE_NEW_CHAT_COMMING_REQUEST](payload))
      FCMApi.notifiProcessingAnItemDone()
      return
    }

    const isOpenFromTray = payload.opened_from_tray
    // we handle opening app from notification tray, app was killed before.
    // for case app was not killed before, we handle it in onAppGotoForeground flow
    if (isOpenFromTray === 1) {
      yield take([t.FETCH_TASKS_SUCCESS, t.FETCH_TASKS_FAILED])

      const incomingTaskgroup = yield select(s.getIncomingTaskGroups)
      const shouldShowPopup = incomingTaskgroup.length > 0
      if (shouldShowPopup) yield put(a[t.SHOW_INCOMING_TASKGROUPS_POPUP]())

      FCMApi.notifiProcessingAnItemDone()
      return
    }
    switch (eventType) {
      case c.PUSH_EVENT_TASKGROUP_ASSIGNED:
      case c.PUSH_EVENT_TASKGROUP_AVAILABLE:
      case c.PUSH_EVENT_TASKGROUP_REASSINED:
      case c.PUSH_EVENT_TASKGROUP_UNASSIGNED:
      case c.PUSH_EVENT_BROADCAST_ACCEPTED:
      case c.PUSH_EVENT_BROADCAST_TIMEOUT:
        yield put(a[t.FECTH_INCOMING_TASKGROUPS]())
        yield take(
          t.FECTH_INCOMING_TASKGROUPS_SUCCESS,
          t.FECTH_INCOMING_TASKGROUPS_FAILED
        )
        if (
          eventType === c.PUSH_EVENT_TASKGROUP_UNASSIGNED ||
          eventType === c.PUSH_EVENT_BROADCAST_TIMEOUT ||
          eventType === c.PUSH_EVENT_BROADCAST_ACCEPTED
        ) {
          yield put(a[t.HIDE_INCOMING_TASKGROUPS_POPUP]())
        } else {
          const incomingTaskgroup = yield select(s.getIncomingTaskGroups)
          const shouldShowPopup = incomingTaskgroup.length > 0
          if (shouldShowPopup) yield put(a[t.SHOW_INCOMING_TASKGROUPS_POPUP]())
        }
        break
      case c.PUSH_EVENT_TASKGROUP_REJECTED:
        if (!globalObject.hasJustCalledRejectApi()) {
          info('auto loading rely on push notification')
          yield put(a[t.HIDE_INCOMING_TASKGROUPS_POPUP]())
          yield put(a[t.FECTH_INCOMING_TASKGROUPS]())
        } else {
          info('auto loading for reject event cancled due to reloaded manually')
        }
        break
      case c.PUSH_EVENT_TASKGROUP_ACCEPTED:
        if (!globalObject.hasJustCalledAcceptApi()) {
          info('auto loading rely on push notification')
          yield put(a[t.HIDE_INCOMING_TASKGROUPS_POPUP]())

          yield put(a[t.FETCH_TASKS_REQUEST]({ reload: true }))
          yield take(t.FETCH_TASKS_SUCCESS, t.FETCH_TASKS_FAILED)
          yield put(a[t.FECTH_INCOMING_TASKGROUPS]())
        } else {
          info(
            'auto loading for accepted event cancled due to reloaded manually'
          )
        }
        break
      case c.PUSH_EVENT_PICKUP_COMPLETE:
      case c.PUSH_EVENT_DROPOFF_COMPLETE:
      case c.PUSH_EVENT_WORKER_MARK_AS_FAILED:
        if (
          !globalObject.hasJustCalledCompleteApi() ||
          !globalObject.hasJustCalledReportApi()
        ) {
          info('auto loading rely on push notification')
          yield put(a[t.FETCH_TASKS_REQUEST]({ reload: true }))
          yield take(t.FETCH_TASKS_SUCCESS, t.FETCH_TASKS_FAILED)
          yield put(a[t.FETCH_DAILY_STATUS]())
          yield take(t.FETCH_DAILY_STATUS_SUCCESS, t.FETCH_DAILY_STATUS_FAILED)
        } else {
          info(
            'auto loading for complete task event cancled due to reloaded manually'
          )
        }
        break

      default:
        break
    }
  } catch (error) {
    yield put(a[t.HANDLE_SINGLE_FCM_EVENT_FAILED](error.messasge))
  }
  FCMApi.notifiProcessingAnItemDone()
}

function* handleNotification() {
  yield takeEvery(t.HANDLE_SINGLE_FCM_EVENT, handleNotificationFlow)
}

export default handleNotification
