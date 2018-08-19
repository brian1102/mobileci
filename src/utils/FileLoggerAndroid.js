// just for deamon sync error debug, will remove
import RNFetchBlob from 'react-native-fetch-blob'
import { Platform } from 'react-native'
import { log } from './logger'

const LOG_FILE = `${RNFetchBlob.fs.dirs.SDCardDir}/sync_diamon.txt`

export default function println(message) {
  // eslint-disable-next-line
  if (Platform.OS === 'ios' || __DEV__) return
  log(message)
  RNFetchBlob.fs.appendFile(
    LOG_FILE,
    `${new Date().toLocaleString()} : ${message} \n\n`,
    'utf8'
  )
}

export function removeFile() {
  if (Platform.OS === 'ios') return
  try {
    RNFetchBlob.fs.unlink(LOG_FILE)
  } catch (error) {
    log('Error')
  }
}
