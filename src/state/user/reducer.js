import { handleActions } from 'redux-actions'
import { fromJS } from 'immutable'
import * as t from '../actionsType'
import * as u from '../../utils/index'

const actionHandlers = {
  [t.GET_USERINFO_REQUEST]: state =>
    state.set('getUserInfoStatus', u.requestState),
  [t.GET_USERINFO_FAILED]: (state, { payload }) =>
    state.set('getUserInfoStatus', u.failedState(payload)),
  [t.GET_USERINFO_SUCCESS]: (state, { payload }) =>
    state.set('userInfo', payload).set('getUserInfoStatus', u.successState),
  [t.GET_COMPANY_CONFIGURATION_SUCCESS]: (state, { payload }) =>
    state
      .set('companyRules', payload ? payload.rules : [])
      .set('companyExceptions', payload ? payload.reasons : [])
      .set(
        'companyForceVehicleSelection',
        payload ? payload.forceVehicleSelection : false
      )
}

export default handleActions(actionHandlers, fromJS({}))
