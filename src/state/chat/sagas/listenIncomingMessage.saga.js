import { Platform } from 'react-native'
import { put, takeLatest, call } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import a from '../../actions'
import * as t from '../../actionsType'
import { info } from '../../../utils/logger'

function* listenIncomingMessage(action) {
  try {
    info('waiting 2s to count how many unread message')
    yield call(delay, 1500)
    info('counting how many unread message')
    const notification = action.payload
    // APPLOZIC_01: Got new message
    const keys = Object.keys(notification)

    if (Platform.OS === 'ios') {
      for (let i = 0; i < keys.length; i++) {
        const k = keys[i]
        if (k.indexOf('AL_KEY') > -1) {
          yield put(a[t.FETCH_CONVERSATION_REQUEST]())
          break
        }
      }
    } else {
      for (let i = 0; i < keys.length; i++) {
        const k = keys[i]
        if (k.indexOf('APPLOZIC') > -1) {
          yield put(a[t.FETCH_CONVERSATION_REQUEST]())
          break
        }
      }
    }
    yield put(a[t.HANDLE_NEW_CHAT_COMMING_SUCCESS]())
  } catch (error) {
    yield put(a[t.HANDLE_NEW_CHAT_COMMING_FAILED](error.message))
  }
}

function* listenIncomingMessageSaga() {
  yield takeLatest(t.HANDLE_NEW_CHAT_COMMING_REQUEST, listenIncomingMessage)
}

export default listenIncomingMessageSaga
