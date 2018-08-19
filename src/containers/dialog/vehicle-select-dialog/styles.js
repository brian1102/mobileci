import { StyleSheet } from 'react-native'
import { colors, font } from '../../../theme/index'

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
    minWidth: 70
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
    width: 39,
    height: 36
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
})

export default styles
