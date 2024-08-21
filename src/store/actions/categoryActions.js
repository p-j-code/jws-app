export const GET_ALL_CATEGORIES_REQUEST = 'GET_ALL_CATEGORIES_REQUEST';
export const GET_ALL_CATEGORIES_SUCCESS = 'GET_ALL_CATEGORIES_SUCCESS';
export const GET_ALL_CATEGORIES_FAILURE = 'GET_ALL_CATEGORIES_FAILURE';

export const GET_CATEGORY_BY_ID_REQUEST = 'GET_CATEGORY_BY_ID_REQUEST';
export const GET_CATEGORY_BY_ID_SUCCESS = 'GET_CATEGORY_BY_ID_SUCCESS';
export const GET_CATEGORY_BY_ID_FAILURE = 'GET_CATEGORY_BY_ID_FAILURE';

export const GET_CATEGORY_OPTIONS_REQUEST = 'GET_CATEGORY_OPTIONS_REQUEST';
export const GET_CATEGORY_OPTIONS_SUCCESS = 'GET_CATEGORY_OPTIONS_SUCCESS';
export const GET_CATEGORY_OPTIONS_FAILURE = 'GET_CATEGORY_OPTIONS_FAILURE';

export const getCategoryOptionsRequest = (params) => ({
  type: GET_CATEGORY_OPTIONS_REQUEST,
  payload: params,
});

export const getCategoryOptionsSuccess = (options) => ({
  type: GET_CATEGORY_OPTIONS_SUCCESS,
  payload: options,
});

export const getCategoryOptionsFailure = (error) => ({
  type: GET_CATEGORY_OPTIONS_FAILURE,
  payload: error,
});

export const getAllCategoriesRequest = (params) => ({
  type: GET_ALL_CATEGORIES_REQUEST,
  payload: params,
});

export const getAllCategoriesSuccess = (categories) => ({
  type: GET_ALL_CATEGORIES_SUCCESS,
  payload: categories,
});

export const getAllCategoriesFailure = (error) => ({
  type: GET_ALL_CATEGORIES_FAILURE,
  payload: error,
});

export const getCategoryByIdRequest = (categoryId) => ({
  type: GET_CATEGORY_BY_ID_REQUEST,
  payload: categoryId,
});

export const getCategoryByIdSuccess = (category) => ({
  type: GET_CATEGORY_BY_ID_SUCCESS,
  payload: category,
});

export const getCategoryByIdFailure = (error) => ({
  type: GET_CATEGORY_BY_ID_FAILURE,
  payload: error,
});
