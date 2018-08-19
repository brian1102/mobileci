/**
 * We will use singleton LocationAPI object for
 * processing Location in all
 */
import Polyline from '@mapbox/polyline'
import { httpPut, httpGet } from '../BaseApi'
import t from '../../i18n/i18n'
import requestLocation from '../../permissions/index'
import Config from '../../config'

class LocationApi {
  constructor() {
    this.watchID = null
    this.position = null
  }

  requestNewLocation = async () => {
    if (!await requestLocation()) {
      return Promise.reject(Error(t('permission_denied_to_location_service')))
    }
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line
      navigator.geolocation.getCurrentPosition(
        position => {
          const { coords } = position
          this.setCurrentLocation(coords)
          resolve(coords)
        },
        error => reject(JSON.stringify(error)),
        { enableHighAccuracy: false, timeout: 5000, maximumAge: 0 }
      )
    })
  }

  watchLocation = (callback, once = false, willUpdateProp = false) => {
    if (this.watchID && once) {
      this.stopLocationWatch()
    }
    // eslint-disable-next-line
    this.watchID = navigator.geolocation.watchPosition(position => {
      const { coords } = position
      if (willUpdateProp) this.setCurrentLocation(coords)
      callback(coords)
    })
  }

  stopLocationWatch = () => {
    if (this.watchID) {
      // eslint-disable-next-line
      navigator.geolocation.clearWatch(this.watchID)
    }

    this.watchID = null
  }

  setCurrentLocation = position => {
    this.position = position
  }

  getCurrentPosition = (refresh = false) => {
    if (this.position && !refresh) Promise.resolve(this.position)
    return this.requestNewLocation()
  }

  updateLocation = coords => {
    return httpPut('/api/v3/worker/location', {
      lat: coords.latitude,
      lng: coords.longitude
    })
  }

  getDistance = (src, dst) => {
    if (!src || !dst) return -1
    const lat1 = src.latitude
    const lon1 = src.longitude
    const lat2 = dst.latitude
    const lon2 = dst.longitude
    const R = 6371 // Radius of the earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180 // deg2rad below
    const dLon = (lon2 - lon1) * Math.PI / 180
    const a =
      0.5 -
      Math.cos(dLat) / 2 +
      Math.cos(lat1 * Math.PI / 180) *
      Math.cos(lat2 * Math.PI / 180) *
      (1 - Math.cos(dLon)) /
      2

    return R * 2 * Math.asin(Math.sqrt(a))
  }

  getDirection = async (pointA, pointB) => {
    const origin = this.formatCoords(pointA)
    const destination = this.formatCoords(pointB)

    const response = await this.getGoogleDirection(origin, destination)

    if (response.routes && response.routes.length > 0) {
      const leg = response.routes[0].legs[0]
      const steps = this.decodeStep(response.routes[0].overview_polyline.points);
      const data = {
        distance: leg.distance,
        duration: leg.duration,
        steps
      }
      return data
    }
    return null
  }

  getRoutesForTwoPoints = async (pointA, pointB) => {
    const origin = this.formatCoords(pointA)
    const destination = this.formatCoords(pointB)

    const response = await this.getGoogleDirection(origin, destination)

    if (response.routes && response.routes.length > 0) {
      const leg = response.routes[0].legs[0]
      const steps = this.decodeStep(response.routes[0].overview_polyline.points);
      const data = {
        distance: leg.distance.value,
        duration: leg.duration.value,
        steps
      }
      return data
    }
    return null
  }

  getDirectionWithWayPoints = async (pointA, pointB, taskWaypoints) => {
    const origin = this.formatCoords(pointA)
    const destination = this.formatCoords(pointB)

    let limitTaskWaypoints = []

    taskWaypoints.forEach(taskWay => {
      const isExisted =
        limitTaskWaypoints.indexOf(
          ele =>
            (ele.latitude === taskWay.latitude &&
              ele.longitude === taskWay.longitude) ||
            ele.address === taskWay.address
        ) >= 0
      if (!isExisted) limitTaskWaypoints.push(taskWay)
    })

    if (
      limitTaskWaypoints.length > Config().GOOGLE_DIRECTIONS_API_WAYPOINT_LIMIT
    ) {
      /**
       * As discussed at here: https://yojeee.atlassian.net/browse/MT-234
       * We need to cut the waypoints although it can make confuse
       */
      limitTaskWaypoints = limitTaskWaypoints.slice(
        0,
        Config().GOOGLE_DIRECTIONS_API_WAYPOINT_LIMIT
      )
    }
    const waypoints = limitTaskWaypoints
      .map(t => this.formatCoords(t))
      .join('|')

    const response = await this.getGoogleDirectionWithWaypoints(
      origin,
      destination,
      waypoints
    )

    const directions = {
      distance: { value: 0 },
      duration: { value: 0 },
      steps: []
    }

    if (response.routes && response.routes.length > 0) {
      const bestRoute = response.routes[0]
      directions.steps = this.decodeStep(bestRoute.overview_polyline.points)
      bestRoute.legs.forEach(leg => {
        directions.distance.value += leg.distance.value
        directions.duration.value += leg.duration.value
      })
      return directions
    }
    return null
  }

  getGoogleDirection = (origin, destination) => {
    return httpGet(
      `/json?key=${Config()
        .GOOGLE_DIRECTION_KEY}&origin=${origin}&destination=${destination}`,
      null,
      true,
      Config().GOOGLE_DIRECTIONS_API
    )
  }

  getGoogleDirectionWithWaypoints = (origin, destination, waypoints) => {
    return httpGet(
      `/json?key=${Config()
        .GOOGLE_DIRECTION_KEY}&origin=${origin}&destination=${destination}&waypoints=${waypoints}`, // eslint-disable-line max-len
      null,
      true,
      Config().GOOGLE_DIRECTIONS_API
    )
  }

  getRegionForCoordinates = (points, padding = 1.4) => {
    const defaultRegion = {
      latitude: 1.356739,
      longitude: 103.847472,
      latitudeDelta: padding,
      longitudeDelta: padding
    }

    if (!points || points.size === 0) {
      return defaultRegion
    }

    // eslint-disable-next-line
    if (points.length === 1) padding = 0.1

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
      this.isInvalidNumber(minX) ||
      this.isInvalidNumber(maxX) ||
      this.isInvalidNumber(minY) ||
      this.isInvalidNumber(maxY)
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
      latitudeDelta: (this.isInvalidNumber(deltaX) ? 1 : deltaX) * padding,
      longitudeDelta: (this.isInvalidNumber(deltaY) ? 1 : deltaY) * padding
    }

    return result
  }

  formatCoords = ({ latitude, longitude }) => {
    return `${latitude},${longitude}`
  }

  decodeStep = polyline => {
    const points = Polyline.decode(polyline)
    return points.map(point => {
      return {
        latitude: point[0],
        longitude: point[1]
      }
    })
  }

  decodeCoords = polylines => {
    const coords = []
    for (let i = 0; i < polylines.length; i++) {
      coords.push(...this.decodeStep(polylines[i]))
    }
    return coords
  }

  isInvalidNumber = n => n === 0 || !isFinite(n) || isNaN(n)

  toRad = number => number * Math.PI / 180

  getDistanceText = (meter, precision = 1) => {
    if (meter < 1000) return `${meter} m`
    const factor = Math.pow(10, precision) // eslint-disable-line no-restricted-properties
    const roundedMeter = Math.round(meter * factor / 1000) / factor
    return `${roundedMeter} km`
  }

  hasFoundCurrentLocation = location =>
    location.latitude !== 0 && location.longitude !== 0

  getMapData = async (taskWaypoints) => {
    const origin = this.formatCoords(taskWaypoints[0])
    const destination = this.formatCoords(taskWaypoints[taskWaypoints.length - 1])

    const limitTaskWaypoints = []
    taskWaypoints.forEach(taskWay => {
      const isExisted = limitTaskWaypoints.indexOf(ele =>
        (ele.latitude === taskWay.latitude && ele.longitude === taskWay.longitude)
        || ele.address === taskWay.address
      ) >= 0
      if (limitTaskWaypoints.length < Config().GOOGLE_DIRECTIONS_API_WAYPOINT_LIMIT) {
        if (!isExisted) limitTaskWaypoints.push(taskWay)
      }
    })

    const waypoints = limitTaskWaypoints
      .map(t => this.formatCoords(t))
      .join('|')

    const response = await this.getGoogleDirectionWithWaypoints(
      origin,
      destination,
      waypoints
    )

    const directions = {
      distance: 0,
      duration: 0,
      steps: []
    }

    if (response.routes && response.routes.length > 0) {
      const bestRoute = response.routes[0];
      directions.steps = this.decodeStep(bestRoute.overview_polyline.points);
      bestRoute.legs.forEach(leg => {
        directions.distance += leg.distance.value
        directions.duration += leg.duration.value
      })
    }
    return directions
  }
}

// use singleton pattern to keep one location requestor for all whole app
const instance = new LocationApi()
export default instance
