import { createSelector } from 'reselect'

const getApp = state => state.app

export const getFingerPrintError = createSelector([getApp], app =>
  app.get('fingerPrintError', null)
)
export const isAppInitialized = createSelector([getApp], app =>
  app.get('appInitialized', false)
)
export const isFingerPrintAvailable = createSelector([getApp], app =>
  app.get('fingerPrintAvailable', false)
)
export const isAppRehydrated = createSelector([getApp], app =>
  app.get('appRehydrated', false)
)

export const isNetworkConnected = createSelector([getApp], app =>
  app.get('isNetworkConnected', false)
)

export const isNeedResumeStartupCode = createSelector(
  [getApp],
  app => app.get('needResumeStartupCode') || false
)
