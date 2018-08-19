import moment from 'moment'

export const ago = date => {
  if (!date) return ''
  return convertFromUtc(date).fromNow()
}

export const format = (date, format = 'DD MMM, h:mm a') => {
  if (!date) return ''
  return convertFromUtc(date).format(format)
}

export const formatDateBasedOnDeviceTimezone = (date, format = 'DD MMM, h:mm a') => {
  if (!date) return ''
  return moment(date).format(format)
}

export const convertFromUtc = utcString => {
  const utcMoment = moment(utcString)

  const timedifference = new Date().getTimezoneOffset()

  const localMoment = utcMoment.add(-timedifference, 'm')
  return localMoment
}

export const convertToUtc = localMoment => {
  return localMoment ? localMoment.utc() : moment.utc()
}
