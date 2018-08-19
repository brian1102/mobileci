import { all, fork } from 'redux-saga/effects'
import appSagas from './app/sagas'
import dialogSagas from './dialog/sagas'
import historySagas from '../containers/dashboard/history/sagas'
import languageSagas from './language/sagas'
import locationSagas from './location/sagas'
import registrationSagas from '../containers/havent-logged/auth-flow/sagas/index'
import userSagas from './user/sagas'
import completeJobFlowSaga from './complete-job-flow/sagas'
import taskSagas from '../containers/dashboard/home/tasks/sagas/index'
import chatSagas from './chat/sagas'
import settingSagas from '../containers/dashboard/settings/setLanguage.saga'
import incomingTaskgroupSagas from '../containers/dashboard/home/tasks/components/IncomingTasksModal/sagas'
import statusSagas from '../containers/dashboard/home/status/sagas'
import fcmSagas from './push/sagas'
import profileSaga from '../containers/dashboard/profile/sagas'
import mapOverviewSaga from '../containers/dashboard/home/maps/sagas'

function reduceSagas(sagas) {
  return all(sagas.map(saga => fork(saga)))
}

export default function* root() {
  const sagas = [
    appSagas,
    dialogSagas,
    historySagas,
    languageSagas,
    locationSagas,
    registrationSagas,
    userSagas,
    completeJobFlowSaga,
    taskSagas,
    chatSagas,
    settingSagas,
    incomingTaskgroupSagas,
    statusSagas,
    fcmSagas,
    profileSaga,
    mapOverviewSaga
  ]
  const reducedSagas = sagas.map(reduceSagas)
  yield all(reducedSagas)
}
