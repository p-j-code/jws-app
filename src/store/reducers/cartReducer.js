import {
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
  GET_CART_FAILURE,
  MODIFY_CART_REQUEST,
  MODIFY_CART_SUCCESS,
  MODIFY_CART_FAILURE,
  CLEAR_CART_REQUEST,
  CLEAR_CART_SUCCESS,
  CLEAR_CART_FAILURE,
} from '../actions/cartActions';

const initialState = {
  loading: false,
  cart: null,
  error: null,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART_REQUEST:
    case MODIFY_CART_REQUEST:
    case CLEAR_CART_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_CART_SUCCESS:
    case MODIFY_CART_SUCCESS:
    case CLEAR_CART_SUCCESS:
      return { ...state, loading: false, cart: action.payload };
    case GET_CART_FAILURE:
    case MODIFY_CART_FAILURE:
    case CLEAR_CART_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default cartReducer;
