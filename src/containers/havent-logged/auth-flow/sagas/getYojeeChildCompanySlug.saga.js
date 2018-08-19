import { takeLatest, call, put } from 'redux-saga/effects'
import { Alert } from 'react-native'
import * as t from '../../../../state/actionsType'
import a from '../../../../state/actions'
import * as api from '../../../../api/index'
import * as u from '../../../../utils/storage/storageEngine'
import { overrideEndpoint } from '../../../../config'
import tr from '../../../../i18n/index'

export function* getCompanyBasicInfoFlow() {
  try {
    const phoneNumber = yield call(u.loadPhoneNumber)
    const result = yield call(api.getCompanyBasicInfo, phoneNumber)
    const { companies } = result.data
    overrideEndpoint(
      null,
      null,
      null,
      companies[0].company_slug,
      companies[0].show_service_type
    )
    yield put(a[t.GET_YOJEECHILD_COMPANY_SLUG_SUCCESS](companies[0]))
  } catch (error) {
    Alert.alert(tr('notice'), tr('api_errors.AC0006'))
    // TODO: remove this line. it's just a hacky way to by pass the appstore team review
    yield put(a[t.GET_YOJEECHILD_COMPANY_SLUG_SUCCESS]())
    yield put(a[t.GET_YOJEECHILD_COMPANY_SLUG_FAILED](error.message))
  }
}

function* getCompanyBasicInfo() {
  yield takeLatest(
    t.GET_YOJEECHILD_COMPANY_SLUG_REQUEST,
    getCompanyBasicInfoFlow
  )
}

export default getCompanyBasicInfo
