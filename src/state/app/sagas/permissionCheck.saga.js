import { call, put, takeLatest } from 'redux-saga/effects'
import { Platform } from 'react-native'
import Permissions from 'react-native-permissions'
import GlobalObject from '../../../utils/globalObj'
import { openAppDetailSetting } from '../../../utils/openSettings/openSettings.android'
import { showDialog, hideDialog } from '../../../state/dialog/actions'
import store from '../../getStore'
import tr from '../../../i18n/i18n'
import requestLocation from '../../../permissions/requestLocation'
import requestStorage from '../../../permissions/requestStorage'
import FCMApi from '../../../api/push/FCMApi'
import requestCamera from '../../../permissions/requestCamera'
import a from '../../../state/actions'
import * as t from '../../../state/actionsType'
import { info } from '../../../utils/logger'

const stopDialog = description => ({
  title: tr('permission_missing'),
  description,
  color: '#429EF3',
  options: [
    {
      title: tr('ignore'),
      onPress: () => {
        store.dispatch(a[t.PERMISSION_CHECK_SUCCESS]('ignored notification'))
        store.dispatch(hideDialog())
      }
    },
    {
      title: tr('alert_button_ok'),
      onPress: () => {
        GlobalObject.markAsJustLeaveTheAppByGotoSetting(true)
        return Platform.OS === 'android'
          ? openAppDetailSetting()
          : Permissions.openSettings()
      }
    }
  ]
})

function* doOnFailed() {
  yield put(
    showDialog(
      stopDialog(
        tr(
          'permission_missing_description',
          tr('permission_missing_description')
        )
      )
    )
  )
}

function* checkPermissionFlow() {
  try {
    const isLocationAccessGranted = yield call(requestLocation)
    if (isLocationAccessGranted) {
      yield put(a[t.INIT_LOCATION]())
    }

    const requestStorageResult = yield call(requestStorage)
    const requestCameraResult = yield call(requestCamera)

    let fcmPermissionGranted = true
    if (Platform.OS === 'ios') {
      try {
        yield call(FCMApi.requestPermission)
        fcmPermissionGranted =
          (yield call(Permissions.check, 'notification')) === 'authorized'
      } catch (error) {
        info('Notification permission not granted')
        fcmPermissionGranted = false
      }
    }

    if (
      requestStorageResult &&
      isLocationAccessGranted &&
      requestCameraResult &&
      fcmPermissionGranted
    ) {
      yield put(a[t.PERMISSION_CHECK_SUCCESS]())
    } else {
      throw new Error()
    }
  } catch (error) {
    yield doOnFailed()
  }
}

export default function* permissionCheckSaga() {
  yield takeLatest(t.PERMISSION_CHECK_REQUEST, checkPermissionFlow)
}
