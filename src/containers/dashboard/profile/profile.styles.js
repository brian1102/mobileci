import { StyleSheet } from 'react-native'
import { responsiveHeight } from 'react-native-responsive-dimensions'

import { colors, font } from '../../../theme'

const profileInnerCircleRadius = responsiveHeight(8.1)
const profileOuterCircleRadius = profileInnerCircleRadius + 2

const barSize = 16

const styles = StyleSheet.create({
  scrollView: {
    alignSelf: 'stretch',
    backgroundColor: '#f6f6f6'
  },
  container: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#f6f6f6'
  },
  emptyContainer: {
    justifyContent: 'center'
  },
  holder: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 16,
    marginRight: 16,
    alignSelf: 'stretch',
    backgroundColor: colors.white,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 16,
    shadowColor: colors.black,
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: {
      height: 4
    },
    elevation: 4
  },
  label: {
    alignSelf: 'stretch',
    backgroundColor: colors.transparent,
    textAlign: 'left',
    margin: 16,
    fontWeight: 'bold',
    fontSize: font.tinier,
    color: '#0d0c11'
  },
  upper: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#222c35'
  },
  icon: {
    marginTop: 3,
    marginRight: 8,
    width: 21,
    height: 15
  },
  page: {
    color: colors.title,
    fontSize: font.smaller,
    fontWeight: 'bold'
  },
  header: {
    marginTop: 35,
    marginLeft: 16,
    flexDirection: 'row',
    alignSelf: 'stretch'
  },
  name: {
    color: colors.title,
    fontSize: font.smaller,
    fontWeight: 'bold',
    marginTop: 14
  },
  profilePictureOuter: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    width: profileOuterCircleRadius * 2,
    height: profileOuterCircleRadius * 2,
    borderWidth: 2,
    borderColor: '#90979f',
    borderRadius: profileOuterCircleRadius,
    backgroundColor: colors.transparent
  },
  profilePictureInner: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: profileInnerCircleRadius * 2,
    height: profileInnerCircleRadius * 2,
    borderRadius: profileInnerCircleRadius,
    backgroundColor: colors.brand,
    borderWidth: 6,
    borderColor: '#222c35',
    overflow: 'hidden'
  },
  profilePicturePlaceholder: {
    color: colors.title,
    fontSize: font.bigger,
    backgroundColor: colors.transparent
  },
  profilePicture: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  profilePictureLoading: {
    top: 0,
    left: 0,
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.5)'
  },
  switchRow: {
    padding: 16,
    paddingBottom: 32,
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  statusTitle: {
    marginLeft: 8,
    color: colors.title,
    fontSize: font.small
  },
  chartLoadingDetail: {
    marginTop: 100,
    paddingHorizontal: 40,
    alignSelf: 'center'
  },
  vanIcon: {
    width: 39,
    height: 36
  },
  rightArrowIcon: {
    width: 11,
    height: 17
  },
  vehicle: {
    marginLeft: 32,
    backgroundColor: colors.transparent
  },
  selectVehicleSpiner: {
    marginLeft: '30%'
  },
  spacer: {
    height: 32
  },
  spacerHalf: {
    height: 16
  },
  circle: {
    width: barSize * 0.8,
    height: barSize * 0.8,
    borderRadius: 9999,
    borderColor: '#121212',
    borderWidth: 1
  },
  circleWrapper: {
    marginBottom: 16,
    marginLeft: 'auto'
  },
  button: {
    alignSelf: 'stretch'
  },
  headerIcon: {
    color: 'white',
    fontSize: 20,
    padding: 1,
    paddingRight: 12,
    backgroundColor: 'transparent'
  }
})

export default styles
