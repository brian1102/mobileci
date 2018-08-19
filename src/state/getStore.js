import identity from 'lodash/fp/identity'
import { applyMiddleware, compose, createStore } from 'redux'
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers'
import createSagaMiddleware from 'redux-saga'
import { persistStore, persistReducer } from 'redux-persist'
import immutableTransform from 'redux-persist-transform-immutable'
import storage from 'redux-persist/lib/storage'
import reducer from './reducer'
import sagas from './sagas-registration'

// Configure redux-persist
const persistConfig = {
  key: 'yojee-driver',
  transforms: [immutableTransform()],
  storage,
  whitelist: [
    'auth',
    'task',
    'completeJobFlow',
    'language'
  ]
}
const persistedReducer = persistReducer(persistConfig, reducer)

// configure middlewares
const sagaMiddleware = createSagaMiddleware()
const navigationMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.navigation
)
/* eslint-disable no-undef */
const middleware = [sagaMiddleware, navigationMiddleware].filter(identity)

// eslint-disable-next-line
const composeFunction = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  persistedReducer,
  undefined,
  composeFunction(applyMiddleware(...middleware))
)

sagaMiddleware.run(sagas)

export const persistor = persistStore(store)
export default store
