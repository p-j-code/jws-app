import { call, put, takeEvery } from 'redux-saga/effects';
import * as cartService from '../../services/cartService';
import {
  GET_CART_REQUEST,
  MODIFY_CART_REQUEST,
  CLEAR_CART_REQUEST,
  getCartFailure,
  getCartSuccess,
  modifyCartFailure,
  modifyCartSuccess,
  clearCartFailure,
  clearCartSuccess,
} from '../actions/cartActions';

function* getCartSaga() {
  try {
    const data = yield call(cartService.getCartByUserId);
    yield put(getCartSuccess(data));
  } catch (error) {
    yield put(getCartFailure(error.message));
  }
}

function* modifyCartSaga(action) {
  try {
    const data = yield call(cartService.modifyCart, action.payload);
    yield put(modifyCartSuccess(data));
  } catch (error) {
    yield put(modifyCartFailure(error.message));
  }
}

function* clearCartSaga() {
  try {
    const data = yield call(cartService.clearCart);
    yield put(clearCartSuccess(data));
  } catch (error) {
    yield put(clearCartFailure(error.message));
  }
}

export default function* watchCartSagas() {
  yield takeEvery(GET_CART_REQUEST, getCartSaga);
  yield takeEvery(MODIFY_CART_REQUEST, modifyCartSaga);
  yield takeEvery(CLEAR_CART_REQUEST, clearCartSaga);
}
