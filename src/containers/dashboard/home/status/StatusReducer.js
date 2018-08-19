import { handleActions } from 'redux-actions'
import { fromJS, Map } from 'immutable'
import * as t from '../../../../state/actionsType'

const actionHandlers = {
  [t.FETCH_DAILY_STATUS]: (state) => state.set('isFetching', true),
  [t.FETCH_DAILY_STATUS_SUCCESS]: (state, { payload }) => state.merge(
    Map({
      dailyStatus: payload,
      isFetching: false
    })
  ),
  [t.FETCH_DAILY_STATUS_FAILED]: (state) => state.set('isFetching', false)
}

export default handleActions(actionHandlers, fromJS({}))
