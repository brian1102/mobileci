import { Dimensions, StyleSheet } from 'react-native'
import { colors } from '../../../../../../../theme/index'

const { height, width } = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    height,
    width
  },
  controls: {
    height: 115,
    position: 'absolute',
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.215)',
    left: 0,
    right: 0,
    paddingBottom: 15,
    paddingTop: 15,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  button: {
    width: 100,
    padding: 10
  },
  overlayWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: colors.background
  }
})

export default styles
