import PropTypes from 'prop-types'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import RoundedButton from '../../../components/rounded-button/index'
import { colors, font, images } from '../../../theme/index'
import formatBold from '../../../utils/formatBold'
import store from '../../../state/getStore'
import tr from '../../../i18n/i18n'
import a from '../../../state/actions'
import * as t from '../../../state/actionsType'
import { hideDialog } from '../../../state/dialog/actions'
import { openLocationSettings } from '../../../utils/openSettings/index'
import Global from '../../../utils/globalObj'

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  content: {
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 'auto',
    marginBottom: 'auto',
    backgroundColor: '#222C35',
    borderRadius: 20,
    paddingBottom: 16
  },
  title: {
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
    color: colors.background,
    fontSize: font.sizes.medium,
    textAlign: 'center'
  },
  description: {
    marginBottom: 24,
    marginLeft: 16,
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
    color: colors.background,
    fontSize: font.sizes.small,
    textAlign: 'center'
  },
  button: {
    minWidth: 70,
    paddingHorizontal: 5
  },
  separator: {
    width: 64,
    height: 2,
    marginBottom: 32,
    marginTop: 32
  },
  icon: {
    marginTop: 20,
    marginBottom: 10,
    width: 100,
    height: 100
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
})

const onIgnore = () => {
  store.dispatch(hideDialog())

  setTimeout(() => {
    store.dispatch(a[t.INIT_LOCATION]())
  }, 60000)
}

const onOpenSetting = async () => {
  Global.markAsJustLeaveTheAppByGotoSetting(true)
  store.dispatch(hideDialog())
  const action = await openLocationSettings()
  store.dispatch(action)
}

class Dialog extends React.Component {
  componentDidMount() {
    Global.markAsJustLeaveTheAppByGotoSetting(false)
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>{tr('notice')}</Text>

          <Image
            source={images.icons.noJobs}
            style={styles.icon}
            resizeMode="contain"
          />

          <Text style={styles.description}>
            {formatBold(tr('please_enable_location_service'))}
          </Text>
          <View style={styles.buttonContainer}>
            <RoundedButton
              title={tr('ignore')}
              onPress={onIgnore}
              style={styles.button}
              color={colors.background}
              highlightColor={colors.brand}
              highlightTitleColor={colors.title}
            />
            <RoundedButton
              title={tr('open_settings')}
              onPress={onOpenSetting}
              style={styles.button}
              color={colors.background}
              highlightColor={colors.brand}
              highlightTitleColor={colors.title}
            />
          </View>
        </View>
      </View>
    )
  }
}

Dialog.propTypes = {
  color: PropTypes.string,
  description: PropTypes.string
}

Dialog.defaultProps = {
  color: colors.alert,
  description: null,
  options: []
}

export default Dialog
