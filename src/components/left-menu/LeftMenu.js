import React from 'react'
import Button from 'react-native-button'
import { View, ScrollView, Image, StyleSheet } from 'react-native'
import connect from '../../utils/connect'
import Config from '../../config/index'
import { images } from '../../theme'
import store from '../../state/getStore'
import * as t from '../../state/actionsType'
import * as s from '../../state/selectors'
import tr from '../../i18n/i18n'
import a from '../../state/actions'

const list = rules => {
  const menu = [
    {
      title: tr('tasks').toUpperCase(),
      navigate: 'root'
    },
    {
      title: tr('tab_history').toUpperCase(),
      navigate: 'History'
    },
    {
      title: tr('tab_profile').toUpperCase(),
      navigate: 'Profile'
    },
    {
      title: tr('chats_fragment_title').toUpperCase(),
      navigate: 'Chat'
    },
    {
      title: tr('settingsfrgmt_title').toUpperCase(),
      navigate: 'Setting'
    }
  ]
  if (
    Config().THEME !== 'scharff' &&
    rules &&
    ((rules.pickup && rules.pickup.length === 0) ||
      (rules.dropoff && rules.dropoff.length === 0))
  ) {
    menu.push({
      title: tr('scanner').toUpperCase(),
      navigate: 'Scanner'
    })
  }

  return menu
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#222C35',
    alignItems: 'center',
    paddingTop: '20%'
  },
  menuitem: {
    marginVertical: 10,
    paddingVertical: 5,
    width: '100%'
  },
  menuitemTitle: {
    fontSize: 25,
    color: '#A2B6C6',
    textAlign: 'center'
  },
  image: {
    width: 50,
    height: 50,
    marginBottom: 30
  }
})

const onPress = item => {
  store.dispatch(a[t.NAVIGATE](item.navigate))
}
// eslint-disable-next-line
const Menu = ({ rules }) => {
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: '#222C35'
      }}
    >
      <View style={styles.container}>
        <Image
          source={images.icons.logoDriver}
          style={styles.image}
          resizeMode="contain"
        />
        {list(rules).map(item =>
          <Button
            onPress={() => onPress(item)}
            containerStyle={styles.menuitem}
            style={styles.menuitemTitle}
            key={`key${item.title}`}
          >
            {item.title}
          </Button>
        )}
      </View>
    </ScrollView>
  )
}

export default connect(
  state => ({
    rules: s.getCompanyRules(state)
  }),
  null
)(Menu)
