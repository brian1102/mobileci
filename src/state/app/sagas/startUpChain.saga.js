import { AsyncStorage } from 'react-native'
import { put, take, takeLatest, select, call } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import globalObject from '../../../utils/globalObj'
import tr from '../../../i18n/i18n'
import * as t from '../../actionsType'
import * as s from '../../selectors'
import Config, { overrideEndpoint } from '../../../config/index'
import a from '../../actions'
import {
  getCustomEndpoint,
  getCustomChatENV,
  getCustomCompanySlug,
  getCustomTheme,
  getCustomShowServiceType
} from '../../../utils/developmentMode'
import themes from '../../../theme/theme'

// eslint-disable-next-line
function* gotoAnotherScreen() {
  yield call(delay, 1000)
  yield put(a[t.NAVIGATE]('Scanner'))
}

function* appStartUpFlow() {
  // setup environment
  const customEndpoint = yield call(getCustomEndpoint)
  const customChatEnv = yield call(getCustomChatENV)
  const slug = yield call(getCustomCompanySlug)
  const theme = yield call(getCustomTheme)
  const shouldShowSeriveType = yield call(getCustomShowServiceType)

  overrideEndpoint(
    customEndpoint,
    customChatEnv,
    theme,
    slug,
    shouldShowSeriveType
  )
  if (themes[theme]) themes[theme].apply()

  // set language
  const selectedLang = yield call(AsyncStorage.getItem, 'language')
  const lang = selectedLang || Config().DEFAULT_LANG
  tr.setLanguage(lang)
  globalObject.updateMomentLanguage(lang)

  const isNetworkConnected = yield select(s.isNetworkConnected)

  // check and ask permission
  yield put(a[t.PERMISSION_CHECK_REQUEST]())
  yield take(t.PERMISSION_CHECK_SUCCESS)

  // check user logged
  yield put(a[t.CHECK_IF_USER_LOGGED_REQUEST]())
  const loggedResult = yield take([
    t.CHECK_IF_USER_LOGGED_SUCCESS,
    t.CHECK_IF_USER_LOGGED_FAILED
  ])
  const logged =
    loggedResult.type === t.CHECK_IF_USER_LOGGED_SUCCESS && loggedResult.payload
  if (logged) {
    // only do this step if network is online
    if (isNetworkConnected) {
      yield put(a[t.DO_ON_LOGGED_REQUEST]())
      yield take(t.DO_ON_LOGGED_SUCCESS)

      // check if the binary version still supported
      yield put(a[t.CHECK_BINARY_VERSION_REQUEST]())
      yield take(t.CHECK_BINARY_VERSION_SUCCESS)
    }
  } else {
    yield take(t.LOGIN_SUCCESS)
  }

  yield gotoDashboard()
  // debug purpose only
  // yield gotoAnotherScreen()
}

function* gotoDashboard() {
  yield put(
    a[t.RESET]({
      actions: [a[t.NAVIGATE]('Home')]
    })
  )
}

function* appStartUp() {
  yield takeLatest(t.STARTUP, appStartUpFlow)
}

export default appStartUp
