import { createAction } from 'redux-actions'
import {
  HIDE_CARD_VIEW,
  HIDE_OVERLAY,
  SHOW_CARD_VIEW,
  SHOW_OVERLAY,
} from './constants'

export const showOverlay = createAction(SHOW_OVERLAY)
export const hideOverlay = createAction(HIDE_OVERLAY)
export const showCardView = createAction(SHOW_CARD_VIEW)
export const hideCardView = createAction(HIDE_CARD_VIEW)
