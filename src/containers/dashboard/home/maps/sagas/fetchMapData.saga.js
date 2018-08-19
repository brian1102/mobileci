import { put, call, takeLatest, select } from 'redux-saga/effects'
import * as t from '../../../../../state/actionsType'
import a from '../../../../../state/actions'
import * as api from '../../../../../api'
import LocationApi from '../../../../../api/location/LocationApi'
import { createMarkers, convertTasksData } from '../../../../../utils/task.util'
import globalObj from '../../../../../utils/globalObj'
import { warn } from '../../../../../utils/logger'

const getTasks = state => state.mapOverview.tasks

function* updateRouteToFirstWayPoint() {
  const curLoc = LocationApi.position
  if (!curLoc) return
  try {
    const tasks = yield select(getTasks)
    if (!tasks || tasks.length < 1) return
    const response = yield call(
      LocationApi.getRoutesForTwoPoints,
      curLoc,
      tasks[0]
    )
    yield put(a[t.UPDATE_ROUTE_TO_FIRST_WAYPOINT_SUCCESS](response))
  } catch (error) {
    warn('updateRouteToFirstWayPoint', error.message)
  }
}

function* fetchMapOverviewData() {
  try {
    const response = yield call(api.getTasksCountAndLatLongForMapOverview)
    if (response.data.length < 1) {
      return yield put(a[t.FETCH_OVERVIEW_MAP_DATA_SUCCESS]())
    }
    const tasks = yield call(convertTasksData, response.data)

    const currentLocation = LocationApi.position
    const regionPoints = tasks.slice()
    if (currentLocation) regionPoints.push(currentLocation)
    const region = yield call(LocationApi.getRegionForCoordinates, regionPoints)
    if (globalObj.mainMap) {
      globalObj.mainMap.animateToRegion(region)
    }

    const markers = yield call(createMarkers, tasks, currentLocation)
    try {
      const response = yield call(LocationApi.getMapData, tasks)
      response.markers = markers
      response.tasks = tasks
      yield put(a[t.FETCH_OVERVIEW_MAP_DATA_SUCCESS](response))
    } catch (error) {
      yield put(a[t.FETCH_OVERVIEW_MAP_DATA_FAILED](error.message))
    }
  } catch (error) {
    yield put(a[t.FETCH_OVERVIEW_MAP_DATA_FAILED](error.message))
  }

  return null
}

function* fetchTasksSaga() {
  yield takeLatest(
    [t.FETCH_OVERVIEW_MAP_DATA, t.FETCH_TASKS_SUCCESS],
    fetchMapOverviewData
  )
  yield takeLatest(
    [t.UPDATE_ROUTE_TO_FIRST_WAYPOINT, t.FETCH_OVERVIEW_MAP_DATA_SUCCESS],
    updateRouteToFirstWayPoint
  )
}

export default fetchTasksSaga
