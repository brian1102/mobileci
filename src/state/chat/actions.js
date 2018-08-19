import { createAction } from 'redux-actions'
import createActions from '../../utils/createActions'
import * as t from './actionTypes'

import {
  OPEN_CHAT_WITH_GROUP_ID,
  OPEN_CHAT_WITH_USER_ID,
  OPEN_JOB_CHAT,
} from './constants'

export const openChatWithGroupId = createAction(OPEN_CHAT_WITH_GROUP_ID)
export const openChatWithUserId = createAction(OPEN_CHAT_WITH_USER_ID)
export const openJobChat = createAction(OPEN_JOB_CHAT)

export default createActions(t)
