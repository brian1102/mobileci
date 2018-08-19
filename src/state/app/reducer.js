import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import * as t from '../actionsType'

const actionHandlers = {
  [t.APP_INITIALIZED]: state => state.set('appInitialized', true),
  [t.FINGER_PRINT_AVAILABLE]: (state, { payload }) =>
    state.set('fingerPrintAvailable', payload),
  [t.FINGER_PRINT_ERROR]: (state, { payload }) =>
    state.set('fingerPrintError', payload),
  [t.MARK_NEED_RESUME_STARTUP_CODE]: state =>
    state.set('needResumeStartupCode', true),
  [t.MARK_NEED_RESUME_STARTUP_CODE_SUCCESS]: state =>
    state.set('needResumeStartupCode', false),
  [t.NETWORK_CHANGE]: (state, { payload }) =>
    state.set('isNetworkConnected', payload)
}

export default handleActions(actionHandlers, fromJS({}))
