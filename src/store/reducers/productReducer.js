import {
  GET_ALL_PRODUCTS_REQUEST,
  GET_ALL_PRODUCTS_SUCCESS,
  GET_ALL_PRODUCTS_FAILURE,
  GET_PRODUCT_BY_ID_REQUEST,
  GET_PRODUCT_BY_ID_SUCCESS,
  GET_PRODUCT_BY_ID_FAILURE,
  GET_PRODUCTS_GROUPED_BY_CATEGORIES_REQUEST,
  GET_PRODUCTS_GROUPED_BY_CATEGORIES_SUCCESS,
  GET_PRODUCTS_GROUPED_BY_CATEGORIES_FAILURE,
} from '../actions/productActions';

const initialState = {
  loading: false,
  products: [],
  productDetails: null,
  groupedProducts: [],
  error: null,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS_REQUEST:
    case GET_PRODUCT_BY_ID_REQUEST:
    case GET_PRODUCTS_GROUPED_BY_CATEGORIES_REQUEST:
      return {...state, loading: true, error: null};
    case GET_ALL_PRODUCTS_SUCCESS:
      return {...state, loading: false, products: action.payload};
    case GET_PRODUCT_BY_ID_SUCCESS:
      return {...state, loading: false, productDetails: action.payload};
    case GET_PRODUCTS_GROUPED_BY_CATEGORIES_SUCCESS:
      return {...state, loading: false, groupedProducts: action.payload};
    case GET_ALL_PRODUCTS_FAILURE:
    case GET_PRODUCT_BY_ID_FAILURE:
    case GET_PRODUCTS_GROUPED_BY_CATEGORIES_FAILURE:
      return {...state, loading: false, error: action.payload};
    default:
      return state;
  }
};

export default productReducer;
