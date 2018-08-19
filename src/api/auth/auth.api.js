import { httpGet } from '../BaseApi'

export const getOtp = phone => httpGet(`/api/v3/public/otp`, { phone }, false)
export const verifyOtp = (phone, otpCode) =>
  httpGet(`/api/v3/public/verify_otp`, { phone, otp_code: otpCode }, false)
