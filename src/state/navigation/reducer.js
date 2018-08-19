import { Stack } from 'immutable'
import { NavigationActions } from 'react-navigation'
import { handleActions } from 'redux-actions'
import { POP_PREVIOUS_ROUTE_NAME, SET_PREVIOUS_ROUTE_NAME } from './constants'
import { AppNavigator } from '../../utils/AppNavigator'
import * as t from '../actionsType'

const { NAVIGATE, BACK, RESET } = NavigationActions
const defaultState = {
  index: 0,
  routes: [{ key: 'Start', routeName: 'Start', title: '' }],
  appInitialized: false,
  stack: Stack()
}

const actionHandlers = {
  [NAVIGATE]: (state, action) => {
    return AppNavigator.router.getStateForAction(
      NavigationActions.navigate(action),
      state
    )
  },
  [RESET]: (state, action) => {
    return AppNavigator.router.getStateForAction(
      NavigationActions.reset({
        index: action.index || 0,
        key: action.key || null,
        actions: action.actions
      }),
      state
    )
  },
  [t.REPLACE]: (state, action) => {
    const routes = state.routes.slice(0, state.routes.length - 1)
    routes.push(action)
    return {
      ...state,
      routes,
      index: routes.length - 1
    }
  },
  [BACK]: state =>
    AppNavigator.router.getStateForAction(NavigationActions.back(), state),
  [SET_PREVIOUS_ROUTE_NAME]: (state, { payload }) => ({
    ...state,
    stack: state.stack.push(payload)
  }),
  [POP_PREVIOUS_ROUTE_NAME]: state => ({
    ...state,
    stack: state.stack.pop()
  })
}

export default handleActions(actionHandlers, defaultState)
