import { createAction } from 'redux-actions'
import createActions from '../../utils/createActions'
import * as t from './actionTypes'

import {
  HIDE_DIALOG,
  HIDE_LOCATION_DIALOG,
  SHOW_DIALOG,
  SHOW_LOCATION_DIALOG,
} from './constants'

export const showDialog = createAction(SHOW_DIALOG)
export const showLocationDialog = createAction(SHOW_LOCATION_DIALOG)
export const hideDialog = createAction(HIDE_DIALOG)
export const hideLocationDialog = createAction(HIDE_LOCATION_DIALOG)

export default createActions(t)
