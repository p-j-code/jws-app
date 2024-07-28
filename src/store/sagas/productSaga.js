// src/store/sagas/productSaga.js

import {call, put, takeEvery} from 'redux-saga/effects';

import * as productService from '../../services/productService';
import {
  GET_ALL_PRODUCTS_REQUEST,
  GET_PRODUCT_BY_ID_REQUEST,
  getAllProductsFailure,
  getAllProductsSuccess,
  getProductByIdFailure,
  getProductByIdSuccess,
} from '../actions/productActions';

function* getAllProductsSaga(action) {
  try {
    const params = action.payload;
    console.log('Fetching products with params:', params); // Debug log
    const data = yield call(productService.getAllProducts, params);
    console.log('Products fetched:', JSON.stringify(data)); // Debug log
    yield put(getAllProductsSuccess(data));
  } catch (error) {
    console.error('Error fetching products:', error); // Debug log
    yield put(getAllProductsFailure(error.message));
  }
}

function* getProductByIdSaga(action) {
  try {
    const productId = action.payload;
    const data = yield call(productService.getProductById, productId);
    yield put(getProductByIdSuccess(data));
  } catch (error) {
    yield put(getProductByIdFailure(error.message));
  }
}

export default function* watchProductSagas() {
  yield takeEvery(GET_ALL_PRODUCTS_REQUEST, getAllProductsSaga);
  yield takeEvery(GET_PRODUCT_BY_ID_REQUEST, getProductByIdSaga);
}
