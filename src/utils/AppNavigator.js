import PropTypes from 'prop-types'
import React from 'react'
import {
  Animated,
  BackHandler,
  Easing,
  StatusBar as RNStatusBar,
  StyleSheet,
  View,
} from 'react-native'
import { addNavigationHelpers, StackNavigator } from 'react-navigation'
import { createReduxBoundAddListener } from 'react-navigation-redux-helpers'
import { connect } from 'react-redux'
import { createThemedComponent } from 'react-native-theming'
import { isNetworkConnected } from '../state/app/selectors'
import FCMApi from '../api/push/FCMApi'
import UI from '../utils/UI'
import DashboardDrawer from '../containers/dashboard/navigator'
import TermAndConditions from '../containers/havent-logged/auth-flow/term-conditions/TermAndConditions.screen'
import LoginScreen from '../containers/havent-logged/auth-flow/login/Login.screen'
import SignaturePOD from '../containers/dashboard/home/tasks/detail/complete-flow/signature-pod/SignaturePOD.screen'
import StartScreen from '../containers/havent-logged/start/Start.screen'
import PhotoPOD from '../containers/dashboard/home/tasks/detail/complete-flow/photo-pod/PhotoPOD.screen'
import CircleButtonWithBadge from '../components/circle-button-with-badge/CircleButtonWithBadge'
import { getDialog, getLocationDialog } from '../state/dialog/selectors'
import { getCurrentRoute } from '../state/navigation/selectors'
import { hideCardView } from '../state/overlay/actions'
import { isCardViewVisible, isOverlayVisible } from '../state/overlay/selectors'
import { colors } from '../theme/index'
import { slideFromRightForScreens } from './customTransitions'
import Fade from '../components/fade/Fade'
import * as t from '../state/actionsType'
import * as s from '../state/selectors'
import a from '../state/actions'
import TaskDetailContainer from '../containers/dashboard/home/tasks/detail/TaskDetail.screen'
import IncomingTaskModal from '../containers/dashboard/home/tasks/components/IncomingTasksModal/IncomingTasks.modal'
import VerifyOtpScreen from '../containers/havent-logged/auth-flow/verify-otp/VerifyOTP.screen'
import DialogManager from '../containers/dialog/DialogManager'

import CustomEndpoint from '../containers/development/custom-endpoint/CustomEndpoint.screen'
import EnvironmentSelector from '../containers/development/environment-selector/EnvironmentSelector.screen'

const StatusBar = createThemedComponent(RNStatusBar, ['backgroundColor'])

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    backgroundColor: colors.overlay,
  },
  cardViewWrapper: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  floatTaskButton: {
    position: 'absolute',
    bottom: 100,
    right: 10,
  },
  floatChatButton: {
    position: 'absolute',
    bottom: 25,
    right: 10,
  },
})

export const AppNavigator = StackNavigator(
  {
    VerifyOtp: { screen: VerifyOtpScreen },
    Home: { screen: DashboardDrawer },
    TaskDetail: { screen: TaskDetailContainer },
    PhotoPOD: { screen: PhotoPOD },
    Login: { screen: LoginScreen },
    TermAndConditions: { screen: TermAndConditions },
    SignaturePOD: { screen: SignaturePOD },
    Start: { screen: StartScreen },
    // dev screens
    CustomEndpoint: { screen: CustomEndpoint },
    EnvironmentSelector: { screen: EnvironmentSelector },
  },
  {
    headerMode: 'screen',
    transitionConfig: slideFromRightForScreens([
      'Home',
      'TaskDetail',
      'SignaturePOD',
      'PhotoPOD',
      'VerifyOtp',
      'Login',
      'CustomEndpoint',
      'EnvironmentSelector',
    ]),
  }
)

class AppWithNavigationState extends React.Component {
  constructor(props) {
    super(props)
    this.animatedY = new Animated.Value(0)
    this.addListener = createReduxBoundAddListener('root')
  }

  componentWillReceiveProps(nextProps) {
    const { isCardViewVisible: oldIsCardViewVisible } = this.props

    if (nextProps.isCardViewVisible !== oldIsCardViewVisible) {
      const toValue = isCardViewVisible ? 1 : 0
      const fromValue = 1 - toValue
      this.animatedY.setValue(fromValue)
      Animated.timing(this.animatedY, {
        toValue,
        duration: 300,
        easing: Easing.easeInEaseOut,
        useNativeDriver: true,
      }).start()
    }
  }

