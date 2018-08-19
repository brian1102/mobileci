import { Alert } from 'react-native'
import { call, put, select, takeLatest } from 'redux-saga/effects'
import t from '../../i18n/i18n'
import { updateUserInfo } from './actions'
import { getUserInfo } from './selectors'
import { CHANGE_DELIVERY_TYPE, CHANGE_STATUS } from './constants'
import * as api from '../../api'
import getUserInfoSaga from './sagas/getUserInfo.saga'

function* changeDeliveryType(action) {
  const deliveryType = action.payload
  const userInfo = yield select(getUserInfo)

  if (userInfo.delivery_type === deliveryType) return

  const response = yield call(api.changeDeliveryType, deliveryType)
  if (!response.ok) {
    throw new Error(response.error)
  }

  yield put(updateUserInfo({ ...userInfo, delivery_type: deliveryType }))
}
function* changeStatus(action) {
  const status = action.payload

  const response = yield call(api.changeStatus, status)
  if (!response.ok) {
    if (response.code === 406) {
      Alert.alert(t('alert_error_title'), t('alert_in_delivery'), [
        { text: t('alert_button_ok') },
      ])
    }
    throw new Error(response.error)
  }

  const userInfo = yield select(getUserInfo)
  yield put(updateUserInfo({ ...userInfo, status }))
}

function* changeDeliveryTypeSaga() {
  yield takeLatest(CHANGE_DELIVERY_TYPE, changeDeliveryType)
}

function* changeStatusSaga() {
  yield takeLatest(CHANGE_STATUS, changeStatus)
}

export default [
  changeDeliveryTypeSaga,
  changeStatusSaga,
  getUserInfoSaga,
]
