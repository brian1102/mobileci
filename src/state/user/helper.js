import { images } from '../../theme'

export const mapDeliveryTypeToString = deliveryType =>
  Object.keys(images.deliveryIcons)[deliveryType]
export const mapStringToDeliveryType = deliveryType =>
  Object.keys(images.deliveryIcons).indexOf(deliveryType)
