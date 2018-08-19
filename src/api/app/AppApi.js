import { Platform } from 'react-native'
import VersionNumber from 'react-native-version-number'
import { httpGet } from '../BaseApi'

const checkBinaryVersion = () =>
  httpGet(`/api/v3/worker/check_for_updates?os=${Platform.OS}&version=${VersionNumber.buildVersion}`, null, true)

const getCompanyException = companyId => httpGet(`api/worker/v2/deliveries/exceptions?id=${companyId}`)

export default {
  checkBinaryVersion,
  getCompanyException
}
