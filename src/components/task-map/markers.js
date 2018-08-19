import React from 'react'
import PreviewMarker from './PreviewMarker'
import DetailMarker from './DetailMarker'
import WorkerMarker from './WorkerMarker'

const isInt = n => Number(n) === n && n % 1 === 0
const isFloat = n => Number(n) === n && n % 1 !== 0
const parse = n => {
  if (isInt(n) || isFloat(n)) return n
  const result = parseFloat(n)
  if (isNaN(result) || !isFinite(n)) {
    return null
  }
  return result
}

const fix = coordinates => {
  if (!coordinates || !coordinates.latitude || !coordinates.longitude) {
    return null
  }

  const { latitude, longitude } = coordinates
  const lat = parse(latitude)
  const lng = parse(longitude)

  if (!lat || !lng) {
    return null
  }

  return { latitude: lat, longitude: lng }
}

export const getWorkerMarker = coordinate => {
  if (!coordinate) return null
  return <WorkerMarker key={'worker-marker'} coordinate={fix(coordinate)} />
}

export const getPreviewMarker = task => {
  if (!task) return null
  const coordinate = fix(task)
  if (!coordinate) return null
  return <PreviewMarker key={task.id.toString()} task={task} coordinate={coordinate} />
}

export const getDetailMarker = (coord, detail) => {
  const coordinate = fix(coord)
  return <DetailMarker key={'detail-marker'} detail={detail} coordinate={coordinate} />
}
