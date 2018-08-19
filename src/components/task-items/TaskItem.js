import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
} from 'react-native'
import CardView from 'react-native-cardview'
import { images } from '../../theme'
import tr from '../../i18n/i18n'

const isIOS = Platform.OS === 'ios'

const styles = StyleSheet.create({
  wrapper: {
    padding: 0,
    overflow: 'hidden',
    marginBottom: isIOS ? 10 : 0,
    backgroundColor: '#ffffff',
  },
  container: {
    padding: 0,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  middle: {
    marginLeft: 10,
    maxWidth: '90%',
  },
  icon: {
    height: 30,
    width: 30,
  },
  bottom: {
    fontWeight: '500',
  },
})

const BLACK = 0
const RED = 2
const WHITE = 3

const blackTheme = {
  background: '#232c36',
  title: '#9ca0a4',
  address: '#ffffff',
  bottom: '#439aec',
}

const normalTheme = {
  background: '#ffffff',
  title: '#828287',
  address: '#232c36',
  bottom: '#232c36',
}
const redTheme = {
  background: '#FE7460',
  title: '#FFC9B4',
  address: '#ffffff',
  bottom: '#ffffff',
}

const TaskItem = ({ theme, isDropOff, tracking, address, onPress }) => {
  const themeStyle = theme === BLACK
    ? blackTheme
    : theme === RED ? redTheme : normalTheme
  return (
    <CardView cardElevation={2} cornerRadius={10} style={styles.wrapper}>
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <View style={styles.content}>
          <View style={styles.left}>
            <Image
              style={styles.icon}
              source={isDropOff ? images.icons.dropoffIcon : images.icons.pickupIcon}
            />
          </View>
          <View style={styles.middle}>
            <Text style={[styles.title, { color: themeStyle.title }]}>
              {isDropOff ? tr('dropoff_location') : tr('pickup_location')}
            </Text>
            <Text style={[styles.address, { color: themeStyle.address }]}>
              {address}
            </Text>
            <Text style={[styles.bottom, { color: themeStyle.bottom }]}>
              {tracking}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </CardView>
  )
}

TaskItem.propTypes = {
  theme: PropTypes.number,
  isDropOff: PropTypes.bool,
  address: PropTypes.string,
  tracking: PropTypes.string,
  onPress: PropTypes.func,
}

TaskItem.defaultProps = {
  theme: WHITE,
}

export default TaskItem
