import { StyleSheet, Platform } from 'react-native'

const isIOS = Platform.OS === 'ios'

const styles = StyleSheet.create({
  detailView: {
    marginTop: 20,
    width: '90%',
    backgroundColor: 'white',
    padding: 0
  },
  left: {
    marginRight: 10
  },
  middle: {
    maxWidth: '75%'
  },
  title: {
    color: 'gray',
    fontWeight: '700'
  },
  phone: {
    color: '#3E85EF',
    fontWeight: '700'
  },
  jobType: {
    color: 'black',
    fontWeight: '500'
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginBottom: 10
  },
  buttonRow: {
    flexDirection: 'row',
    margin: 0
  },
  icon: {
    width: 30,
    height: 30
  },
  iconSmall: {
    width: 20,
    height: 20,
    marginHorizontal: 5
  },
  toggle: {
    position: 'absolute',
    right: 15,
    top: 12,
    padding: 5,
    paddingHorizontal: 10
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'space-around'
  },
  button: {
    flex: 1,
    backgroundColor: '#439BEC',
    paddingVertical: 20,
    marginRight: 1
  },
  buttonTitle: {
    color: 'white',
    textAlign: 'center',
    marginBottom: !isIOS ? 7 : 0
  },
  firstButton: {
    borderBottomLeftRadius: 5
  },
  lastButton: {
    borderBottomRightRadius: 5,
    marginRight: 0
  },
  subDescription: {
    marginBottom: 10
  }
})

export default styles
