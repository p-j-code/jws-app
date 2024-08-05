import {combineReducers} from 'redux';
import authReducer from './authReducer';
import messageReducer from './messageReducer';
import productReducer from './productReducer';
import cartReducer from './cartReducer';
import orderReducer from './orderReducer';

// Import other reducers
export const AUTH_REDUCER_KEY = 'auth';
export const MESSAGE_REDUCER_KEY = 'message';
export const PRODUCT_REDUCER_KEY = 'product';
export const CART_REDUCER_KEY = 'cart';
export const ORDER_REDUCER_KEY = 'order';

const rootReducer = combineReducers({
  [AUTH_REDUCER_KEY]: authReducer,
  [MESSAGE_REDUCER_KEY]: messageReducer,
  [PRODUCT_REDUCER_KEY]: productReducer,
  [CART_REDUCER_KEY]: cartReducer,
  [ORDER_REDUCER_KEY]: orderReducer,
  // Other reducers
});

export default rootReducer;
