import { combineReducers } from '@reduxjs/toolkit';
import reducers from './reducers';

export const rootReducer = 
  combineReducers({
    reducers: reducers,
  });

export type RootState = ReturnType<typeof rootReducer>