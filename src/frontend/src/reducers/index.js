import { combineReducers } from 'redux';
import reducers from './reducers.js';

const appReducer = combineReducers({
  reducers,
});

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;