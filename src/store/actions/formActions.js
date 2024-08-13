// actions/formActions.js
export const UPDATE_FORM = 'UPDATE_FORM';
export const CLEAR_FORM = 'CLEAR_FORM';

export const updateForm = (formName, data) => ({
  type: UPDATE_FORM,
  payload: {formName, data},
});

export const clearForm = formName => ({
  type: CLEAR_FORM,
  payload: {formName},
});
