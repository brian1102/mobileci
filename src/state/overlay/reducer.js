import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import {
  HIDE_CARD_VIEW,
  HIDE_OVERLAY,
  SHOW_CARD_VIEW,
  SHOW_OVERLAY,
} from './constants'

const actionHandlers = {
  [HIDE_CARD_VIEW]: state => state.set('cardViewVisible', false),
  [HIDE_OVERLAY]: state => state.set('overlayVisible', false),
  [SHOW_CARD_VIEW]: state => state.set('cardViewVisible', true),
  [SHOW_OVERLAY]: state => state.set('overlayVisible', true),
}

export default handleActions(actionHandlers, fromJS({}))
