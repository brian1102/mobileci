import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20
  },
  container: {
    marginTop: 20,
    paddingBottom: 10,
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white',
  },
  topView: {
    alignItems: 'center',
    paddingTop: 0
  },
  detailView: {
    flexDirection: 'row',
    marginTop: 0,
  },
  detailViewChild: {
    paddingHorizontal: 0,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  number: {
    color: '#34313F',
    fontSize: 25,
    fontWeight: '400',
    marginBottom: 5
  },
  title: {
    color: '#B6B6B6',
    fontSize: 10,
    fontWeight: '600',
  },
  smallCircleStyle: {
    position: 'absolute',
    top: 30,
    right: 10,
  },
  smallCircleTitle: {
    fontSize: 12,
    color: '#34313F',
    fontWeight: '500',
  },
  separator: {
    width: 2,
    height: 15,
    marginTop: 12,
    marginHorizontal: 5,
    backgroundColor: '#b1b1b1',
  },
  timePicker: {
    height: 90,
    width: '85%',
    marginTop: 70
  },
  circleStatusContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginVertical: 20
  },
  moreContainer: {
    position: 'absolute',
    alignItems: 'center'
  },
  moreContainerWithNoCircleGradient: {
    alignItems: 'center',
    marginBottom: 25,
    marginTop: 20
  },
  moreNumber: {
    fontSize: 56,
    fontWeight: '200'
  },
  moreText: {
    fontSize: 16
  },
  todayText: {
    fontWeight: 'bold',
    color: '#999',
    fontSize: 16
  }
})

export default styles
