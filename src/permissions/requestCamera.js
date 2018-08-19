import Permissions from 'react-native-permissions'

const requestCamera = async () => {
  return new Promise(resolve => {
    Permissions.check('camera').then(response => {
      if (response !== 'authorized') {
        return Permissions.request('camera').then(response => {
          return resolve(response === 'authorized')
        })
      }
      return resolve(true)
    })
  })
}

export default requestCamera
