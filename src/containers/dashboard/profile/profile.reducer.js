import { handleActions } from 'redux-actions'
import { fromJS, Map } from 'immutable'
import * as t from '../../../state/actionsType'
import * as u from '../../../utils'

const actionHandlers = {
  [t.FETCH_PROFILE_STATS]: state =>
    state.set('fetchProfileStatStatus', u.requestState),
  [t.FETCH_PROFILE_STATS_SUCCESS]: (
    state,
    { payload: { today, last_week, last_four_weeks } }
  ) =>
    state
      .merge(
        Map({
          today,
          last_week,
          last_four_weeks
        })
      )
      .set('fetchProfileStatStatus', u.successState),
  [t.FETCH_PROFILE_STATS_FAILED]: (state, { payload }) =>
    state.set('fetchProfileStatStatus', u.failedState(payload)),

  [t.SELECT_VEHICLE]: state => state.set('selectVehicleStatus', u.requestState),
  [t.SELECT_VEHICLE_SUCCESS]: (
    state,
    { payload: { today, last_week, last_four_weeks } }
  ) => {
    let newState = state
    if (today && last_week && last_four_weeks) { // eslint-disable-line camelcase
      newState = newState
        .merge(
          Map({
            today,
            last_week,
            last_four_weeks
          })
        )
    }
    return newState.set('selectVehicleStatus', u.successState)
  },
  [t.SELECT_VEHICLE_FAILED]: (state, { payload }) =>
    state.set('selectVehicleStatus', u.failedState(payload)),

  [t.UPLOAD_PROFILE_AVATAR]: state => {
    return state.merge(
      Map({
        error: null,
        uploadingAvatar: true
      })
    )
  },
  [t.UPLOAD_PROFILE_AVATAR_SUCCESS]: (state, { payload }) => {
    return state.merge(
      Map({
        avatar: payload,
        uploadingAvatar: false
      })
    )
  },
  [t.UPLOAD_PROFILE_AVATAR_FAILED]: (state, { payload }) => {
    return state.merge(
      Map({
        error: payload,
        uploadingAvatar: false
      })
    )
  },

  [t.UPDATE_DUTY_STATUS]: state =>
    state.set('updateDutyStatus', u.requestState),
  [t.UPDATE_DUTY_STATUS_SUCCESS]: (state, { payload }) =>
    state.set('updateDutyStatus', u.successState).set('status', payload),
  [t.UPDATE_DUTY_STATUS_FAILED]: (state, { payload }) =>
    state.set('updateDutyStatus', u.failedState(payload))
}

export default handleActions(actionHandlers, fromJS({}))
