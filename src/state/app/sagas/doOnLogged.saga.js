import { put, takeLatest, take, select } from 'redux-saga/effects'
import { Alert } from 'react-native'
import a from '../../actions'
import * as t from '../../actionsType'
import * as s from '../../selectors'
import * as CrashApi from '../../../api/analytics/CrashApi'
import Config from '../../../config/index'

function* doOnLogged() {
  try {
    if (Config().THEME === 'yojee') {
      yield put(a[t.GET_YOJEECHILD_COMPANY_SLUG_REQUEST]())
      yield take(t.GET_YOJEECHILD_COMPANY_SLUG_SUCCESS)
    }

    yield put(a[t.GET_USERINFO_REQUEST]())
    const getUserInfo = yield take([
      t.GET_USERINFO_SUCCESS,
      t.GET_USERINFO_FAILED
    ])
    if (getUserInfo.type === t.GET_USERINFO_FAILED)
      throw new Error(getUserInfo.payload)

    // after logged in successfully, we can set user context for Sentry
    CrashApi.setUserContext(getUserInfo.payload)

    // start chat login but dont expect it success
    yield put(a[t.CHAT_LOGIN_REQUEST]())
    yield take([t.CHAT_LOGIN_SUCCESS, t.CHAT_LOGIN_FAILED])

    // fetch DEX reason list dont expect it success
    yield put(a[t.GET_COMPANY_CONFIGURATION_REQUEST]())
    yield take([
      t.GET_COMPANY_CONFIGURATION_SUCCESS,
      t.GET_COMPANY_CONFIGURATION_FAILED
    ])

    // force vehicle selection if the force selection was enabled
    yield put(a[t.FORCE_VEHICLE_SELECT]())
    yield take(t.FORCE_VEHICLE_SELECT_SUCCESS)

    yield put(a[t.FECTH_INCOMING_TASKGROUPS]())
    yield take([
      t.FECTH_INCOMING_TASKGROUPS_SUCCESS,
      t.FECTH_INCOMING_TASKGROUPS_FAILED
    ])

    yield put(a[t.FETCH_TASKS_REQUEST]({ reload: true }))
    yield take([t.FETCH_TASKS_SUCCESS, t.FETCH_TASKS_FAILED])

    yield put(a[t.FETCH_CONVERSATION_REQUEST]())
    yield take([t.FETCH_CONVERSATION_SUCCESS, t.FETCH_CONVERSATION_FAILED])

    const { status } = yield select(s.getUserInfo)
    yield put(a[t.TRACKING_LOCATION_CHECK](status))

    yield put(a[t.DO_ON_LOGGED_SUCCESS]())
  } catch (error) {
    Alert.alert('Login failed', error.message)
    yield put(a[t.DO_ON_LOGGED_FAILED](error.message))
    yield put(a[t.NAVIGATE]('Login'))
  }
}

function* doOnLoggedSaga() {
  yield takeLatest(t.DO_ON_LOGGED_REQUEST, doOnLogged)
}

export default doOnLoggedSaga
