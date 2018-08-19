import { handleActions } from 'redux-actions'
import * as t from '../../../../state/actionsType'

const actionHandlers = {

  [t.FETCH_OVERVIEW_MAP_DATA]: (state) => ({ ...state, loading: true }),
  [t.FETCH_OVERVIEW_MAP_DATA_SUCCESS]: (state, { payload }) => ({ ...state, ...payload, loading: false }),
  [t.FETCH_OVERVIEW_MAP_DATA_FAILED]: (state, { error }) => ({ ...state, loading: false, error }),

  [t.UPDATE_ROUTE_TO_FIRST_WAYPOINT_SUCCESS]: (state, { payload }) => ({ ...state, firstRoute: payload })
}

export default handleActions(actionHandlers, {
  tasks: [],
  duration: 0,
  distance: 0,
  steps: [],
  firstRoute: null,
  markers: []
})
