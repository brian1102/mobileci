import { StyleSheet, Dimensions } from 'react-native'

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    maxHeight: '60%',
    marginBottom: -100,
  },
  checkBoxText: {
    color: '#BFBFBF',
    fontSize: 14,
    width: width * 0.4,
    textAlign: 'right',
    marginRight: 10,
  },
  scrollView: {
    marginVertical: 15,
    marginRight: 10,
  },
  scrollViewContainerStyle: {
    alignItems: 'center',
  },
  buttons: {
    marginVertical: 10,
    width: '80%',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  textInput: {
    marginBottom: 80,
    width: width * 0.5,
    height: 70,
    borderRadius: 5,
    textAlignVertical: 'top',
    color: 'white'
  },
  titleOfCustomReason: {
    marginLeft: 3,
    color: '#BFBFBF',
  },
})

export default styles
