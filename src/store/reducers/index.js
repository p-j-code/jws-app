import {combineReducers} from 'redux';
import authReducer from './authReducer';
import messageReducer from './messageReducer';
import productReducer from './productReducer';
import cartReducer from './cartReducer';

// Import other reducers
export const AUTH_REDUCER_KEY = 'auth';
export const MESSAGE_REDUCER_KEY = 'message';
export const PRODUCT_REDUCER_KEY = 'product';
export const CART_REDUCER_KEY = 'cart';

const rootReducer = combineReducers({
  [AUTH_REDUCER_KEY]: authReducer,
  [MESSAGE_REDUCER_KEY]: messageReducer,
  [PRODUCT_REDUCER_KEY]: productReducer,
  [CART_REDUCER_KEY]: cartReducer,
  // Other reducers
});

export default rootReducer;
