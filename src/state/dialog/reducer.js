import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import {
  HIDE_DIALOG,
  HIDE_LOCATION_DIALOG,
  SHOW_DIALOG,
  SHOW_LOCATION_DIALOG,
} from './constants'

const actionHandlers = {
  [HIDE_DIALOG]: state => state.set('dialog', null),
  [HIDE_LOCATION_DIALOG]: state => state.set('locationDialog', null),
  [SHOW_DIALOG]: (state, { payload }) => state.set('dialog', payload),
  [SHOW_LOCATION_DIALOG]: (state, { payload }) =>
    state.set('locationDialog', payload),
}

export default handleActions(actionHandlers, fromJS({}))
