import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';

import { persistStore, persistReducer } from 'redux-persist';
import rootReducer from '../reducers/index.js';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
}

const middlewares = [thunk];
const isChrome = window.navigator.userAgent.includes('Chrome');

export const store = createStore(
  persistReducer(persistConfig, rootReducer),
  compose(
    applyMiddleware(...middlewares),

    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
	  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ :
       compose

  )
)
