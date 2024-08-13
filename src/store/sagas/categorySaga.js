import { call, put, takeEvery } from 'redux-saga/effects';
import * as categoryService from '../../services/categoryService';
import {
  GET_ALL_CATEGORIES_REQUEST,
  GET_CATEGORY_BY_ID_REQUEST,
  getAllCategoriesFailure,
  getAllCategoriesSuccess,
  getCategoryByIdFailure,
  getCategoryByIdSuccess,
} from '../actions/categoryActions';

function* getAllCategoriesSaga(action) {
  try {
    const params = action.payload;
    const data = yield call(categoryService.getAllCategories, params);
    yield put(getAllCategoriesSuccess(data));
  } catch (error) {
    yield put(getAllCategoriesFailure(error.message));
  }
}

function* getCategoryByIdSaga(action) {
  try {
    const categoryId = action.payload;
    const data = yield call(categoryService.getCategoryById, categoryId);
    yield put(getCategoryByIdSuccess(data));
  } catch (error) {
    yield put(getCategoryByIdFailure(error.message));
  }
}

export default function* watchCategorySagas() {
  yield takeEvery(GET_ALL_CATEGORIES_REQUEST, getAllCategoriesSaga);
  yield takeEvery(GET_CATEGORY_BY_ID_REQUEST, getCategoryByIdSaga);
}
