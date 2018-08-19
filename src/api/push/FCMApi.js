import { Platform, AsyncStorage } from 'react-native'
import FCM, {
  FCMEvent,
  RemoteNotificationResult,
  WillPresentNotificationResult,
  NotificationType
} from 'react-native-fcm'
import { info } from '../../utils/logger'

const fcmMessagesName = 'fcmMessages'

class FCMApi {
  constructor() {
    this.token = null
    this.messageQueue = []
    this.gotTokenHandler = null
    this.addMessageToQueueHandler = null
    this.processSingleEventHandler = null
    this.processingItem = null
    this.isLoopingQueue = false

    this.prevAddedToQueueItem = null
  }

  setHandler = (
    gotTokenHandler,
    processSingleEventHandler,
    addMessageToQueueHandler
  ) => {
    this.gotTokenHandler = gotTokenHandler
    this.processSingleEventHandler = processSingleEventHandler
    this.addMessageToQueueHandler = addMessageToQueueHandler
  }

  notifiProcessingAnItemDone = () => {
    info('notifiProcessingAnItemDone')
    this.processingItem = null
  }

  requestPermission = async () => {
    const result = await FCM.requestPermissions({
      badge: false,
      sound: true,
      alert: true
    })
    return result
  }

  loop(callback, interval = 1000) {
    setTimeout(() => {
      callback()
      if (this.messageQueue.length > 0) {
        this.loop(callback, interval)
      } else {
        info(
          'stop looping due to this.messageQueue.length = ',
          this.messageQueue.length
        )
        this.isLoopingQueue = false
      }
    }, interval)
  }

  startProcessQueue = () => {
    if (this.isLoopingQueue) return
    info('startProcessQueue')
    this.isLoopingQueue = true
    this.loop(() => {
      if (!this.processingItem) {
        this.processingItem = this.popMessageFromQueue()

        if (this.processSingleEventHandler) {
          info('Looping interval: processing ', this.processingItem)
          this.processSingleEventHandler(this.processingItem)
        }
      } else {
        info('Looping interval: busy')
      }
    })
  }

  listen = () => {
    this.getToken()
    this.registeRefreshTokenListener()
    this.registerAppListener()
    this.checkInitialNotification()
  }

  checkInitialNotification = () => {
    FCM.getInitialNotification().then(notif => {
      if (notif && notif.opened_from_tray && !notif.from) return
      this.pushMessageToQueue(notif)
    })
  }

  getToken = callback => {
    FCM.getFCMToken()
      .then(token => {
        this.updateToken(token)
      })
      .catch(() => {
        if (callback) callback()
      })
  }

  registeRefreshTokenListener = handler => {
    FCM.on(FCMEvent.RefreshToken, token => {
      this.updateToken(token)
      if (handler) handler(token)
    })
  }

  registerAppListener = () => {
    FCM.on(FCMEvent.Notification, notif => {
      if (notif && notif.opened_from_tray && !notif.from) return
      if (
        Platform.OS === 'ios' &&
        // eslint-disable-next-line no-underscore-dangle
        notif._notificationType === NotificationType.WillPresent &&
        !notif.local_notification
      ) {
        // this notification is only to decide if you want to
        // show the notification when user if in forground.
        // usually you can ignore it. just decide to show or not.
        notif.finish(WillPresentNotificationResult.All)
        return
      }

      this.pushMessageToQueue(notif)

      if (Platform.OS === 'ios') {
        switch (notif._notificationType) { // eslint-disable-line no-underscore-dangle
          case NotificationType.Remote:
            notif.finish(RemoteNotificationResult.NewData)
            break
          case NotificationType.NotificationResponse:
            notif.finish()
            break
          case NotificationType.WillPresent:
            notif.finish(WillPresentNotificationResult.All)
            break
          default:
            notif.finish()
        }
      }
    })
  }

  showLocalNotification = (params = {}) => {
    FCM.presentLocalNotification(params)
  }

  scheduleLocalNotification = (params = {}) => {
    FCM.scheduleLocalNotification(params)
  }

  /**
   * Process Token
   */
  updateToken = token => {
    this.token = token
    info('DEVICE TOKEN', token)
    if (this.gotTokenHandler) this.gotTokenHandler(token)
  }

  getCurrentFCMToken = () => this.token

  pushMessageToQueue = noti => {
    info('handling pushMessageToQueue')

    const modified = this.addMessageToQueueHandler
      ? this.addMessageToQueueHandler(noti)
      : noti
    if (!modified) return
    if (this.prevAddedToQueueItem)
      info(
        modified.event_type + modified['google.message_id'],
        modified['google.sent_time'],
        this.prevAddedToQueueItem['google.sent_time'],
        modified['google.sent_time'] -
          this.prevAddedToQueueItem['google.sent_time']
      )
    if (
      this.prevAddedToQueueItem &&
      modified.event_type &&
      modified.event_type === this.prevAddedToQueueItem.event_type &&
      modified['google.sent_time'] - 100 <
        this.prevAddedToQueueItem['google.sent_time']
    ) {
      info('dont add to queue due to duplicated sent from server')
      return
    }
    this.messageQueue.push(modified)
    this.prevAddedToQueueItem = modified
    this.startProcessQueue()
    // this.saveToAsyncStorage() // because FCM messages is not too long, so we save every receive notification
  }

  popMessageFromQueue = () => {
    if (this.messageQueue.length <= 0) return null
    const message = this.messageQueue.shift()
    this.saveToAsyncStorage()
    return message
  }

  saveToAsyncStorage = () => {
    return AsyncStorage.setItem(
      fcmMessagesName,
      JSON.stringify(this.messageQueue)
    )
  }

  syncFromAsyncStorage = (callback, onError) => {
    AsyncStorage.getItem(fcmMessagesName)
      .then(messages => {
        if (messages && messages.length) {
          this.messageQueue = messages
        }
        if (callback) callback(messages)
      })
      .catch(err => {
        this.messageQueue = []
        if (onError) onError(err)
      })
  }

  clearMessageQueue = () => {
    this.messageQueue = []
    AsyncStorage.removeItem(fcmMessagesName)
  }
}

const instance = new FCMApi()
export default instance
