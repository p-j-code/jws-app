import {combineReducers} from '@reduxjs/toolkit';
import authReducer from './authReducer';
import messageReducer from './messageReducer';
import productReducer from './productReducer';

// Import other reducers
export const AUTH_REDUCER_KEY = 'auth';
export const MESSAGE_REDUCER_KEY = 'message';
export const PRODUCT_REDUCER_KEY = 'product';

const rootReducer = combineReducers({
  [AUTH_REDUCER_KEY]: authReducer,
  [MESSAGE_REDUCER_KEY]: messageReducer,
  [PRODUCT_REDUCER_KEY]: productReducer,
  // Other reducers
});

export default rootReducer;
