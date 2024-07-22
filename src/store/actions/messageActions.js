// src/store/actions/messageActions.js

export const SET_MESSAGE = 'SET_MESSAGE';
export const CLEAR_MESSAGE = 'CLEAR_MESSAGE';

export const setMessage = (message, messageType) => ({
  type: SET_MESSAGE,
  payload: {message, messageType},
});

export const clearMessage = () => ({
  type: CLEAR_MESSAGE,
});
