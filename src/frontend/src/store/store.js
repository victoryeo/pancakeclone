import { configureStore } from '@reduxjs/toolkit'
import rootReducer from '../reducers/index.js';
import logger from 'redux-logger'

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})


