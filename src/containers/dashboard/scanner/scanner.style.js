import { createStyle } from 'react-native-theming'

const styles = createStyle({
  container: {
    paddingTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#fafafa'
  },
  topContentStyle: {
    flex: 0,
    backgroundColor: 'red'
  },
  badgeContainer: {
    marginLeft: 5,
    backgroundColor: '#F86759',
    width: 22,
    height: 22,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  overlay: {
    flex: 1,
    backgroundColor: 'red'
  },
  switchView: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 5,
    backgroundColor: '@brand'
  },
  switchViewText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  },
  switchViewTextLeft: {
    marginRight: 5
  },
  switchViewTextRight: {
    marginLeft: 5
  },
  bottomView: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'space-between'
  },

  infoView: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  buttons: {
    paddingVertical: 8,
    justifyContent: 'space-around',
    flexDirection: 'row',
    backgroundColor: 'transparent'
  },
  scrollView: {
    flex: 3,
    marginVertical: 5,
    paddingHorizontal: 8
  },
  statsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  readedView: {
    marginBottom: 5,
    backgroundColor: '@brand',
    paddingHorizontal: 10,
    borderRadius: 10,
    height: 35,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  readedItem: {
    width: '80%',
    color: 'white',
    fontSize: 12
  },

  readedCount: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  readedCountLabel: {
    fontSize: 12
  },
  noitemText: {
    color: 'gray',
    fontSize: 12,
    alignSelf: 'center',
    marginTop: 30
  }
})

export default styles
