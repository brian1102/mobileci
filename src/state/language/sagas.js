import { AsyncStorage } from 'react-native'
import codepush from 'react-native-code-push'
import { delay } from 'redux-saga'
import { put, takeLatest } from 'redux-saga/effects'
import { SET_LANGUAGE } from './constants'
import { showOverlay } from '../overlay/actions'

function* setLanguage(action) {
  const language = action.payload
  yield put(showOverlay())
  yield delay(1000)
  AsyncStorage.setItem('language', language).then(() => {
    codepush.restartApp()
  })
}

function* setLanguageSaga() {
  yield takeLatest(SET_LANGUAGE, setLanguage)
}

export default [setLanguageSaga]
