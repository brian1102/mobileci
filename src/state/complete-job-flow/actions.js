import { createAction } from 'redux-actions'
import createActions from '../../utils/createActions'
import * as t from './actionsType'

export const logRequest = createAction(t.REQUEST_LOG_REQUEST)
export const logRequestSuccess = createAction(t.REQUEST_LOG_SUCCESS)
export const logRequestFailed = createAction(t.REQUEST_LOG_FAILED)

export const allJobRequestLogged = createAction(t.ALL_JOB_REQUESTS_LOGGED)

export const removeImageFromDiskRequest = createAction(
  t.REMOVE_IMAGE_FROM_DISK_REQUEST
)
export const removeImageFromDiskSuccess = createAction(
  t.REMOVE_IMAGE_FROM_DISK_SUCCESS
)
export const removeImageFromDiskFailed = createAction(
  t.REMOVE_IMAGE_FROM_DISK_FAILED
)

export const saveImageToDiskRequest = createAction(t.SAVE_IMAGE_TO_DISK_REQUEST)
export const saveImageToDiskSuccess = createAction(t.SAVE_IMAGE_TO_DISK_SUCCESS)
export const saveImageToDiskFailed = createAction(t.SAVE_IMAGE_TO_DISK_FAILED)

export const startCheckingConditions = createAction(
  t.CHECKING_CONDITIONS_REQUEST
)

export const setCurrentCondition = createAction(t.SET_CURRENT_CONDITION)

export const photoCaptured = createAction(t.PHOTO_CAPTURED)

export const syncingAJobDone = createAction(t.SYNCING_AN_ACTION_SUCCESS)

export default createActions(t)
