import { Platform } from 'react-native'

const codePush = {
  android: {
    staging: 'rbBGC5tQVwuvDwwge0XWWcT9AAZy22ebc4fa-61bd-4b2e-81d2-a1c00cef47fe',
    production:
      'peoLY3LuA07c3jL6Bx9cpWTdz5jG22ebc4fa-61bd-4b2e-81d2-a1c00cef47fe',
  },
  ios: {
    staging: '1OcsiWs1NAIsSJmX05KIcZQIN5ue22ebc4fa-61bd-4b2e-81d2-a1c00cef47fe',
    production:
      'jX9IeFgznjGyOyGcN8h6aP9pnjU822ebc4fa-61bd-4b2e-81d2-a1c00cef47fe',
  },
}

const getCodePushDevKey = () => {
  const env = codePush[Platform.OS]
  return __DEV__ ? env.staging : env.production // eslint-disable-line
}

export default getCodePushDevKey
