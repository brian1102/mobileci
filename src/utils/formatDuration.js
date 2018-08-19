import identity from 'lodash/fp/identity'

const formatDuration = (duration, labelMapper = identity) => {
  const mins = duration
  if (mins > 60) {
    const hoursRaw = mins / 60
    const hours = Math.round(hoursRaw * 2) / 2
    return { value: hours, label: labelMapper('duration_hours') }
  }
  return {
    value: Math.round(mins * 10) / 10,
    label: labelMapper('duration_subtitle'),
  }
}

export default formatDuration
