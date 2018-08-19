import PropTypes from 'prop-types'
import React from 'react'
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native'
import RoundedButton from '../rounded-button/index'
import t from '../../i18n/i18n'
import { colors, images } from '../../theme'

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  noJobsContainer: {
    backgroundColor: colors.black,
  },
  noJobsLabel: {
    alignSelf: 'stretch',
    color: colors.brand,
    textAlign: 'center',
    marginBottom: 32,
    backgroundColor: colors.transparent,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    width,
    height,
  },
  progress: {
    backgroundColor: colors.progressBackground,
    width: 200,
    height: 3,
  },
})

const EmptyList = ({
  action,
  children,
  list,
  title,
  isLoading,
  isFailed,
  failedTitle,
}) => {
  return isLoading
    ? <View style={styles.container}>
      <Image
        source={images.backgroundEmpty}
        resizeMode="stretch"
        style={styles.background}
      />
      <ActivityIndicator />
    </View>
    : list === null || list.length === 0 || isFailed
      ? <View style={[styles.container, styles.noJobsContainer]}>
        <Image
          source={images.backgroundEmpty}
          resizeMode="stretch"
          style={styles.background}
        />
        <Text style={styles.noJobsLabel} numberOfLines={1}>
          {isFailed ? failedTitle : title}
        </Text>
        {action &&
          <RoundedButton
            title={t('no_job_available_reload')}
            onPress={action}
            color={colors.brand}
            highlightColor={colors.brand}
            highlightTitleColor={colors.background}
          />}
      </View>
      : <View style={styles.container}>{children}</View>
}

EmptyList.propTypes = {
  action: PropTypes.func,
  children: PropTypes.node.isRequired,
  list: PropTypes.array,
  title: PropTypes.string.isRequired,
  failedTitle: PropTypes.string,
  isLoading: PropTypes.bool,
  isFailed: PropTypes.bool,
}

EmptyList.defaultProps = {
  action: null,
  list: null,
  failedTitle: 'Fetch data failed',
  isLoading: false,
  isFailed: false,
}

export default EmptyList
