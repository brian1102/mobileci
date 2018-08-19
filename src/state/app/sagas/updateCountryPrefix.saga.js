import { call, put, select, takeLatest } from 'redux-saga/effects'
import LocationApi from '../../../api/location/index'
import { data } from '../../../theme'
import { getCountryPrefix } from '../../auth/selectors'
import { isNetworkConnected } from '../selectors'
import { UPDATE_LOCATION_LOCALLY } from '../../location/constants'
import a from '../../../state/actions'
import * as t from '../../../state/actionsType'

function* updateCountryPrefixFlow(action) {
  const isConnected = yield select(isNetworkConnected)
  if (!isConnected) return
  const coords = action.payload
  const result = yield call(
    LocationApi.getCountry,
    coords.latitude,
    coords.longitude
  )

  if (result && result.length > 0) {
    const countryCode = result[0].countryCode
    const country = data.countries.countries.find(c => c.iso === countryCode)
    const countryPrefix = yield select(getCountryPrefix)

    if (!countryPrefix) {
      yield put(a[t.UPDATE_COUNTRY_NAME](country.cn))
      yield put(a[t.UPDATE_COUNTRY_PREFIX](country.ic))
    }
  }
}

export default function* updateCountryPrefixSaga() {
  yield takeLatest(UPDATE_LOCATION_LOCALLY, updateCountryPrefixFlow)
}
