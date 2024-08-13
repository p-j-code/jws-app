import {all} from 'redux-saga/effects';
import authSaga from './authSaga';
import watchProductSagas from './productSaga';
import watchCartSagas from './cartSaga';
import watchOrderSagas from './orderSaga';
import watchCategorySagas from './categorySaga';

export default function* rootSaga() {
  yield all([
    authSaga(),
    watchProductSagas(),
    watchCartSagas(),
    watchOrderSagas(),
    watchCategorySagas(),
  ]);
}
