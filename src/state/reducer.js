import { combineReducers } from 'redux'

import app from './app'
import dialog from './dialog'
import history from '../containers/dashboard/history/history.reducer'
import language from './language'
import location from './location/reducer.js'
import navigation from './navigation'
import overlay from './overlay'
import auth from '../containers/havent-logged/auth-flow/auth.reducer'
import user from './user'
import chat from './chat'
import apiObserver from './api-observer'
import completeJobFlow from './complete-job-flow'
import task from '../containers/dashboard/home/tasks/reducer'
import settings from '../containers/dashboard/settings/setting.reducer'
import incomingTasks from '../containers/dashboard/home/tasks/components/IncomingTasksModal/IncomingTask.reducer'
import dailyStatus from '../containers/dashboard/home/status/StatusReducer'
import mapOverview from '../containers/dashboard/home/maps/MapReducer';
import profile from '../containers/dashboard/profile/profile.reducer'

export default combineReducers({
  app,
  dialog,
  history,
  language,
  location,
  navigation,
  overlay,
  auth,
  chat,
  user,
  apiObserver,
  completeJobFlow,
  task,
  settings,
  incomingTasks,
  dailyStatus,
  profile,
  mapOverview
})
