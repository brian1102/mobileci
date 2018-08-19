import { createSelector } from 'reselect'
import * as u from '../../utils/index'

const getNavigationState = state => state.navigation

export const getCurrentRoute = createSelector(
  [getNavigationState],
  navigation => {
    return u.getCurrentRoute(navigation)
  }
)
