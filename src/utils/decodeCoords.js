import Polyline from '@mapbox/polyline'

export function decodeStep(polyline) {
  const points = Polyline.decode(polyline)
  return points.map(point => {
    return {
      latitude: point[0],
      longitude: point[1],
    }
  })
}

export default function decodeCoords(polylines) {
  const coords = []
  for (let i = 0; i < polylines.length; i++) {
    coords.push(...decodeStep(polylines[i]))
  }
  return coords
}
