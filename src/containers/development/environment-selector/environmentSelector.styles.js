import { Dimensions, StyleSheet } from 'react-native'

const width = Dimensions.get('window').width

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch'
  },
  gradient: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'stretch'
  },
  title: {
    fontSize: 20,
    marginLeft: 5,
    marginTop: 10,
    marginBottom: 6,
    color: 'white'
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  evnChoose: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  envView: {
    margin: 5,
    padding: 5,
    maxHeight: width / 1.9,
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#8DB255'
  },
  brandChoose: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  brandView: {
    margin: 5,
    padding: 5,
    maxHeight: width / 1.9,
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#8DB255'
  },
  brandText: {
    color: 'white'
  },
  logo: {
    width: width / 2.4,
    maxHeight: width / 2.4
  },
  active: {
    backgroundColor: 'green'
  },
  buttonContainer: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
})

export default styles
