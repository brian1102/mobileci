import { Alert } from 'react-native'
import { call, takeLatest } from 'redux-saga/effects'
import ChatApi from '../../api/chat/ChatApi'
import t from '../../i18n/i18n'
import fetchConversation from './sagas/fetchConversation.saga'
import listenIncomingMessage from './sagas/listenIncomingMessage.saga'
import chatLogin from './sagas/chatLogin.saga'
import {
  OPEN_CHAT_WITH_GROUP_ID,
  OPEN_CHAT_WITH_USER_ID,
  OPEN_JOB_CHAT,
} from './constants'

function* openJobChat(action) {
  try {
    const { chatEnv, companyId, jobId } = action.payload
    const clientGroupId = getClientGroupId(chatEnv, companyId, jobId)

    const result = yield call(ChatApi.getChannelByClientGroupId, clientGroupId)

    if (!result) {
      Alert.alert('Chat', "Can't open chat for this Task", [
        { text: t('alert_button_ok') },
      ])
    } else {
      yield openChatWithGroupId({ payload: result.channelKey })
    }
  } catch (e) {
    // eslint-disable-next-line
    console.log(e)
  }
}

const getClientGroupId = (chatEnv, companyId, jobId) =>
  `${chatEnv}_job_v1_${companyId}_${jobId}`

function* openChatWithGroupId(action) {
  yield call(ChatApi.openChatRoomWithGroupId, action.payload)
}

function* openChatWithUserId(action) {
  yield call(ChatApi.openChatRoomWithUserId, action.payload)
}

function* openChatWithGroupIdSaga() {
  yield takeLatest(OPEN_CHAT_WITH_GROUP_ID, openChatWithGroupId)
}

function* openChatWithUserIdSaga() {
  yield takeLatest(OPEN_CHAT_WITH_USER_ID, openChatWithUserId)
}

function* openJobChatSaga() {
  yield takeLatest(OPEN_JOB_CHAT, openJobChat)
}

export default [
  fetchConversation,
  openChatWithGroupIdSaga,
  openChatWithUserIdSaga,
  openJobChatSaga,
  chatLogin,
  listenIncomingMessage
]
