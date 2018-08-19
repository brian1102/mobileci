import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  View,
  Platform
} from 'react-native'
import moment from 'moment'
import CardView from 'react-native-cardview'
import { colors, font, images } from '../../../theme'

const ConversationTypes = {
  CONTENT_TYPE_LOCATION: 2,
  CONTENT_TYPE_TEXT_HTML: 3,
  CONTENT_TYPE_PRICE: 4,
  GROUP_TYPE_BROADCAST: 5,
  GROUP_TYPE_BROADCAST_ONE_BY_ONE: 8
}

export default class ChatScreenItem extends Component {
  static propTypes = {
    item: PropTypes.object,
    onPress: PropTypes.func
  }

  isBroadcast = type => {
    return (
      type === ConversationTypes.GROUP_TYPE_BROADCAST ||
      type === ConversationTypes.GROUP_TYPE_BROADCAST_ONE_BY_ONE
    )
  }

  renderMessageContent = () => {
    const { latestMessage } = this.props.item

    // if (contentType === ConversationTypes.CONTENT_TYPE_LOCATION) {
    //   return <Text style={styles.message}>Location</Text>
    // }

    // if (contentType === ConversationTypes.CONTENT_TYPE_TEXT_HTML) {
    //   return <WebView style={styles.webview} source={{ html: message }} />
    // }

    // if (contentType === ConversationTypes.CONTENT_TYPE_PRICE) {
    //   return (
    //     <Text style={styles.message}>{t('final_agreed_price', message)}</Text>
    //   )
    // }
    if (!latestMessage) return null
    let message = latestMessage.message
    if (message && message.length > 40) {
      message = `${message.substring(0, 40)}...`
    }
    return <Text style={styles.message}>{message}</Text>
  }

  renderBadge = () => {
    const { unreadCount } = this.props.item

    if (!unreadCount || unreadCount === 0) return null

    return (
      <View style={styles.badge}>
        <Text style={styles.badgeText}>
          {unreadCount > 9 ? '9+' : unreadCount}
        </Text>
      </View>
    )
  }

  renderPlaceholder = letter => {
    const firstLetter = letter.toLowerCase()
    const backgroundColor = colors.chatPlaceholderBackground[firstLetter]
    const color = colors.chatPlaceholderForeground[firstLetter]
    return (
      <View style={[styles.contactImage, { backgroundColor }]}>
        <Text style={[styles.placeholderText, { color }]}>
          {letter.toUpperCase()}
        </Text>
      </View>
    )
  }

  renderProfileImage = () => {
    const { groupId, displayName, channel } = this.props.item

    if (groupId === null) return this.renderPlaceholder(displayName[0])

    if (this.isBroadcast(channel ? channel.type : 0)) {
      return (
        <Image style={styles.contactImage} source={images.icons.chatBroadcast} />
      )
    }

    return <Image style={styles.contactImage} source={images.icons.chatGroup} />
  }

  render() {
    const { item, onPress } = this.props
    const { latestMessage } = item

    return (
      <TouchableOpacity onPress={onPress}>
        <CardView
          cardElevation={2}
          cardMaxElevation={2}
          cornerRadius={10}
          style={styles.wrapper}
        >
          <View style={styles.container}>
            <View style={styles.contactImageContainer}>
              {this.renderProfileImage()}
              {this.renderBadge()}
            </View>
            <View style={styles.ownerInfo}>
              <View style={styles.top}>
                <Text style={styles.name}>{item.displayName}</Text>
                <Text style={styles.date}>{latestMessage ? moment(latestMessage.createdAtTime).fromNow() : ''}</Text>
              </View>
              <View>{this.renderMessageContent()}</View>
            </View>
          </View>
        </CardView>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'white',
    ...Platform.select({
      ios: {
        marginBottom: 15
      },
      android: {
        marginBottom: 5
      }
    })
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    ...Platform.select({
      ios: {
        height: 70
      },
      android: {
        height: 80,
        paddingBottom: 10
      }
    })
  },
  ownerInfo: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: 20,
    alignSelf: 'stretch'
  },
  contactImageContainer: {
    position: 'relative',
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'center',
    alignSelf: 'stretch'
  },
  contactImage: {
    width: 46,
    height: 46,
    borderRadius: 46 / 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  placeholderText: {
    fontSize: 24
  },
  top: {
    flexDirection: 'row',
    marginBottom: 3
  },
  name: {
    flex: 1,
    fontWeight: 'bold'
  },
  message: {
    color: '#afafaf'
  },
  date: {
    color: '#afafaf',
    fontSize: font.sizes.day
  },
  badge: {
    position: 'absolute',
    top: 0,
    left: -2,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center'
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'transparent'
  }
})
