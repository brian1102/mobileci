/**
 * Helper to Save, Load, Delete data from local storage
 */
import { AsyncStorage } from 'react-native'
import File from '../File'
import Config from '../../config'
import { log } from '../logger'

export const PHONE_NUMBER = '@yojee_driver_phonenumber_'
export const SIGNATURE = '@yojee_driver_signature_'
export const POD = '@yojee_driver_pod_'
export const ACCESS_TOKEN = '@yojee_access_token'
export const IS_VEHICLE_SELECTED_ONSTARUP = '@yojee_vehicle_selected'

/**
 * Signature Image Processing
 */
function getSignatureId(taskId, conditionId) {
  return `${SIGNATURE}_${taskId}_${conditionId}`
}

export async function saveSignatureImage({ task, condition, signature }) {
  const signatureDir = `${File.getBestStorageDir()}/${Config()
    .SIGNATURE_IMAGE_DIR}`
  const dest = `${signatureDir}/${task.id}_${condition.id}.jpg`
  try {
    await File.makeDir(signatureDir)
    await File.saveBase64Image(signature, dest)
    return dest
  } catch (e) {
    log('[StorageEngine] saveSignatureImage', e)
    return null
  }
}

export async function saveSignatureRecord({ task, condition, signaturePath }) {
  return AsyncStorage.setItem(
    getSignatureId(task.id, condition.id),
    signaturePath
  )
}

export async function loadSignatureImage({ task, condition }, onFailed) {
  try {
    // right now, it will return local path, not base64 data anymore
    return AsyncStorage.getItem(getSignatureId(task.id, condition.id))
  } catch (err) {
    if (onFailed) onFailed(err)
    return null
  }
}

export async function removeSignatureImage({ task, condition }) {
  if (!task || !condition) return Promise.resolve(null)
  // we need to remove image file on local storage too
  const signaturePath = await loadSignatureImage({ task, condition })
  if (signaturePath) File.deleteFile(signaturePath)
  return AsyncStorage.removeItem(getSignatureId(task.id, condition.id))
}

/**
 * Proof of Delivery Image Processing
 */

function getPODId(taskId, conditionId) {
  return `${POD}_${taskId}_${conditionId}`
}

export async function savePODImage({ task, condition, pod }) {
  const ext = File.getFileExt(pod)
  const podDir = `${File.getBestStorageDir()}/${Config().POD_IMAGE_DIR}`
  const dest = `${podDir}/${task.id}_${condition.id}.${ext}`
  try {
    await File.makeDir(podDir)
    await File.copyFile(pod, dest, true)
    return dest
  } catch (e) {
    log('[StorageEngine] savePODImage', e)
    return null
  }
}

export async function savePODRecord({ task, condition, podPath }) {
  return AsyncStorage.setItem(getPODId(task.id, condition.id), podPath)
}

export async function loadPODImage({ task, condition }, onFailed) {
  try {
    return AsyncStorage.getItem(getPODId(task.id, condition.id))
  } catch (err) {
    onFailed(err)
    return null
  }
}

export async function removePODImage({ task, condition }) {
  if (!task || !condition) return Promise.resolve(null)
  // we need to remove image file on local storage too
  const podPath = await loadPODImage({ task, condition })
  if (podPath) File.deleteFile(podPath)
  return AsyncStorage.removeItem(getPODId(task, condition))
}

/**
 * Access token processing
 */

export async function saveAccessToken(accessToken) {
  return AsyncStorage.setItem(ACCESS_TOKEN, accessToken)
}

export async function loadAccessToken() {
  try {
    return await AsyncStorage.getItem(ACCESS_TOKEN)
  } catch (err) {
    return null
  }
}

export async function markAsVehicleSelectedOnStartup() {
  return AsyncStorage.setItem(IS_VEHICLE_SELECTED_ONSTARUP, '1')
}

export async function isVehicleSelectedOnStartup() {
  try {
    return await AsyncStorage.getItem(IS_VEHICLE_SELECTED_ONSTARUP)
  } catch (err) {
    return null
  }
}

export async function savePhoneNumber(phone) {
  return AsyncStorage.setItem(PHONE_NUMBER, phone)
}

export async function loadPhoneNumber() {
  try {
    return await AsyncStorage.getItem(PHONE_NUMBER)
  } catch (err) {
    return null
  }
}
