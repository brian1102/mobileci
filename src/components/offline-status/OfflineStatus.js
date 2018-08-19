import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native'
import PropTypes from 'prop-types'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import tr from '../../i18n/i18n'
import RoundedButton from '../rounded-button/RoundedButton'
import { colors } from '../../theme/index'

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    width,
    paddingVertical: 5,
    paddingHorizontal: 10,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FD7461',
  },
  content: {
    maxWidth: width * 0.8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    paddingHorizontal: 15,
  },
  progress: {
    width,
    backgroundColor: 'white',
  },
})

const OfflineStatus = ({
  isLoading,
  isOnline,
  onPressRetry,
  showTryButton,
}) => {
  if (!isOnline) {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Icon name="ios-information-circle-outline" color="white" size={25} />
          <Text style={styles.title}>{tr('offline_mode_on')}</Text>
        </View>
      </View>
    )
  }

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color="white" />
        <Text
          style={[
            styles.title,
            { textAlign: 'center', alignItems: 'stretch', marginBottom: 5 },
          ]}
        >
          {tr('sync_offline')}
        </Text>
      </View>
    )
  }

  if (!showTryButton) return null

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Icon name="ios-information-circle-outline" color="white" size={25} />
        <Text style={styles.title}>{tr('sync_error_notice')}</Text>
      </View>
      <RoundedButton
        scale={0.5}
        title={tr('retry_sync')}
        onPress={onPressRetry}
        color={'#fff'}
        highlightColor={'#e1e1e1'}
        highlightTitleColor={colors.title}
      />
    </View>
  )
}

OfflineStatus.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isOnline: PropTypes.bool.isRequired,
  onPressRetry: PropTypes.func,
  showTryButton: PropTypes.bool,
}

export default OfflineStatus
