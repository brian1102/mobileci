import { httpGet, httpPut, getHeaders } from '../BaseApi'

export const changeDeliveryType = delivery =>
  httpPut('deliverytype', { delivery })

export const changeStatus = status => {
  return httpPut('/api/v3/worker/update', { status }, true)
}
export const getUserInfo = () => httpGet('/api/v3/worker/info')
export const uploadAvatar = photo => {
  const headers = getHeaders(true)
  headers['Content-Type'] = 'multipart/form-data'
  // eslint-disable-next-line
  const data = new FormData()
  data.append('avatar', {
    uri: photo.uri,
    type: 'image/jpeg',
    name: photo.fileName
  })
  return httpPut('/api/v3/worker/update', data, true, null, headers)
}

export const getDailyStatus = () =>
  httpGet('/api/v3/worker/statistics?range=today', null, true)

export const getStatistics = type =>
  httpGet(`/api/v3/worker/statistics?range=${type}`, null, true)

export const getCompanyConfig = () => httpGet('/api/v3/worker/companies/config')

export const registerFcmDevice = token =>
  httpPut(`/api/v3/worker/store_device_token?device_token=${token}`)

export const registerVehicleType = vehicleTypeId =>
  httpPut(`/api/v3/worker/vehicles/${vehicleTypeId}/select`)

export const getCompanyBasicInfo = phone =>
  httpGet(
    `/api/v3/worker/companies`,
    { phone },
    true,
    undefined,
    undefined,
    true
  )
