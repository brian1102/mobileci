const padding = 1.77
const defaultRegion = {
  latitude: 1.356739,
  longitude: 103.847472,
  latitudeDelta: padding,
  longitudeDelta: padding,
}

const isInvalidNumber = n => n === 0 || !isFinite(n) || isNaN(n)

const getRegionForCoordinates = points => {
  if (!points || points.size === 0) {
    return defaultRegion
  }

  let minX = Number.POSITIVE_INFINITY
  let maxX = Number.NEGATIVE_INFINITY
  let minY = Number.POSITIVE_INFINITY
  let maxY = Number.NEGATIVE_INFINITY

  // calculate rect
  points
    .filter(point => point && point.latitude && point.longitude)
    .forEach(point => {
      minX = Math.min(minX, point.latitude)
      maxX = Math.max(maxX, point.latitude)
      minY = Math.min(minY, point.longitude)
      maxY = Math.max(maxY, point.longitude)
    })

  if (
    isInvalidNumber(minX) ||
    isInvalidNumber(maxX) ||
    isInvalidNumber(minY) ||
    isInvalidNumber(maxY)
  ) {
    return defaultRegion
  }

  const midX = (minX + maxX) / 2
  const midY = (minY + maxY) / 2
  const deltaX = maxX - minX
  const deltaY = maxY - minY

  const result = {
    latitude: midX,
    longitude: midY,
    latitudeDelta: (isInvalidNumber(deltaX) ? 1 : deltaX) * padding,
    longitudeDelta: (isInvalidNumber(deltaY) ? 1 : deltaY) * padding,
  }

  return result
}

export default getRegionForCoordinates
