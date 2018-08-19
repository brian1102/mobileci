import React from 'react'
import { AppState } from 'react-native'
import { Provider } from 'react-redux'
import 'moment/locale/es.js'
import 'moment/locale/km.js'
import { PersistGate } from 'redux-persist/integration/react'
import store, { persistor } from './src/state/getStore'
import AppWithNavigationState from './src/utils/AppNavigator'
import './src/config/network.config'
import * as CrashApi from './src/api/analytics/CrashApi'
import * as t from './src/state/actionsType'
import a from './src/state/actions'
import './src/utils/globalObj'
import './src/theme/theme'

class App extends React.Component {
  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange)
    store.dispatch(a[t.STARTUP]())
    CrashApi.setup()
  }

  state = {
    appState: AppState.currentState
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange)
  }

  handleAppStateChange = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      setTimeout(() => {
        // app has come to the foreground
        store.dispatch(a[t.ON_APP_GO_TO_FOREGROUND]())
      }, 1000)
    }
    this.setState({ appState: nextAppState })
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppWithNavigationState />
        </PersistGate>
      </Provider>
    )
  }
}

export default App
