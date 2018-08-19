import PropTypes from 'prop-types'
import React from 'react'
import { TouchableOpacity as RNTouchableOpacity, Platform } from 'react-native'
import Theme, { createThemedComponent, createStyle } from 'react-native-theming'
import Ionicons from 'react-native-vector-icons/Ionicons'
import store from '../../state/getStore'
import a from '../../state/actions'
import * as t from '../../state/actionsType'

const isIOS = Platform.OS === 'ios'

const Icon = createThemedComponent(Ionicons)
const TouchableOpacity = createThemedComponent(RNTouchableOpacity)

const BackButton = () =>
  <TouchableOpacity
    style={styles.left}
    onPress={() => store.dispatch(a[t.BACK]())}
  >
    <Icon style={styles.backIcon} name="md-arrow-back" />
  </TouchableOpacity>

const MenuButton = () =>
  <TouchableOpacity
    style={styles.left}
    onPress={() => store.dispatch(a[t.NAVIGATE]('DrawerOpen'))}
  >
    <Icon style={styles.menuIcon} name="md-menu" />
  </TouchableOpacity>

const Header = ({ showMenuButton, title }) => {
  return (
    <Theme.View style={styles.header}>
      {showMenuButton ? <MenuButton /> : <BackButton />}
      <Theme.View style={styles.middle}>
        <Theme.Text style={styles.headerTitle} numberOfLines={1}>
          {title}
        </Theme.Text>
      </Theme.View>
    </Theme.View>
  )
}

const styles = createStyle({
  header: {
    paddingTop: isIOS ? 35 : 5,
    paddingBottom: 10,
    height: 55,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '@brand',
    alignItems: 'center'
  },
  left: {
    height: 35,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  middle: {
    height: 35,
    paddingRight: 50,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  menuIcon: {
    color: 'white',
    fontSize: 25,
    backgroundColor: 'transparent'
  },
  backIcon: {
    color: 'white',
    fontSize: 27,
    backgroundColor: 'transparent'
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center'
  }
})

Header.propTypes = {
  title: PropTypes.string,
  showMenuButton: PropTypes.bool
}

export default Header
