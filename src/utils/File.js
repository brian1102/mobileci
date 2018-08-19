/**
 * Created by: Hau Vo
 *
 * Provide methods for processing File Systems
 */

import RNFetchBlob from 'react-native-fetch-blob'

/**
 * Get SDCard path, it's only available for 0.9.5+ Android Only
 */
const getSDCardDir = () => {
  return RNFetchBlob.fs.dirs.SDCardDir
}

/**
 * Get document directory path, it's available for iOS and Android
 */
const getDocumentDir = () => {
  return RNFetchBlob.fs.dirs.DocumentDir
}

/**
 * Get cache directory path, it's avaible for both iOS and Android
 */
const getCacheDir = () => {
  return RNFetchBlob.fs.dirs.CacheDir
}

/**
 * Get best directory to store files for application
 */
const getBestStorageDir = () => {
  // return Platform.OS === 'ios' ? getDocumentDir() : getSDCardDir()
  return getDocumentDir()
}

/**
 * Check file exists
 * @param {String} filePath
 */
const isExists = filePath => {
  return RNFetchBlob.fs.exists(filePath)
}

/**
 * Move a file
 * @param {String} fromPath
 * @param {String} toPath
 */
const moveFile = (fromPath, toPath) => {
  return RNFetchBlob.fs.mv(fromPath, toPath)
}

/**
 * Delete a file
 * @param {String} filePath
 */
const deleteFile = async filePath => {
  return RNFetchBlob.fs.unlink(filePath)
}

/**
 * Copy a file
 * @param {String} fromPath
 * @param {String} toPath
 */
const copyFile = async (fromPath, toPath, rewrite = true) => {
  if (rewrite) {
    const exists = await isExists(toPath)
    if (exists) await deleteFile(toPath)
  }
  return RNFetchBlob.fs.cp(fromPath, toPath)
}

/**
 * Get file information
 * @param {String} filePath
 */
const getFileInfo = filePath => {
  return RNFetchBlob.fs.stat(filePath)
}

/**
 * Get file extension
 * @param {String} filePath
 */
const getFileExt = filePath => {
  return /[.]/.exec(filePath) ? /[^.]+$/.exec(filePath)[0] : undefined
}

/**
 * Make a directory if it's not exist
 * @param {String} filePath
 */
const makeDir = async dirPath => {
  const exists = await isExists(dirPath)
  if (!exists) return RNFetchBlob.fs.mkdir(dirPath)
  return Promise.resolve(exists)
}

/**
 * Save Base64 Image into path
 * @param {data} base64Data
 * @param {String} filePath
 * @param {Boolean} rewrite
 */
const saveBase64Image = async (base64Data, filePath, rewrite = true) => {
  if (rewrite) {
    const exists = await isExists(filePath)
    if (exists) await deleteFile(filePath)
  }
  return RNFetchBlob.fs.writeFile(filePath, base64Data, 'base64')
}

export default {
  getSDCardDir,
  getDocumentDir,
  getCacheDir,
  getBestStorageDir,
  isExists,
  moveFile,
  copyFile,
  deleteFile,
  getFileInfo,
  getFileExt,
  makeDir,
  saveBase64Image,
}
