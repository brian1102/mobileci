import PropTypes from 'prop-types'
import React from 'react'
import {
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  View,
  WebView,
} from 'react-native'
import Theme from 'react-native-theming'
import { bindActionCreators } from 'redux'
import LinearGradient from 'react-native-linear-gradient'
import { font, colors, data } from '../../../../theme'
import tr from '../../../../i18n/i18n'
import RoundedButton from '../../../../components/rounded-button/RoundedButton'
import connect from '../../../../utils/connect'
import * as t from '../../../../state/actionsType'
import a from '../../../../state/actions'

const scale = Dimensions.get('window').width / 1160

const styles = StyleSheet.create({
  head: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    margin: 16,
    backgroundColor: colors.transparent,
  },
  gradient: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'stretch',
    justifyContent: 'flex-start',
  },
  appName: {
    marginTop: -6,
    fontSize: font.sizes.small,
    color: colors.white,
    backgroundColor: colors.transparent,
  },
  logo: {
    marginTop: 15,
    width: 500 * scale,
    height: 414 * scale,
  },
  agreeButtonWrapper: {
    marginTop: 32,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  agreeButton: {
    marginBottom: 32,
  },
})

/* eslint-disable react/prefer-stateless-function */
class TermAndConditionsScreen extends React.Component {
  render() {
    const { iAgreeAction, disagreeAction } = this.props
    return (
      <LinearGradient colors={['#364451', '#222c35']} style={styles.gradient}>
        <StatusBar backgroundColor="#364451" />
        <View style={styles.head}>
          <Theme.Image
            source={'@logoLicense'}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.appName}>{tr('app_name')}</Text>
        </View>
        <WebView source={{ html: data.licenseHTML }} style={styles.content} />
        <View style={styles.agreeButtonWrapper}>
          <RoundedButton style={styles.agreeButton} onPress={disagreeAction}>
            <Text style={{ color: '#fafbfc' }}>{tr('disagree')}</Text>
          </RoundedButton>

          <RoundedButton
            style={[styles.agreeButton, { marginLeft: 10 }]}
            onPress={iAgreeAction}
          >
            <Text style={{ color: '#fafbfc' }}>{tr('i_agree')}</Text>
          </RoundedButton>
        </View>
      </LinearGradient>
    )
  }
}

TermAndConditionsScreen.propTypes = {
  iAgreeAction: PropTypes.func.isRequired,
  disagreeAction: PropTypes.func.isRequired,
}

TermAndConditionsScreen.navigationOptions = {
  header: null,
}

const mapDispatchToProps = dispatch => ({
  act: bindActionCreators(a, dispatch),
  iAgreeAction: () => {
    dispatch(a[t.NAVIGATE]('Login'))
    dispatch(a[t.LOGIN_REQUEST]())
    dispatch(a[t.UPDATE_LICENSE_AGREED]())
  },
})

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const act = dispatchProps.act
  return {
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    disagreeAction: () => {
      act[t.BACK]()
    },
  }
}

export default connect(null, mapDispatchToProps, mergeProps)(
  TermAndConditionsScreen
)
