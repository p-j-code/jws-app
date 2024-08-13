import {combineReducers} from 'redux';
import authReducer from './authReducer';
import messageReducer from './messageReducer';
import productReducer from './productReducer';
import cartReducer from './cartReducer';
import orderReducer from './orderReducer';
import {formReducer} from './formReducer';
import categoryReducer from './categoryReducer';

// Import other reducers
export const AUTH_REDUCER_KEY = 'auth';
export const MESSAGE_REDUCER_KEY = 'message';
export const PRODUCT_REDUCER_KEY = 'product';
export const CART_REDUCER_KEY = 'cart';
export const ORDER_REDUCER_KEY = 'order';
export const FORM_REDUCER_KEY = 'form';
export const CATEGORY_REDUX_KEY = 'category';

const rootReducer = combineReducers({
  [AUTH_REDUCER_KEY]: authReducer,
  [MESSAGE_REDUCER_KEY]: messageReducer,
  [PRODUCT_REDUCER_KEY]: productReducer,
  [CART_REDUCER_KEY]: cartReducer,
  [ORDER_REDUCER_KEY]: orderReducer,
  [FORM_REDUCER_KEY]: formReducer,
  [CATEGORY_REDUX_KEY]: categoryReducer,
  // Other reducers
});

export default rootReducer;
