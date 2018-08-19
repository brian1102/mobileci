import flowRight from 'lodash/fp/flowRight'
import { NativeModules } from 'react-native'
import Config from '../../config'
import { info } from '../../utils/logger'

const {
  ApplozicChat: {
    channelUnreadCount,
    contactUnreadCount,
    getChannelByChannelKey,
    getChannelByClientGroupId: channelByClientGroupId,
    getDisplayName: displayName,
    login: doLogin,
    messageList,
    openChatRoom,
    latestMessageForChannel
  }
} = NativeModules

// TODO: Hau Vo: only use for testing
// const getMessages = () => Promise.resolve(fakeConversations)

const getMessages = (searchString = '') =>
  new Promise((resolve, reject) =>
    messageList({ searchString }, flowRight(resolve, JSON.parse), reject)
  )

const getLatestMessageForChannel = channelKey =>
  new Promise((resolve, reject) =>
    latestMessageForChannel(
      { channelKey },
      flowRight(resolve, JSON.parse),
      reject
    )
  )

const getChannel = channelKey =>
  new Promise((resolve, reject) =>
    getChannelByChannelKey(
      { channelKey },
      flowRight(resolve, JSON.parse),
      reject
    )
  )

const getChannelUnreadCount = channelKey =>
  new Promise((resolve, reject) =>
    channelUnreadCount({ channelKey }, resolve, reject)
  )

// TODO: Hau Vo: only use for testing
// const getContactUnreadCount = () => Promise.resolve(5)
const getContactUnreadCount = userId =>
  new Promise((resolve, reject) =>
    contactUnreadCount({ userId }, resolve, reject)
  )

const getDisplayName = key => {
  if (!key) return Promise.resolve('Unknown')
  return new Promise((resolve, reject) => displayName({ key }, resolve, reject))
}

const getChatUserId = (userInfo, chatEnv) =>
  `${chatEnv}_worker_v2_${userInfo.company_id
    ? `${userInfo.company_id}_`
    : ''}${userInfo.id}`

const login = (userInfo, chatEnv) => {
  const userId = getChatUserId(userInfo, chatEnv)
  info('[ChatAPI] Login:', userId)
  return new Promise((resolve, reject) =>
    doLogin(
      {
        userId,
        email: '',
        phoneNumber: userInfo.phone_number,
        password: '',
        displayName: userInfo.name,
        token: ''
      },
      resolve,
      reject
    )
  )
}

const openChatRoomWithGroupId = channelKey =>
  new Promise((resolve, reject) =>
    openChatRoom({ channelKey }, resolve, reject)
  )

const openChatRoomWithUserId = userId => {
  return new Promise((resolve, reject) =>
    openChatRoom({ userId }, resolve, reject)
  )
}

const getChannelByClientGroupId = clientGroupId =>
  new Promise((resolve, reject) =>
    channelByClientGroupId(
      { clientGroupId },
      flowRight(resolve, JSON.parse),
      reject
    )
  )

const openChatRoomForTaskGroupId = (companyId, taskGroupId) => {
  const groupId = getGroupId(companyId, taskGroupId)
  return openChatRoomWithGroupId(groupId)
}

const getGroupId = (companyId, taskGroupId) => {
  return `${Config().CHAT_ENV}_task_v2_${companyId}_${taskGroupId}`
}

export default {
  getChannel,
  getChannelUnreadCount,
  getChannelByClientGroupId,
  getContactUnreadCount,
  getDisplayName,
  getMessages,
  getLatestMessageForChannel,
  login,
  getChatUserId,
  openChatRoomWithGroupId,
  openChatRoomWithUserId,
  getGroupId,
  openChatRoomForTaskGroupId
}
