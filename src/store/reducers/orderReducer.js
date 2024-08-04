import {
    CREATE_ORDER_FROM_CART_REQUEST,
    CREATE_ORDER_FROM_CART_SUCCESS,
    CREATE_ORDER_FROM_CART_FAILURE,
    GET_ORDERS_BY_USER_REQUEST,
    GET_ORDERS_BY_USER_SUCCESS,
    GET_ORDERS_BY_USER_FAILURE,
    GET_ORDER_BY_ID_REQUEST,
    GET_ORDER_BY_ID_SUCCESS,
    GET_ORDER_BY_ID_FAILURE,
    UPDATE_ORDER_STATUS_BY_USER_REQUEST,
    UPDATE_ORDER_STATUS_BY_USER_SUCCESS,
    UPDATE_ORDER_STATUS_BY_USER_FAILURE,
  } from '../actions/orderActions';
  
  const initialState = {
    loading: false,
    orders: [],
    orderDetails: null,
    error: null,
  };
  
  const orderReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_ORDER_FROM_CART_REQUEST:
      case GET_ORDERS_BY_USER_REQUEST:
      case GET_ORDER_BY_ID_REQUEST:
      case UPDATE_ORDER_STATUS_BY_USER_REQUEST:
        return { ...state, loading: true, error: null };
      case CREATE_ORDER_FROM_CART_SUCCESS:
        return { ...state, loading: false, orders: [action.payload, ...state.orders] };
      case GET_ORDERS_BY_USER_SUCCESS:
        return { ...state, loading: false, orders: action.payload };
      case GET_ORDER_BY_ID_SUCCESS:
        return { ...state, loading: false, orderDetails: action.payload };
      case UPDATE_ORDER_STATUS_BY_USER_SUCCESS:
        return {
          ...state,
          loading: false,
          orders: state.orders.map((order) =>
            order._id === action.payload._id ? action.payload : order
          ),
        };
      case CREATE_ORDER_FROM_CART_FAILURE:
      case GET_ORDERS_BY_USER_FAILURE:
      case GET_ORDER_BY_ID_FAILURE:
      case UPDATE_ORDER_STATUS_BY_USER_FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default orderReducer;
  