import { configureStore } from '@reduxjs/toolkit'
import rootReducer from '../reducers/index.js';

export const store = configureStore({
  reducer: rootReducer
})


