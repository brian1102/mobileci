import getOtp from './getOtp.saga'
import loginChain from './loginChain.saga'
import verifyOtp from './verifyOtp.saga'
import saveAccessToken from './saveAccessToken.sagas'
import getYojeeChildCompanySlug from './getYojeeChildCompanySlug.saga'

export default [
  getOtp,
  loginChain,
  verifyOtp,
  saveAccessToken,
  getYojeeChildCompanySlug
]