  componentDidMount() {
    this.animatedY.setValue(0)
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress)

    // Set handlers for FCM
    FCMApi.setHandler(
      token => this.props.fcmReceivedToken(token),
      message => this.props.handleSingleFCMEvent(message),
      null // waiting for event type from server, for some kind of event, we don't need to add to queue, etc
    )

    UI.runAfterInteractions(() => {
      FCMApi.listen()
    }, 3000)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress)
  }

  onBackPress = () => {
    const { dispatch, navigation, isCardViewVisible } = this.props

    if (isCardViewVisible) {
      dispatch(hideCardView())
      return true
    }

    if (navigation.index > 0) {
      this.navigator.props.navigation.goBack()
      return true
    }

    return false
  }

  onGoToChat = () => {
    this.navigator.props.navigation.navigate('Chat')
  }

  renderFloatButton = (countIncomingTaskGroups, countUnreadChat) => {
    return (
      <View>
        <CircleButtonWithBadge
          style={[
            styles.floatTaskButton,
            !countUnreadChat ? { bottom: 25 } : null,
          ]}
          badgeCount={countIncomingTaskGroups}
          onPress={this.props.showTaskGroups}
        />
        <CircleButtonWithBadge
          style={[
            styles.floatChatButton,
            !countUnreadChat ? { bottom: 25 } : null,
          ]}
          badgeCount={countUnreadChat}
          backgroundColor="#3E9EF2"
          icon="bubble"
          onPress={this.onGoToChat}
        />
      </View>
    )
  }

  render() {
    const {
      currentRoute,
      dialog,
      dispatch,
      navigation,
      countIncomingTaskGroups,
      totalUnreadCount,
    } = this.props

    const isHomeScreen = currentRoute.routeName === 'HomeScreen'
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="@brand" />
        <AppNavigator
          ref={ref => {
            this.navigator = ref
          }}
          navigation={addNavigationHelpers({
            dispatch,
            state: navigation,
            addListener: this.addListener,
          })}
        />

        <IncomingTaskModal />
        <Fade>
          {dialog && <DialogManager dialog={dialog} />}
        </Fade>
        {isHomeScreen &&
          this.renderFloatButton(countIncomingTaskGroups, totalUnreadCount)}
      </View>
    )
  }
}

AppWithNavigationState.propTypes = {
  currentRoute: PropTypes.object,
  dialog: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  isCardViewVisible: PropTypes.bool.isRequired,
  navigation: PropTypes.object.isRequired,
  fcmReceivedToken: PropTypes.func,
  countIncomingTaskGroups: PropTypes.number,
  showTaskGroups: PropTypes.func,
  handleSingleFCMEvent: PropTypes.func,
  totalUnreadCount: PropTypes.number,
}

const mapStateToProps = state => ({
  currentRoute: getCurrentRoute(state),
  dialog: getDialog(state),
  isCardViewVisible: isCardViewVisible(state),
  locationDialog: getLocationDialog(state),
  navigation: state.navigation,
  overlayVisible: isOverlayVisible(state),
  isOnline: isNetworkConnected(state),
  isDaemonRunning: s.getIsDaemonRunning(state),
  jobQueue: s.getJobQueue(state),
  countIncomingTaskGroups: s.getTotalCountIncomingTaskGroups(state),
  totalUnreadCount: s.getTotalUnreadCount(state),
})

const mapDispatchToProps = dispatch => ({
  dispatch,
  onRetrySync: () => dispatch(a[t.SYNCING_DEAMON_REQUEST]()),
  fcmReceivedToken: token => dispatch(a[t.FCM_RECEIVED_TOKEN](token)),
  showTaskGroups: () => dispatch(a[t.SHOW_INCOMING_TASKGROUPS_POPUP]()),
  handleSingleFCMEvent: message =>
    dispatch(a[t.HANDLE_SINGLE_FCM_EVENT](message)),
})

export default connect(mapStateToProps, mapDispatchToProps)(
  AppWithNavigationState
)
