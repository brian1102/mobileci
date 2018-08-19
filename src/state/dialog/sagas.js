import { Keyboard } from 'react-native'
import { call, takeLatest } from 'redux-saga/effects'
import { SHOW_LOCATION_DIALOG } from './constants'

function* showLocationDialog() {
  yield call(Keyboard.dismiss)
}

function* showLocationDialogSaga() {
  yield takeLatest(SHOW_LOCATION_DIALOG, showLocationDialog)
}

export default [showLocationDialogSaga]
