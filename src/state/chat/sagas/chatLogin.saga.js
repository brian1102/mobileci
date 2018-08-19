import { call, put, takeLatest, select } from 'redux-saga/effects'
import ChatApi from '../../../api/chat/ChatApi'
import Config from '../../../config'
import { info } from '../../../utils/logger'
import a from '../../actions'
import * as t from '../../actionsType'
import * as s from '../../selectors'

function* doOnLogged() {
  try {
    const chatEnv = Config().CHAT_ENV
    const userInfo = yield select(s.getUserInfo)
    const chatResponse = yield call(ChatApi.login, userInfo, chatEnv)
    info('[ChatAPI] Login Response:', chatResponse)
    yield put(a[t.CHAT_LOGIN_SUCCESS]())
  } catch (error) {
    yield put(a[t.CHAT_LOGIN_FAILED](error.message))
  }
}

function* doOnLoggedSaga() {
  yield takeLatest(t.CHAT_LOGIN_REQUEST, doOnLogged)
}

export default doOnLoggedSaga
