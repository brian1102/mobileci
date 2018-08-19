import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import { SET_LANGUAGE } from './constants'

const actionHandlers = {
  [SET_LANGUAGE]: (state, { payload }) => state.set('language', payload),
}

export default handleActions(actionHandlers, fromJS({}))
