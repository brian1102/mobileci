import { createStyle } from 'react-native-theming'
import { Dimensions } from 'react-native'
import { colors, font } from '../../../theme'

const width = Dimensions.get('window').width
const scale = width / 1084

const styles = createStyle({
  container: {
    flex: 1,
    alignSelf: 'stretch'
  },
  gradient: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  logo: {
    width: 488 * scale,
    height: 516 * scale
  },
  appName: {
    fontSize: font.sizes.small,
    color: 'white',
    backgroundColor: 'transparent'
  },
  phoneNumber: {
    backgroundColor: 'white',
    margin: 32,
    width: 860 * scale,
    height: 136 * scale,
    borderRadius: 9999,
    paddingHorizontal: 24,
    shadowColor: '#367010',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: {
      height: 5
    },
    elevation: 10
  },
  noteCodeReceivedWrapper: {
    marginTop: 16,
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexWrap: 'wrap'
  },
  enterPhone: {
    marginTop: 16,
    color: 'white',
    fontSize: font.sizes.tiny,
    textAlign: 'center'
  },
  terms: {
    marginTop: 16,
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexWrap: 'wrap'
  },
  noteCodeReceived: {
    color: colors.alert,
    marginRight: 8
  },
  linkText: {
    color: 'white',
    textDecorationLine: 'underline'
  },
  alert: {
    backgroundColor: '#d85747',
    width,
    color: 'white',
    padding: 8,
    paddingHorizontal: 64,
    textAlign: 'center',
    marginBottom: 16
  },
  agreeButton: {
    borderColor: 'white'
  },
  loginButtonText: {
    fontSize: font.sizes.tinier,
    color: '#fafbfc'
  }
})

export default styles
