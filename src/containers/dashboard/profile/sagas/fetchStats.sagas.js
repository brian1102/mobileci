import { put, call, takeLatest } from 'redux-saga/effects'
import moment from 'moment'
import * as t from '../../../../state/actionsType'
import a from '../../../../state/actions'
import * as api from '../../../../api'
import * as c from '../../../../state/constants'

// eslint-disable-next-line no-unused-vars
function addEmptySlotToTodayData(today) {
  const todayData = []
  todayData.push(today)
  for (let i = 1; i <= 6; i++) {
    todayData.push({
      income: 0,
      tasks: {
        failed: 0,
        accepted: 0,
        completed: 0
      },
      date: moment(today.date, 'YYYY-MM-DD').add(i, 'days').format('YYYY-MM-DD')
    })
  }
  return todayData
}

function* fetchStatsFlow() {
  try {
    const { data: today } = yield call(api.getStatistics, c.STAT_TODAY)
    const { data: last_week } = yield call(api.getStatistics, c.STAT_LAST_WEEK)
    const { data: last_four_weeks } = yield call(api.getStatistics, c.STAT_LAST_FOUR_WEEKS)
    yield put(
      a[t.FETCH_PROFILE_STATS_SUCCESS]({
        today: [today[0]],
        last_week,
        last_four_weeks
      })
    )
  } catch (error) {
    yield put(a[t.FETCH_PROFILE_STATS_FAILED](error.message))
  }
}

function* fetchStatsSaga() {
  yield takeLatest(t.FETCH_PROFILE_STATS, fetchStatsFlow)
}

export default fetchStatsSaga
