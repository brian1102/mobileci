import { responsiveFontSize } from 'react-native-responsive-dimensions'

const calcFontSize = ratio => Math.round(responsiveFontSize(ratio))

export const types = {
  /**
   * Roboto-Light, etc
   */
}

export const sizes = {
  badge: calcFontSize(0.7),
  marker: calcFontSize(1),
  day: calcFontSize(1.6),
  tab: calcFontSize(1.5),
  tinier: calcFontSize(1.6),
  tiny: calcFontSize(2),
  smaller: calcFontSize(2.2),
  small: calcFontSize(2.3),
  normal: calcFontSize(3),
  medium: calcFontSize(2.5),
  big: calcFontSize(4),
  bigger: calcFontSize(5),
  huge: calcFontSize(8.5),
}
