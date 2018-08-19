import CodePush from 'react-native-code-push'
import { takeLatest, call } from 'redux-saga/effects'
import * as t from '../../../state/actionsType'
import { setLanguage } from '../../../utils/developmentMode'

function* setLanguageFlow(action) {
  const language = action.payload
  yield call(setLanguage, language)
  CodePush.restartApp()
}

function* setLanguageSaga() {
  yield takeLatest(t.SET_LANGUAGE, setLanguageFlow)
}

export default [setLanguageSaga]
