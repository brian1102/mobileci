import moment from 'moment'
import t from '../i18n/i18n'

const getDateTime = timestamp => moment(timestamp)
const yesterday = () => moment().subtract(1, 'days').startOf('day')
const isYesterday = momentDate => momentDate.isSame(yesterday(), 'd')
const isToday = momentDate => momentDate.isSame(moment(), 'd')

const formatNonNull = timestamp => {
  const dateTime = getDateTime(timestamp)
  const prefix = isYesterday(dateTime)
    ? t('job_yesterday')
    : isToday(dateTime) ? t('job_today') : ''
  const formatPrefix = prefix.length === 0 ? 'DD MMM' : ''
  const formattedDate = dateTime.format(`${formatPrefix} hh:mm A`)
  return `${prefix} ${formattedDate}`
}

const formatDate = timestamp => (timestamp ? formatNonNull(timestamp) : null)

export default formatDate
