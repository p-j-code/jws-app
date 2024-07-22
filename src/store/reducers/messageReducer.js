// src/store/reducers/messageReducer.js

import {SET_MESSAGE, CLEAR_MESSAGE} from '../actions/messageActions';

const initialState = {
  message: '',
  messageType: '',
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MESSAGE:
      return {
        ...state,
        message: action.payload.message,
        messageType: action.payload.messageType,
      };
    case CLEAR_MESSAGE:
      return {
        ...state,
        message: '',
        messageType: '',
      };
    default:
      return state;
  }
};

export default messageReducer;
