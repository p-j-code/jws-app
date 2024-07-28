// src/store/reducers/productReducer.js

import {
    GET_ALL_PRODUCTS_REQUEST,
    GET_ALL_PRODUCTS_SUCCESS,
    GET_ALL_PRODUCTS_FAILURE,
    GET_PRODUCT_BY_ID_REQUEST,
    GET_PRODUCT_BY_ID_SUCCESS,
    GET_PRODUCT_BY_ID_FAILURE,
  } from '../actions/productActions';
  
  const initialState = {
    loading: false,
    products: [],
    productDetails: null,
    error: null,
  };
  
  const productReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_ALL_PRODUCTS_REQUEST:
      case GET_PRODUCT_BY_ID_REQUEST:
        return { ...state, loading: true, error: null };
      case GET_ALL_PRODUCTS_SUCCESS:
        return { ...state, loading: false, products: action.payload };
      case GET_PRODUCT_BY_ID_SUCCESS:
        return { ...state, loading: false, productDetails: action.payload };
      case GET_ALL_PRODUCTS_FAILURE:
      case GET_PRODUCT_BY_ID_FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default productReducer;
  