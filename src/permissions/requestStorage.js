import Permissions from 'react-native-permissions'
import { Platform } from 'react-native'

const requestStorage = async () => {
  if (Platform.OS === 'ios') return true
  return new Promise(resolve => {
    Permissions.check('storage').then(response => {
      if (response !== 'authorized') {
        return Permissions.request('storage').then(response => {
          return resolve(response === 'authorized')
        })
      }
      return resolve(true)
    })
  })
}

export default requestStorage
