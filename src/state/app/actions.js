import { createAction } from 'redux-actions'
import createActions from '../../utils/createActions'
import * as t from './actionsType'
import {
  APP_INITIALIZED,
  CHECK_BINARY_VERSION_FAILED,
  CHECK_BINARY_VERSION_REQUEST,
  CHECK_BINARY_VERSION_SUCCESS,
  FINGER_PRINT_AVAILABLE,
  FINGER_PRINT_ERROR,
  FINGER_PRINT_SUCCESS,
  NETWORK_CHANGE
} from './constants'

export const appInitialized = createAction(APP_INITIALIZED)
export const setFingerPrintAvailable = createAction(FINGER_PRINT_AVAILABLE)
export const setFingerPrintError = createAction(FINGER_PRINT_ERROR)
export const setFingerPrintSuccess = createAction(FINGER_PRINT_SUCCESS)
export const checkBinaryVersionFailed = createAction(
  CHECK_BINARY_VERSION_FAILED
)
export const checkBinaryVersionRequest = createAction(
  CHECK_BINARY_VERSION_REQUEST
)
export const checkBinaryVersionSuccess = createAction(
  CHECK_BINARY_VERSION_SUCCESS
)
export const networkChange = createAction(NETWORK_CHANGE)

export default createActions(t)
