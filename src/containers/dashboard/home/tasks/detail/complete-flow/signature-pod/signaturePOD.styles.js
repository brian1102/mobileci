import { StyleSheet } from 'react-native'

import { colors, font } from '../../../../../../../theme/index'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    backgroundColor: colors.lightBackground
  },
  signatureOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  signatureContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  signature: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'column'
  },
  footer: {
    alignSelf: 'stretch'
  },
  buttons: {
    alignSelf: 'stretch',
    justifyContent: 'space-around',
    flexDirection: 'row',
    backgroundColor: colors.transparent,
    marginBottom: 16
  },
  cod: {
    alignSelf: 'stretch',
    justifyContent: 'flex-start',
    padding: 16,
    flexDirection: 'row',
    backgroundColor: colors.transparent
  },
  checkBoxText: {
    color: '#000',
    marginLeft: 10,
    marginRight: 40,
    fontSize: font.sizes.tiny
  },
  textInputWrapper: {
    alignSelf: 'stretch',
    justifyContent: 'space-around',
    flexDirection: 'row',
    backgroundColor: colors.transparent,
    marginBottom: 16
  },
  note: {
    color: 'rgba(0, 0, 0, 0.215)',
    fontSize: font.sizes.tiny,
    textAlign: 'center',
    backgroundColor: colors.transparent,
    bottom: 140
  },
  watermark: {
    transform: [{ rotate: '-90deg' }],
    color: 'rgba(0, 0, 0, 0.215)',
    fontSize: font.sizes.big,
    textAlign: 'center'
  },
  textInput: {
    flex: 1,
    marginTop: 8,
    marginLeft: 16,
    marginRight: 16,
    height: font.sizes.normal * 2,
    padding: 8,
    alignSelf: 'stretch',
    backgroundColor: '#dddddd',
    fontSize: font.sizes.normal
  }
})

export default styles
