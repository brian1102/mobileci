import { put, takeLatest, call, select } from 'redux-saga/effects'
import a from '../../../state/actions'
import * as t from '../../../state/actionsType'
import * as c from '../../../state/constants'
import * as s from '../../../state/selectors'
import * as api from '../../../api/index'

const reorderCompanyRules = (original, companyID) => {
  const orderedRules = {}
  if (original.pickup) {
    orderedRules.pickup = []
    const tmp = []
    original.pickup.forEach(rule => {
      // TODO: remove that compare, just temporary fix to remove the weird data
      if (rule.company_id === companyID)
        if (rule.action !== c.EXTRA_ACTION_UPLOAD_SIGNATURE)
          orderedRules.pickup.push(rule)
        else tmp.push(rule)
    })
    orderedRules.pickup = [...orderedRules.pickup, ...tmp]
  }
  if (original.dropoff) {
    orderedRules.dropoff = []
    const tmp = []
    original.dropoff.forEach(rule => {
      // TODO: remove that compare, just temporary fix to remove the weird data
      if (rule.company_id === companyID)
        if (rule.action !== c.EXTRA_ACTION_UPLOAD_SIGNATURE)
          orderedRules.dropoff.push(rule)
        else tmp.push(rule)
    })
    orderedRules.dropoff = [...orderedRules.dropoff, ...tmp]
  }

  return orderedRules
}

function* fetchCompanyExceptionsFlow() {
  try {
    const res = yield call(api.getCompanyConfig)
    const companyID = yield select(s.getCompanyId)
    res.data.rules = reorderCompanyRules(res.data.rules, companyID)
    const userVehicles = yield select(s.getVehicleList)
    res.data.forceVehicleSelection = userVehicles.length > 0

    yield put(a[t.GET_COMPANY_CONFIGURATION_SUCCESS](res.data))
  } catch (error) {
    yield put(a[t.GET_COMPANY_CONFIGURATION_FAILED](error.message))
  }
}

export default function* fetchCompanyExceptionsSaga() {
  yield takeLatest(
    t.GET_COMPANY_CONFIGURATION_REQUEST,
    fetchCompanyExceptionsFlow
  )
}
