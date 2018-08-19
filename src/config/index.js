/**
 * Created by: Hau Vo
 *
 * This file will be storing all file configurations in the future
 */

import RNConfig from 'react-native-config'
import { info } from '../utils/logger'

let configInstance = null

const config = () => {
  if (configInstance) return configInstance

  configInstance = {
    ...RNConfig,
    SIGNATURE_IMAGE_DIR: 'SIGN',
    POD_IMAGE_DIR: 'POD',
    GOOGLE_DIRECTIONS_API: 'https://maps.googleapis.com/maps/api/directions',
    GOOGLE_DIRECTIONS_API_WAYPOINT_LIMIT: 23,
    DIFFERENT_UPDATE_USER_LOCATION: 0.2 // 200m different
  }

  info(configInstance)

  return configInstance
}

export default config

export const overrideEndpoint = (
  endpoint,
  chatEnv,
  theme,
  slug,
  shouldShowServiceType
) => {
  if (configInstance) {
    if (endpoint) configInstance.BASE_URL = endpoint
    if (chatEnv) configInstance.CHAT_ENV = chatEnv
    if (theme) configInstance.THEME = theme
    if (slug) configInstance.COMPANY_SLUG = slug
    configInstance.SHOW_SERVICE_TYPE = shouldShowServiceType
  }
}
