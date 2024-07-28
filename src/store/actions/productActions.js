// src/store/actions/productActions.js

export const GET_ALL_PRODUCTS_REQUEST = 'GET_ALL_PRODUCTS_REQUEST';
export const GET_ALL_PRODUCTS_SUCCESS = 'GET_ALL_PRODUCTS_SUCCESS';
export const GET_ALL_PRODUCTS_FAILURE = 'GET_ALL_PRODUCTS_FAILURE';

export const GET_PRODUCT_BY_ID_REQUEST = 'GET_PRODUCT_BY_ID_REQUEST';
export const GET_PRODUCT_BY_ID_SUCCESS = 'GET_PRODUCT_BY_ID_SUCCESS';
export const GET_PRODUCT_BY_ID_FAILURE = 'GET_PRODUCT_BY_ID_FAILURE';

export const getAllProductsRequest = (params) => ({
  type: GET_ALL_PRODUCTS_REQUEST,
  payload: params,
});

export const getAllProductsSuccess = (products) => ({
  type: GET_ALL_PRODUCTS_SUCCESS,
  payload: products,
});

export const getAllProductsFailure = (error) => ({
  type: GET_ALL_PRODUCTS_FAILURE,
  payload: error,
});

export const getProductByIdRequest = (productId) => ({
  type: GET_PRODUCT_BY_ID_REQUEST,
  payload: productId,
});

export const getProductByIdSuccess = (product) => ({
  type: GET_PRODUCT_BY_ID_SUCCESS,
  payload: product,
});

export const getProductByIdFailure = (error) => ({
  type: GET_PRODUCT_BY_ID_FAILURE,
  payload: error,
});
