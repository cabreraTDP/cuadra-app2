import { combineReducers } from 'redux';
import { AUTH_LOGOUT } from '../actions/types';

import auth from './auth_reducer';

const appReducer = combineReducers({
  auth
});

const rootReducer = (state, action) => {
  if (action.type === AUTH_LOGOUT) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;