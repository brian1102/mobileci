// noinspection JSUnresolvedVariable
import { createSelector } from 'reselect'

const getOverlay = state => state.overlay

export const isOverlayVisible = createSelector([getOverlay], overlay =>
  overlay.get('overlayVisible', false)
)
export const isCardViewVisible = createSelector([getOverlay], overlay =>
  overlay.get('cardViewVisible', false)
)
