import Permissions from 'react-native-permissions'

const requestLocation = async () => {
  return new Promise(resolve => {
    Permissions.check('location').then(response => {
      if (response !== 'authorized') {
        return Permissions.request('location').then(response => {
          return resolve(response === 'authorized')
        })
      }
      return resolve(true)
    })
  })
}

export default requestLocation
