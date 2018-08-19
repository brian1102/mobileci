import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import { UPDATE_LOCATION, UPDATE_LOCATION_LOCALLY } from '../actionsType'

const actionHandlers = {
  [UPDATE_LOCATION]: (state, { payload }) => state.set('location', payload),
  [UPDATE_LOCATION_LOCALLY]: (state, { payload }) =>
    state.set('location', payload)
}

export default handleActions(actionHandlers, fromJS({}))
