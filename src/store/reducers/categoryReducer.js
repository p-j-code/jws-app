import {
  GET_ALL_CATEGORIES_REQUEST,
  GET_ALL_CATEGORIES_SUCCESS,
  GET_ALL_CATEGORIES_FAILURE,
  GET_CATEGORY_BY_ID_REQUEST,
  GET_CATEGORY_BY_ID_SUCCESS,
  GET_CATEGORY_BY_ID_FAILURE,
  GET_CATEGORY_OPTIONS_REQUEST,
  GET_CATEGORY_OPTIONS_SUCCESS,
  GET_CATEGORY_OPTIONS_FAILURE,
} from '../actions/categoryActions';

const initialState = {
  loading: false,
  categories: [],
  categoryDetails: null,
  categoryOptions: [],
  error: null,
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CATEGORIES_REQUEST:
    case GET_CATEGORY_BY_ID_REQUEST:
    case GET_CATEGORY_OPTIONS_REQUEST:
      return {...state, loading: true, error: null};
    case GET_ALL_CATEGORIES_SUCCESS:
      return {...state, loading: false, categories: action.payload};
    case GET_CATEGORY_BY_ID_SUCCESS:
      return {...state, loading: false, categoryDetails: action.payload};
    case GET_CATEGORY_OPTIONS_SUCCESS:
      return {...state, loading: false, categoryOptions: action.payload};
    case GET_ALL_CATEGORIES_FAILURE:
    case GET_CATEGORY_BY_ID_FAILURE:
    case GET_CATEGORY_OPTIONS_FAILURE:
      return {...state, loading: false, error: action.payload};
    default:
      return state;
  }
};

export default categoryReducer;
