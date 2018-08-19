// create action creators from actionTypes
// The action creators have a method signature of someAction([payload[, [next])
// When called without the [optional] parameters, the action creator will return an action with just the `type`
import { NavigationActions } from 'react-navigation'
import { REPLACE } from '../state/actionsType'

export const { NAVIGATE, RESET } = NavigationActions

export default function createActions(actionTypes) {
  const actions = {}
  Object.keys(actionTypes).forEach(type => {
    actions[actionTypes[type]] = (payload, ...args) => {
      // wrap actions for React Navigation
      if (actionTypes[type] === NAVIGATE)
        return {
          type: NAVIGATE,
          routeName: payload.routeName || payload,
          params: payload.params || null,
          ...args
        }

      if (actionTypes[type] === RESET)
        return {
          type: RESET,
          actions: payload.actions,
          index: payload.index || 0,
          key: payload.key,
          ...args
        }

      if (actionTypes[type] === REPLACE)
        return {
          type: REPLACE,
          routeName: payload,
          ...args
        }

      // creating normal actions
      const action = {
        type: actionTypes[type],
        payload,
        ...args
      }
      return action
    }
  })
  return actions
}
