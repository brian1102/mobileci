import { handleActions } from 'redux-actions'
import { fromJS } from 'immutable'

const actionHandlers = {}

export default handleActions(actionHandlers, fromJS({}))
