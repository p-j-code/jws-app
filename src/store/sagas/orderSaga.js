import {call, put, takeEvery} from 'redux-saga/effects';
import * as orderService from '../../services/orderService';
import {
  CREATE_ORDER_FROM_CART_REQUEST,
  GET_ORDERS_BY_USER_REQUEST,
  GET_ORDER_BY_ID_REQUEST,
  UPDATE_ORDER_STATUS_BY_USER_REQUEST,
  createOrderFromCartFailure,
  createOrderFromCartSuccess,
  getOrdersByUserFailure,
  getOrdersByUserSuccess,
  getOrderByIdFailure,
  getOrderByIdSuccess,
  updateOrderStatusByUserFailure,
  updateOrderStatusByUserSuccess,
} from '../actions/orderActions';

function* createOrderFromCartSaga(action) {
  try {
    const data = yield call(orderService.createOrderFromCart);

    action.payload.successCallback && action.payload.successCallback();
    yield put(createOrderFromCartSuccess(data));
  } catch (error) {
    yield put(createOrderFromCartFailure(error.message));
  }
}

function* getOrdersByUserSaga() {
  try {
    const data = yield call(orderService.getOrdersByUserId);
    yield put(getOrdersByUserSuccess(data));
  } catch (error) {
    yield put(getOrdersByUserFailure(error.message));
  }
}

function* getOrderByIdSaga(action) {
  try {
    const orderId = action.payload;
    const data = yield call(orderService.getOrderById, orderId);
    yield put(getOrderByIdSuccess(data));
  } catch (error) {
    yield put(getOrderByIdFailure(error.message));
  }
}

function* updateOrderStatusByUserSaga(action) {
  try {
    const {orderId, status} = action.payload;
    const data = yield call(
      orderService.updateOrderStatusByUser,
      orderId,
      status,
    );
    yield put(updateOrderStatusByUserSuccess(data));
  } catch (error) {
    yield put(updateOrderStatusByUserFailure(error.message));
  }
}

export default function* watchOrderSagas() {
  yield takeEvery(CREATE_ORDER_FROM_CART_REQUEST, createOrderFromCartSaga);
  yield takeEvery(GET_ORDERS_BY_USER_REQUEST, getOrdersByUserSaga);
  yield takeEvery(GET_ORDER_BY_ID_REQUEST, getOrderByIdSaga);
  yield takeEvery(
    UPDATE_ORDER_STATUS_BY_USER_REQUEST,
    updateOrderStatusByUserSaga,
  );
}
