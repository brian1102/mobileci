import { createSelector } from 'reselect'

const getChatState = state => state.chat

export const getChat = createSelector([getChatState], chat =>
  chat.get('chat', [])
)

export const getTotalUnreadCount = createSelector([getChatState], chat =>
  chat.get('totalUnreadCount', 0)
)
