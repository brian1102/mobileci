import { handleActions } from 'redux-actions'
import { fromJS, Map } from 'immutable'
import { FETCH_CONVERSATION_SUCCESS } from './actionTypes'

const actionHandlers = {
  [FETCH_CONVERSATION_SUCCESS]: (state, { payload }) =>
    state.merge(
      Map({
        chat: payload.messages,
        totalUnreadCount: payload.totalUnreadCount
      })
    )
}

export default handleActions(actionHandlers, fromJS({}))
