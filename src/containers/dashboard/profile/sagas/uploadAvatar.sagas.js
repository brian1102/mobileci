import { Alert } from 'react-native'
import { put, call, takeLatest } from 'redux-saga/effects'
import * as t from '../../../../state/actionsType'
import a from '../../../../state/actions'
import * as api from '../../../../api'
import { resizeImageFromPath } from '../../../../utils/storage/resizeImage'

function* uploadAvatar(action) {
  try {
    const photo = action.payload
    const resized = yield call(resizeImageFromPath, photo.uri, 100, 100)
    const res = yield call(api.uploadAvatar, resized)
    if (res && res.data) {
      yield put(a[t.UPLOAD_PROFILE_AVATAR_SUCCESS](res.data.avatar))
    }
  } catch (error) {
    Alert.alert(error.message)
    yield put(a[t.UPLOAD_PROFILE_AVATAR_FAILED](error.message))
  }
}

function* uploadProfileAvatarSaga() {
  yield takeLatest(t.UPLOAD_PROFILE_AVATAR, uploadAvatar)
}

export default uploadProfileAvatarSaga
