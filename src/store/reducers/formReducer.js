// reducers/formReducer.js
import {UPDATE_FORM, CLEAR_FORM} from '../actions/formActions';

const initialState = {};

export const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_FORM:
      return {
        ...state,
        [action.payload.formName]: {
          ...state[action.payload.formName],
          ...action.payload.data,
        },
      };
    case CLEAR_FORM:
      const {[action.payload.formName]: removedForm, ...rest} = state;
      return rest;
    default:
      return state;
  }
};
