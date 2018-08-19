import { NetInfo } from 'react-native'
import store from '../state/getStore'
import * as t from '../state/actionsType'
import a from '../state/actions'

NetInfo.isConnected.addEventListener('connectionChange', isConnected => {
  store.dispatch(a[t.NETWORK_CHANGE](isConnected))
})