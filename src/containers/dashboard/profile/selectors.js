import { createSelector } from 'reselect'
import * as u from '../../../utils/index'

const getProfileState = state => state.profile

export const getFetchStateStatus = createSelector([getProfileState], state =>
  state.get('fetchProfileStatStatus', u.defaultValOnSelector)
)

export const getTodayStatsData = createSelector([getProfileState], state =>
  state.get('today', null)
)

export const getLastWeekStatsData = createSelector([getProfileState], state =>
  state.get('last_week', null)
)

export const getLastFourWeeksStatsData = createSelector(
  [getProfileState],
  state => state.get('last_four_weeks', null)
)

export const getProfileAvatar = createSelector([getProfileState], state =>
  state.get('avatar')
)
export const getDutyStatus = createSelector([getProfileState], state =>
  state.get('status')
)
export const getUploadingAvatar = createSelector([getProfileState], state =>
  state.get('uploadingAvatar')
)
export const getSelectVehicleStatus = createSelector([getProfileState], state =>
  state.get('selectVehicleStatus')
)

export const getUpdateDutyStatus = createSelector([getProfileState], state =>
  state.get('updateDutyStatus')
)
