import moment from 'moment'
import { Alert } from 'react-native'

const VERBOSE = 0
const INFO = 1
const WARNINGS = 2
const ERRORS = 3

const logLevel = VERBOSE

const logIt = (favor, PREFIX, color, ...msg) =>
  favor(
    `%c%s %s >>`,
    `background: #222; color: ${color}`,
    moment().format('HH:mm:ss SSS'),
    PREFIX,
    ...msg
  )

const errorIt = (...msg) => {
  console.error(...msg) // eslint-disable-line no-console
}

/* eslint-disable no-console */
export const log = (...msg) =>
  logLevel <= VERBOSE && logIt(console.log, 'LOG', '#32CD32', ...msg)
export const info = (...msg) =>
  logLevel <= INFO && logIt(console.info, 'INFO', '#ffffff', ...msg)
export const warn = (...msg) =>
  logLevel <= WARNINGS && logIt(console.warn, 'WARNING', '#ccff00', ...msg)
export const error = (...msg) =>
  logLevel <= ERRORS && logIt(errorIt, 'ERROR', '#ff0000', ...msg)

export const NYI = (msg = 'Not yet implemented!') => () => {
  info(msg)
  Alert.alert(msg)
}
