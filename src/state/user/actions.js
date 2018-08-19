import { createAction } from 'redux-actions'
import createActions from '../../utils/createActions'
import * as constants from './constants'
import * as t from './actionTypes'

export const updateUserInfo = createAction(constants.UPDATE_USER_INFO)
export const changeStatus = createAction(constants.CHANGE_STATUS)
export const changeDeliveryType = createAction(constants.CHANGE_DELIVERY_TYPE)

export default createActions(t)
