import moment from 'moment'

const today = moment()
const yesterday = moment().subtract(1, 'd')

const shouldUseFriendlyDay = day => {
  if (today.isSame(day, 'day') || yesterday.isSame(day, 'day')) return true
  return false
}

const getFriendlyDayLabel = day => {
  if (today.isSame(day, 'day')) return 'Today'
  return 'Yesterday'
}

const getDayLabel = day => {
  if (shouldUseFriendlyDay(day)) {
    return `${getFriendlyDayLabel(day)} ${day.format('ddd DD, MMM')}`
  }
  return day.format('ddd DD, MMM')
}

export const buildSectionWithData = (data, itemTimeKey) => {
  if (!data || !data.length) return []
  const sections = []

  let lastDay = moment(new Date(data[0][itemTimeKey]))
  let section = {
    data: [],
    title: getDayLabel(lastDay),
    key: getDayLabel(lastDay),
  }

  for (let i = 0; i < data.length; i += 1) {
    const item = data[i]
    const dayOfItem = moment(new Date(item[itemTimeKey]))

    if (lastDay.isSame(dayOfItem, 'day')) {
      section.data.push(item)
      if (i === data.length - 1) sections.push(section)
    } else {
      if (section) sections.push(section)
      section = {
        data: [item],
        title: getDayLabel(dayOfItem),
        key: getDayLabel(dayOfItem),
      }
    }

    lastDay = dayOfItem
  }
  return sections
}
