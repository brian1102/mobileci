import { createSelector } from 'reselect'
import * as u from '../../../utils/apiObserverUtil'

const getAuthState = state => state.auth

export const getCountryFilter = createSelector([getAuthState], authState =>
  authState.get('countryFilter', '')
)

export const getCountryName = createSelector([getAuthState], authState =>
  authState.get('countryName')
)

export const getCountryPrefix = createSelector([getAuthState], authState =>
  authState.get('countryPrefix')
)

export const getPhoneNumber = createSelector([getAuthState], authState =>
  authState.get('phoneNumber', '')
)

export const getLicenseAgreed = createSelector([getAuthState], authState =>
  authState.get('licenseAgreed', false)
)

export const getCode = createSelector([getAuthState], authState =>
  authState.get('code')
)

export const getShowNoCodeReceived = createSelector([getAuthState], authState =>
  authState.get('showNoCodeReceived', false)
)

export const getAccessToken = createSelector([getAuthState], authState =>
  authState.get('accessToken')
)

export const isLogged = createSelector([getAuthState], authState =>
  authState.get('logged')
)

export const getGetOTPStatus = createSelector([getAuthState], authState =>
  authState.get('getOtpStatus', u.defaultValOnSelector)
)

export const getVerifyOTPStatus = createSelector([getAuthState], authState =>
  authState.get('verifyOtpStatus', u.defaultValOnSelector)
)
export const getDoOnLoggedStatus = createSelector([getAuthState], authState =>
  authState.get('doOnLoggedStatus', u.defaultValOnSelector)
)
