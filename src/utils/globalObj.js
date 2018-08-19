import moment from 'moment'
import { isDevelopmentEnable } from './developmentMode'
import Config from '../config'
import { WAIT_FOR_PUSH_EVENT_TIMEOUT } from '../state/constants'

// use singleton object to follow some event instead of using redux storage
class Global {
  constructor() {
    this.justLeaveTheAppByGotoSetting = false
    this.isDevelopmentEnable = false
    this.customEndpoint = null

    this.lastCallRejectApiTime = null
    this.lastCallAcceptApiTime = null
    this.lastCallCompleteApiTime = null
    this.lastCallReportApiTime = null

    this.moment = moment

    this.isNoTaskLeft = false
    this.fetchTaskPage = 0

    this.mainMap = null

    this.checkDevelopmentMode()
  }

  updateMomentLanguage = lang => {
    this.moment.locale(lang)
  }

  getMoment = () => this.moment

  markAsJustLeaveTheAppByGotoSetting = val => {
    this.justLeaveTheAppByGotoSetting = val
  }

  hasJustLeaveTheAppByGotoSetting = () => this.justLeaveTheAppByGotoSetting

  checkDevelopmentMode = async () => {
    if (Config().DEVELOPMENT_MODE === '1') {
      this.isDevelopmentEnable = true
      return
    }
    this.isDevelopmentEnable = await isDevelopmentEnable()
  }
  // TODO rename those functions, naming stuff is not good
  setLastCallRejectApiTime = () =>
    (this.lastCallRejectApiTime = this.getMoment()().unix())
  setLastCallAcceptApiTime = () =>
    (this.lastCallAApiTime = this.getMoment()().unix())
  setLastCallCompleteApiTime = () =>
    (this.lastCallCompleteApiTime = this.getMoment()().unix())
  setLastCallReportApiTime = () =>
    (this.lastCallReportApiTime = this.getMoment()().unix())

  hasJustCalledRejectApi = () =>
    this.lastCallRejectApiTime + WAIT_FOR_PUSH_EVENT_TIMEOUT >=
    this.getMoment()().unix()
  hasJustCalledAcceptApi = () =>
    this.lastCallAApiTime + WAIT_FOR_PUSH_EVENT_TIMEOUT >=
    this.getMoment()().unix()
  hasJustCalledCompleteApi = () =>
    this.lastCallCompleteApiTime + WAIT_FOR_PUSH_EVENT_TIMEOUT >=
    this.getMoment()().unix()
  hasJustCalledReportApi = () =>
    this.lastCallReportApiTime + WAIT_FOR_PUSH_EVENT_TIMEOUT >=
    this.getMoment()().unix()
}

const instance = new Global()
export default instance
