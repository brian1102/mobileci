import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  RefreshControl,
  ActivityIndicator as RNActivityIndicator
} from 'react-native'
import { createThemedComponent } from 'react-native-theming'
import { font } from '../../theme'
import tr from '../../i18n'

const ActivityIndicator = createThemedComponent(RNActivityIndicator, ['color'])

export default class EmptyContainer extends Component {
  static propTypes = {
    isEmpty: PropTypes.bool,
    image: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
    imageProps: PropTypes.object,
    title: PropTypes.string,
    titleProps: PropTypes.object,
    subtitle: PropTypes.string,
    subtitleProps: PropTypes.object,
    allowPullToRefresh: PropTypes.bool,
    refreshing: PropTypes.bool,
    onRefreshData: PropTypes.func,
    containerStyle: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.object,
      PropTypes.array
    ]),
    loading: PropTypes.bool,
    children: PropTypes.any,
    offline: PropTypes.bool,
    offlineText: PropTypes.string,
    offlineBackgroundColor: PropTypes.string
  }

  static defaultProps = {
    imageProps: {},
    titleProps: {},
    subtitleProps: {},
    allowPullToRefresh: false,
    refreshing: false,
    loading: false,
    offline: false,
    offlineText: tr('offline_message')
  }

  render() {
    const {
      isEmpty,
      image,
      imageProps,
      title,
      titleProps,
      subtitle,
      subtitleProps,
      allowPullToRefresh,
      refreshing,
      onRefreshData,
      containerStyle,
      loading,
      offline,
      offlineText,
      offlineBackgroundColor
    } = this.props

    if (offline) {
      return (
        <View
          style={[
            styles.container,
            { backgroundColor: offlineBackgroundColor, alignSelf: 'stretch' }
          ]}
        >
          <Text style={styles.offlineText}>{offlineText}</Text>
        </View>
      )
    }

    if (loading)
      return (
        <View style={styles.container}>
          <ActivityIndicator size="small" color={'@brand'} />
        </View>
      )

    if (!isEmpty) return this.props.children

    const containerProps = {
      keyboardShouldPersistTaps: 'always',
      contentContainerStyle: [styles.container, containerStyle]
    }

    if (allowPullToRefresh) {
      containerProps.refreshControl = (
        <RefreshControl refreshing={refreshing} onRefresh={onRefreshData} />
      )
    }

    return (
      <ScrollView {...containerProps}>
        {image && <Image source={image} style={styles.image} {...imageProps} />}
        {title && <Text style={styles.title} {...titleProps}>{title}</Text>}
        {subtitle &&
          <Text style={styles.subtitle} {...subtitleProps}>{subtitle}</Text>}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  offlineContainer: {
    flex: 1
  },
  image: {
    width: 64,
    height: 64,
    resizeMode: 'contain',
    marginBottom: 20
  },
  title: {
    fontSize: font.sizes.medium,
    textAlign: 'center',
    marginBottom: 5,
    color: '#c8c8c8',
    fontWeight: 'bold'
  },
  subtitle: {
    color: '#c8c8c8',
    textAlign: 'center'
  },
  offlineText: {
    textAlign: 'center',
    paddingHorizontal: 60,
    color: '#999'
  }
})
