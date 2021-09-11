import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from '../reducers/index';
import logger from 'redux-logger'

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }).concat(logger),
})


