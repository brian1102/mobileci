import { createSelector } from 'reselect'

const getStatusState = state => state.dailyStatus

export const getFetchingDailyStatus = createSelector(
  [getStatusState],
  isFetching => isFetching.get('isFetching', true)
)
export const getDailyStatus = createSelector(
  [getStatusState],
  state => state.get('dailyStatus', null)
)
