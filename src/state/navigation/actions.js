import { NavigationActions } from 'react-navigation'
import { createAction } from 'redux-actions'
import { POP_PREVIOUS_ROUTE_NAME, SET_PREVIOUS_ROUTE_NAME } from './constants'
import createActions from '../../utils/createActions'
import * as t from './actionTypes'

const { NAVIGATE, BACK } = NavigationActions

const navigateImpl = createAction(NAVIGATE)

export const navigate = routeName => navigateImpl({ routeName })
export const back = createAction(BACK)
export const setPreviousRouteName = createAction(SET_PREVIOUS_ROUTE_NAME)
export const popPreviousRouteName = createAction(POP_PREVIOUS_ROUTE_NAME)

export default createActions(t)
