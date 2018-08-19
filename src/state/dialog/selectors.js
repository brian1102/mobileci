import { createSelector } from 'reselect'

const getDialogState = state => state.dialog

export const getDialog = createSelector([getDialogState], dialog =>
  dialog.get('dialog', null)
)
export const getLocationDialog = createSelector([getDialogState], dialog =>
  dialog.get('locationDialog', null)
)
