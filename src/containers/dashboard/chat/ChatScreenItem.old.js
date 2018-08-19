import moment from 'moment'
import PropTypes from 'prop-types'
import React from 'react'
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  WebView,
} from 'react-native'
import t from 'src/i18n'
import { colors, images } from 'src/theme'

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingBottom: 8,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 8,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderBottomColor: colors.gray,
  },
  profileImage: {
    width: 46,
    height: 46,
  },
  alphabeticImage: {
    width: 46,
    height: 46,
    borderRadius: 46 / 2,
    backgroundColor: 'red',
    position: 'absolute',
    left: 0,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alphabeticText: {
    fontSize: 24,
  },
  contactImage: {
    width: 46,
    height: 46,
    borderRadius: 46 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameTimeContainer: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 12,
  },
  smsReceivers: {
    flex: 1,
    fontSize: 16,
  },
  date: {
    fontSize: 8,
    paddingTop: 8,
  },
  column: {
    flexDirection: 'column',
    flex: 1,
  },
  messageUnread: {
    flexDirection: 'row',
    marginLeft: 12,
  },
  attachmentIcon: {
    width: 24,
    height: 24,
    marginRight: 2,
  },
  message: {
    flex: 1,
    paddingTop: 4,
    paddingBottom: 4,
    fontSize: 12,
  },
  webview: {
    flex: 1,
    paddingTop: 4,
    paddingBottom: 4,
  },
  fileName: {
    fontSize: 12,
  },
  unreadMessageWrapper: {
    width: 16,
    height: 16,
    marginRight: 2,
    backgroundColor: '#FFA500FF',
    borderRadius: 16 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadMessageCount: {
    fontSize: 8,
  },
  fileWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})

const CONTENT_TYPE_LOCATION = 2
const CONTENT_TYPE_TEXT_HTML = 3
const CONTENT_TYPE_PRICE = 4
const GROUP_TYPE_BROADCAST = 5
const GROUP_TYPE_BROADCAST_ONE_BY_ONE = 8

const hasAttachment = message =>
  (message.filePaths && message.filePaths.length !== 0) || message.fileMeta

const isBroadcast = type =>
  type === GROUP_TYPE_BROADCAST || type === GROUP_TYPE_BROADCAST_ONE_BY_ONE

const getAttachmentIcon = item => {
  if (hasAttachment(item)) {
    return images.icons.attachment
  } else if (item.contentType === CONTENT_TYPE_LOCATION) {
    return images.icons.location
  }
  return null
}

const getMessageRenderer = message => ({
  [CONTENT_TYPE_LOCATION]: <Text style={styles.message}>Location</Text>,
  [CONTENT_TYPE_TEXT_HTML]: (
    <WebView style={styles.webview} source={{ html: message }} />
  ),
  [CONTENT_TYPE_PRICE]: (
    <Text style={styles.message}>{t('final_agreed_price', message)}</Text>
  ),
  default: <Text style={styles.message}>{message}</Text>,
})

const renderPlaceHolder = letter => {
  const firstLetter = letter.toLowerCase()
  const backgroundColor = colors.chatPlaceholderBackground[firstLetter]
  const color = colors.chatPlaceholderForeground[firstLetter]
  return (
    <View style={[styles.contactImage, { backgroundColor }]}>
      <Text style={[styles.alphabeticText, { color }]}>
        {letter.toUpperCase()}
      </Text>
    </View>
  )
}

// eslint-disable-next-line
const profileImage = ({ groupId, displayName, channel }) => {
  if (groupId === null) {
    return renderPlaceHolder(displayName[0])
    // eslint-disable-next-line
  } else {
    // eslint-disable-next-line
    if (isBroadcast(channel ? channel.type : 0)) {
      return <Image style={styles.contactImage} source={images.icons.broadcast} />
      // eslint-disable-next-line
    } else {
      return <Image style={styles.contactImage} source={images.icons.group} />
    }
  }
}

const ChatScreenItem = ({ item, onPress }) => {
  const { contentType, createdAtTime, displayName, message, unreadCount } = item
  const attachmentIcon = getAttachmentIcon(item)
  const fileName = item.fileMeta && item.fileMeta.name
  const ago = moment(createdAtTime).fromNow()
  const messageRenderer = getMessageRenderer(message)
  const renderedMessage =
    // eslint-disable-next-line
    messageRenderer[contentType] || messageRenderer['default']
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
      <View style={styles.row}>
        <View style={styles.profileImage}>{profileImage(item)}</View>
        <View style={styles.column}>
          <View style={styles.nameTimeContainer}>
            <Text style={styles.smsReceivers}>{displayName}</Text>
            <Text style={styles.date}>{ago}</Text>
          </View>
          <View style={styles.messageUnread}>
            {attachmentIcon &&
              <View style={styles.fileWrapper}>
                <Image
                  style={styles.attachmentIcon}
                  source={attachmentIcon}
                  resizeMode="contain"
                />
                <Text style={styles.fileName}>{fileName}</Text>
              </View>}
            {renderedMessage}
            {unreadCount !== 0 &&
              <View style={styles.unreadMessageWrapper}>
                <Text style={styles.unreadMessageCount}>{unreadCount}</Text>
              </View>}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

ChatScreenItem.propTypes = {
  item: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
}

export default ChatScreenItem
