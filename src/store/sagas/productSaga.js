import {call, put, takeEvery} from 'redux-saga/effects';
import * as productService from '../../services/productService';
import {
  GET_ALL_PRODUCTS_REQUEST,
  GET_PRODUCT_BY_ID_REQUEST,
  GET_PRODUCTS_GROUPED_BY_CATEGORIES_REQUEST,
  getAllProductsFailure,
  getAllProductsSuccess,
  getProductByIdFailure,
  getProductByIdSuccess,
  getProductsGroupedByCategoriesFailure,
  getProductsGroupedByCategoriesSuccess,
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

function* getProductsGroupedByCategoriesSaga(action) {
  try {
    const params = action.payload;
    console.log('Fetching grouped products with params:', params); // Debug log
    const data = yield call(
      productService.getProductsGroupedByCategories,
      params,
    );
    console.log('Grouped products fetched:', JSON.stringify(data)); // Debug log
    yield put(getProductsGroupedByCategoriesSuccess(data));
  } catch (error) {
    console.error('Error fetching grouped products:', error); // Debug log
    yield put(getProductsGroupedByCategoriesFailure(error.message));
  }
}

export default function* watchProductSagas() {
  yield takeEvery(GET_ALL_PRODUCTS_REQUEST, getAllProductsSaga);
  yield takeEvery(GET_PRODUCT_BY_ID_REQUEST, getProductByIdSaga);
  yield takeEvery(
    GET_PRODUCTS_GROUPED_BY_CATEGORIES_REQUEST,
    getProductsGroupedByCategoriesSaga,
  );
}
