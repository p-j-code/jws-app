export const CREATE_ORDER_FROM_CART_REQUEST = 'CREATE_ORDER_FROM_CART_REQUEST';
export const CREATE_ORDER_FROM_CART_SUCCESS = 'CREATE_ORDER_FROM_CART_SUCCESS';
export const CREATE_ORDER_FROM_CART_FAILURE = 'CREATE_ORDER_FROM_CART_FAILURE';

export const GET_ORDERS_BY_USER_REQUEST = 'GET_ORDERS_BY_USER_REQUEST';
export const GET_ORDERS_BY_USER_SUCCESS = 'GET_ORDERS_BY_USER_SUCCESS';
export const GET_ORDERS_BY_USER_FAILURE = 'GET_ORDERS_BY_USER_FAILURE';

export const GET_ORDER_BY_ID_REQUEST = 'GET_ORDER_BY_ID_REQUEST';
export const GET_ORDER_BY_ID_SUCCESS = 'GET_ORDER_BY_ID_SUCCESS';
export const GET_ORDER_BY_ID_FAILURE = 'GET_ORDER_BY_ID_FAILURE';

export const UPDATE_ORDER_STATUS_BY_USER_REQUEST =
  'UPDATE_ORDER_STATUS_BY_USER_REQUEST';
export const UPDATE_ORDER_STATUS_BY_USER_SUCCESS =
  'UPDATE_ORDER_STATUS_BY_USER_SUCCESS';
export const UPDATE_ORDER_STATUS_BY_USER_FAILURE =
  'UPDATE_ORDER_STATUS_BY_USER_FAILURE';

// Action Creators
export const createOrderFromCartRequest = () => ({
  type: CREATE_ORDER_FROM_CART_REQUEST,
});

export const createOrderFromCartSuccess = order => ({
  type: CREATE_ORDER_FROM_CART_SUCCESS,
  payload: order,
});

export const createOrderFromCartFailure = error => ({
  type: CREATE_ORDER_FROM_CART_FAILURE,
  payload: error,
});

export const getOrdersByUserRequest = () => ({
  type: GET_ORDERS_BY_USER_REQUEST,
});

export const getOrdersByUserSuccess = orders => ({
  type: GET_ORDERS_BY_USER_SUCCESS,
  payload: orders,
});

export const getOrdersByUserFailure = error => ({
  type: GET_ORDERS_BY_USER_FAILURE,
  payload: error,
});

export const getOrderByIdRequest = orderId => ({
  type: GET_ORDER_BY_ID_REQUEST,
  payload: orderId,
});

export const getOrderByIdSuccess = order => ({
  type: GET_ORDER_BY_ID_SUCCESS,
  payload: order,
});

export const getOrderByIdFailure = error => ({
  type: GET_ORDER_BY_ID_FAILURE,
  payload: error,
});

export const updateOrderStatusByUserRequest = (orderId, status) => ({
  type: UPDATE_ORDER_STATUS_BY_USER_REQUEST,
  payload: {orderId, status},
});

export const updateOrderStatusByUserSuccess = order => ({
  type: UPDATE_ORDER_STATUS_BY_USER_SUCCESS,
  payload: order,
});

export const updateOrderStatusByUserFailure = error => ({
  type: UPDATE_ORDER_STATUS_BY_USER_FAILURE,
  payload: error,
});
