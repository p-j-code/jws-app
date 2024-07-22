import {combineReducers} from '@reduxjs/toolkit';
import authReducer from './authReducer';
import messageReducer from './messageReducer';

// Import other reducers
export const AUTH_REDUCER_KEY = 'auth';
export const MESSAGE_REDUCER_KEY = 'message';

const rootReducer = combineReducers({
  [AUTH_REDUCER_KEY]: authReducer,
  [MESSAGE_REDUCER_KEY]: messageReducer,
  // Other reducers
});

export default rootReducer;
