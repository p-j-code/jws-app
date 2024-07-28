import {all} from 'redux-saga/effects';
import authSaga from './authSaga';
import watchProductSagas from './productSaga';

export default function* rootSaga() {
  yield all([authSaga(), watchProductSagas()]);
}
