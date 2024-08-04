export const GET_CART_REQUEST = 'GET_CART_REQUEST';
export const GET_CART_SUCCESS = 'GET_CART_SUCCESS';
export const GET_CART_FAILURE = 'GET_CART_FAILURE';

export const MODIFY_CART_REQUEST = 'MODIFY_CART_REQUEST';
export const MODIFY_CART_SUCCESS = 'MODIFY_CART_SUCCESS';
export const MODIFY_CART_FAILURE = 'MODIFY_CART_FAILURE';

export const CLEAR_CART_REQUEST = 'CLEAR_CART_REQUEST';
export const CLEAR_CART_SUCCESS = 'CLEAR_CART_SUCCESS';
export const CLEAR_CART_FAILURE = 'CLEAR_CART_FAILURE';

export const getCartRequest = () => ({
  type: GET_CART_REQUEST,
});

export const getCartSuccess = (cart) => ({
  type: GET_CART_SUCCESS,
  payload: cart,
});

export const getCartFailure = (error) => ({
  type: GET_CART_FAILURE,
  payload: error,
});

export const modifyCartRequest = (payload) => ({
  type: MODIFY_CART_REQUEST,
  payload,
});

export const modifyCartSuccess = (cart) => ({
  type: MODIFY_CART_SUCCESS,
  payload: cart,
});

export const modifyCartFailure = (error) => ({
  type: MODIFY_CART_FAILURE,
  payload: error,
});

export const clearCartRequest = () => ({
  type: CLEAR_CART_REQUEST,
});

export const clearCartSuccess = (cart) => ({
  type: CLEAR_CART_SUCCESS,
  payload: cart,
});

export const clearCartFailure = (error) => ({
  type: CLEAR_CART_FAILURE,
  payload: error,
});
