import {combineReducers} from '@reduxjs/toolkit';
import authReducer from './authReducer';

// Import other reducers
export const AUTH_REDUCER_KEY = 'auth';

const rootReducer = combineReducers({
  [AUTH_REDUCER_KEY]: authReducer,
  // Other reducers
});

export default rootReducer;
