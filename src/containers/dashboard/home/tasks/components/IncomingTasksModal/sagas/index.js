import fetchIncomingTaskgroup from './fetchIncomingTaskgroup.sagas'
import acceptTaskgroupSagas from './acceptTaskgroup.sagas'
import rejectTaskgroup from './rejectTaskgroup.sagas'

export default [fetchIncomingTaskgroup, acceptTaskgroupSagas, rejectTaskgroup]
