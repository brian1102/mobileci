import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { createThemedComponent } from 'react-native-theming'

const ThemeLinear = createThemedComponent(
  ({ start, end, style, children }) =>
    // eslint-disable-next-line
    <LinearGradient style={style} colors={[start, end]}>
      {children}
    </LinearGradient>,
  ['start', 'end']
)

export default ThemeLinear
