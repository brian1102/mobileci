import checkIfBinaryVersionStillSupportSaga from './sagas/checkIfBinaryVersionStillSupport.saga'
import startUpChain from './sagas/startUpChain.saga'
import permissionCheckSaga from './sagas/permissionCheck.saga'
import checkUserLogged from './sagas/checkUserLogged.saga'
import doOnLoggedSaga from './sagas/doOnLogged.saga'
import fetchCompanyConfiguration from './sagas/fetchCompanyConfiguration.saga'
import initLocationSaga from './sagas/initLocation.saga'
import onAppGotoForeground from './sagas/onAppGotoForeground.saga'

export default [
  startUpChain,
  initLocationSaga,
  checkIfBinaryVersionStillSupportSaga,
  checkUserLogged,
  permissionCheckSaga,
  doOnLoggedSaga,
  fetchCompanyConfiguration,
  onAppGotoForeground
]
