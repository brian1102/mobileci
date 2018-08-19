import PropTypes from 'prop-types'
import React from 'react'
import { Text, View, ActivityIndicator } from 'react-native'
import Theme from 'react-native-theming'
import Toast from 'react-native-easy-toast'
import ThemeLinear from '../components/ThemeLinear'
import t from '../../../i18n/i18n'
import { colors } from '../../../theme'
import styles from './start.styles'
import connect from '../../../utils/connect'
import { isAppInitialized } from '../../../state/app/selectors'
import { wakeUpDevelopmentMode } from '../../../utils/developmentMode'

const config = {
  pressedCount: 0,
  mToast: null
}

const mapStateToProps = state => ({
  isAppInitialized: isAppInitialized(state)
})

const StartScreen = ({ isAppInitialized }) =>
  <Theme.View style={styles.container}>
    <ThemeLinear start="@gradStart" end="@gradEnd" style={styles.gradient}>
      <Theme.Image
        source={'@logoSplash'}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text
        onPress={() => wakeUpDevelopmentMode(config)}
        style={styles.appName}
      >
        {t('app_name')}
      </Text>
      <View style={styles.content}>
        {!isAppInitialized && <ActivityIndicator color={colors.white} />}
      </View>
      <Toast
        ref={c => {
          config.mToast = c
        }}
      />
    </ThemeLinear>
  </Theme.View>

StartScreen.propTypes = {
  isAppInitialized: PropTypes.bool.isRequired
}

StartScreen.navigationOptions = {
  header: null
}

export default connect(mapStateToProps, null)(StartScreen)
