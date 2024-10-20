import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import rootSaga from './sagas';
import {initializeAuth} from '../utils/storage';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      // Disable the immutable state invariant middleware in development
      immutableCheck: false,
      // Disable serializable check if needed
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

// Dispatch the initializeAuth action to set the token from storage
store.dispatch(initializeAuth());

export default store;
