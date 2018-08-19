import { call, put, takeLatest, select } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import _ from 'lodash'
import ChatApi from '../../../api/chat/ChatApi'
import Config from '../../../config'
import { isNetworkConnected } from '../../app/selectors'
import a from '../actions'
import * as t from '../actionTypes'
import * as s from '../../../state/selectors'

function* getChannels(messages) {
  for (const message of messages) {
    if (!message.groupId) {
      message.channel = { key: null, type: 0 }
      message.groupId = null
      continue
    }
    const channelInfo = yield call(ChatApi.getChannelByClientGroupId, message.groupId)
    message.channel = channelInfo
  }
}

function getUserIds(messages, ownerId) {
  messages.forEach(message => {
    if (
      message.channel.key === null &&
      message.groupId === null &&
      message.contactIds !== null
    ) {
      // eslint-disable-next-line
      message.userIds = message.contactIds.split(',')
    } else {
      // eslint-disable-next-line
      message.userIds = [ownerId]
    }
  })
}

function* getUnreadCount(messages) {
  for (const message of messages) {
    if (message.channel) {
      message.unreadCount = yield call(
        ChatApi.getChannelUnreadCount,
        message.channel.channelKey
      )
    } else {
      message.unreadCount = yield call(
        ChatApi.getContactUnreadCount,
        message.userIds[0]
      )
    }
  }
}

function* getLatestMessage(messages) {
  for (const message of messages) {
    if (message.channel) {
      message.latestMessage = yield call(
        ChatApi.getLatestMessageForChannel,
        message.channel.channelKey
      )

      if (message.latestMessage instanceof Array && message.latestMessage.length > 0) {
        message.latestMessage = message.latestMessage[0]
      }
    } else {
      message.latestMessage = 'Not yet implemented'
    }
  }
}

function getDisplayName(messages) {
  for (const message of messages) {
    if (message.channel) message.displayName = message.channel.name
    else message.displayName = 'Unknown'
  }
}

function getConversations(taskGroupIds, userInfo) {
  if (taskGroupIds) {
    return taskGroupIds.map(id => ({
      groupId: ChatApi.getGroupId(userInfo.company_id, id)
    }))
  }
  return []
}

function* fetchConversationsFlow() {
  try {
    yield call(delay, 500)
    const isOnline = yield select(isNetworkConnected)
    if (!isOnline) return

    const incomingTaskGroups = yield select(s.getIncomingTaskGroups)
    const ongoingTasks = yield select(s.getTask)
    const userInfo = yield select(s.getUserInfo)

    let taskGroupIds = []

    if (incomingTaskGroups) {
      taskGroupIds = taskGroupIds.concat(incomingTaskGroups.map(tGroup => tGroup.id))
    }

    if (ongoingTasks) {
      taskGroupIds = taskGroupIds.concat(ongoingTasks.map(t => t.taskGroupId))
    }
    taskGroupIds = _.uniq(taskGroupIds)

    let messages = getConversations(taskGroupIds, userInfo)

    yield call(getChannels, messages)
    // remove some null channels
    messages = messages.filter(m => m.channel)
    const userChatId = ChatApi.getChatUserId(userInfo, Config().CHAT_ENV)
    yield call(getUserIds, messages, userChatId)
    yield call(getUnreadCount, messages)
    yield call(getLatestMessage, messages)
    yield call(getDisplayName, messages)

    const totalUnreadCount = _.sumBy(messages, m => m.unreadCount)
    yield put(a[t.FETCH_CONVERSATION_SUCCESS]({ messages, totalUnreadCount }))
  } catch (error) {
    yield put(a[t.FETCH_CONVERSATION_FAILED](error.message))
  }
}

export default function* fetchConversationsSaga() {
  yield takeLatest(t.FETCH_CONVERSATION_REQUEST, fetchConversationsFlow)
}
