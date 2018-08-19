import logRequest from './logRequest.sagas'
import checkingConditionChain from './checkingConditionChain.saga'
import saveImageToDisk from './saveImageToDisk.saga'
import removeImageFromDisk from './removeImageFromDisk.saga'
import syncDeamon from './syncDeamon.saga'
import syncTaskComplete from './syncTaskComplete.sagas'
import syncUploadImageOfClientSignature from './syncUploadImageOfClientSignature.sagas'
import syncUploadImageAsProofOfDelivery from './syncUploadImageAsProofOfDelivery.sagas'
import syncReportTask from './syncReportTask.sagas'

export default [
  logRequest,
  checkingConditionChain,
  saveImageToDisk,
  removeImageFromDisk,
  syncDeamon,
  syncTaskComplete,
  syncUploadImageOfClientSignature,
  syncUploadImageAsProofOfDelivery,
  syncReportTask
]
