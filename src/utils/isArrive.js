import geolib from 'geolib'

export const isArrive = (myLocation, legLocation) => {
  const meters = geolib.getDistance(myLocation, legLocation)
  const foots = geolib.convertUnit('ft', meters, 0)
  return foots <= 250
}
