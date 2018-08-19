import { Sentry } from 'react-native-sentry'
import Config from '../../config'

export const setup = () => {
  Sentry.config(Config().SENTRY_LINK, {
    maxMessageLength: 50000
  }).install()
}

export const setUserContext = user => {
  Sentry.setUserContext(user)
}

export const clearContext = () => {
  Sentry.clearContext()
}

export const setAppRelease = release => {
  Sentry.setRelease(release)
}

export const setAppVersion = version => {
  Sentry.setVersion(version)
}

export const captureException = (message, options = {}) => {
  Sentry.captureException(new Error(message), options)
}
