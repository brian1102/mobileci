import { Platform, Linking } from 'react-native'
import { call, put, takeLatest, select } from 'redux-saga/effects'
import { showDialog } from '../../dialog/actions'
import AppApi from '../../../api/app/AppApi'
import { isNetworkConnected } from '../selectors'
import tr from '../../../i18n/i18n'
import { colors } from '../../../theme/index'
import * as t from '../../actionsType'
import a from '../../actions'
import * as c from '../../constants'

const openInStore = () => {
  if (Platform.OS === 'ios') {
    Linking.openURL(`https://itunes.apple.com/sg/app/drive-yojee/id1140359822`)
  } else {
    Linking.openURL(
      `https://play.google.com/store/apps/details?id=com.yojee.driverapp`
    )
  }
}

const extraActionDialog = description => ({
  ui: c.DIALOG_UI_COMMON,
  title: tr('notice'),
  icon: null,
  description,
  color: colors.brand,
  options: [
    {
      title: tr('alert_button_ok'),
      onPress: () => {
        openInStore()
      }
    }
  ]
})

function* checkFlow() {
  const isConnected = yield select(isNetworkConnected)
  if (!isConnected) {
    yield put(a[t.CHECK_BINARY_VERSION_SUCCESS]('No need upgrade'))
    return
  }
  try {
    const result = yield call(AppApi.checkBinaryVersion)
    let stop = false
    if (result.ok) {
      stop = result.data.need_upgrade
    }
    if (stop) {
      yield put(showDialog(extraActionDialog(tr('version_out_date'))))
      yield put(a[t.CHECK_BINARY_VERSION_FAILED](tr('version_out_date')))
    } else {
      yield put(a[t.CHECK_BINARY_VERSION_SUCCESS]('No need upgrade'))
    }
  } catch (error) {
    yield put(
      a[t.CHECK_BINARY_VERSION_SUCCESS]("Can not check, server doesn't work")
    )
  }
}
export default function* checkIfBinaryVersionStillSupport() {
  yield takeLatest(t.CHECK_BINARY_VERSION_REQUEST, checkFlow)
}
