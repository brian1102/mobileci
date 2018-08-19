import { handleActions } from 'redux-actions'
import { fromJS } from 'immutable'
import * as t from '../../../state/actionsType'
import * as u from '../../../utils/index'

const actionHandlers = {
  [t.IS_WAIT_CODE]: (state, { payload }) => state.set('waitCode', payload),
  [t.SET_ACCESS_TOKEN]: (state, { payload }) =>
    state.set('accessToken', payload),
  [t.SHOW_NO_CODE_RECEIVED]: (state, { payload }) =>
    state.set('showNoCodeReceived', payload),
  [t.UPDATE_CODE]: (state, { payload }) => state.set('code', payload),
  [t.UPDATE_COUNTRY_FILTER]: (state, { payload }) =>
    state.set('countryFilter', payload),
  [t.UPDATE_COUNTRY_NAME]: (state, { payload }) =>
    state.set('countryName', payload),
  [t.UPDATE_COUNTRY_PREFIX]: (state, { payload }) =>
    state.set('countryPrefix', payload),
  [t.UPDATE_LICENSE_AGREED]: state => state.set('licenseAgreed', true),
  [t.UPDATE_PHONE_NUMBER]: (state, { payload }) =>
    state.set('phoneNumber', payload),

  [t.VERIFY_OTP_REQUEST]: state => state.set('verifyOtpStatus', u.requestState),
  [t.VERIFY_OTP_FAILED]: (state, { payload }) =>
    state.set('verifyOtpStatus', u.failedState(payload)),
  [t.VERIFY_OTP_SUCCESS]: state => state.set('verifyOtpStatus', u.successState),

  [t.DO_ON_LOGGED_REQUEST]: state =>
    state.set('doOnLoggedStatus', u.requestState),
  [t.DO_ON_LOGGED_FAILED]: (state, { payload }) =>
    state.set('doOnLoggedStatus', u.failedState(payload)),
  [t.DO_ON_LOGGED_SUCCESS]: state =>
    state.set('doOnLoggedStatus', u.successState).set('logged', true),

  [t.GET_OTP_REQUEST]: state => state.set('getOtpStatus', u.requestState),
  [t.GET_OTP_FAILED]: (state, { payload }) =>
    state.set('getOtpStatus', u.failedState(payload)),
  [t.GET_OTP_SUCCESS]: state => state.set('getOtpStatus', u.successState),
  [t.PERSIST_REHYDRATE]: state => state.set('logged', false)
}

export default handleActions(actionHandlers, fromJS({}))
