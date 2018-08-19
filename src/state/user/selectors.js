import { createSelector } from 'reselect'
import * as u from '../../utils/index'

const getUser = state => state.user

export const getUserInfo = createSelector([getUser], user =>
  user.get('userInfo')
)

export const getCompanyExceptions = createSelector([getUser], user =>
  user.get('companyExceptions', [])
)

export const getCompanyRules = createSelector([getUser], user =>
  user.get('companyRules', [])
)

export const getVehicleNameList = createSelector(
  [getUserInfo],
  userInfo =>
    userInfo
      ? userInfo.vehicles && userInfo.vehicles.map
        ? userInfo.vehicles.map(v => v.name)
        : []
      : []
)

export const getVehicleList = createSelector(
  [getUserInfo],
  userInfo => (userInfo ? userInfo.vehicles : [])
)

export const getCurrentVehicleType = createSelector(
  [getUserInfo],
  userInfo => (userInfo ? userInfo.currentVehicleType : null)
)

export const isForceSelectionEnable = createSelector([getUser], user =>
  user.get('companyForceVehicleSelection', false)
)

export const getUserInfoStatus = createSelector([getUser], user =>
  user.get('getUserInfoStatus', u.defaultValOnSelector)
)

export const getCompanyId = createSelector(
  [getUserInfo],
  user => user.company_id
)

export const getCompanySlug = createSelector(
  [getUserInfo],
  user => user.company_slug
)
