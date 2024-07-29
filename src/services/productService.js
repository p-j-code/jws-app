import api from './api';

export const getAllProducts = async params => {
  try {
    const response = await api.get('/products', {params});
    return response.data;
  } catch (error) {
    return {error: error.response ? error.response.data : error.message};
  }
};

export const getProductById = async productId => {
  try {
    const response = await api.get(`/products/${productId}`);
    return response.data;
  } catch (error) {
    return {error: error.response ? error.response.data : error.message};
  }
};

export const getProductsGroupedByCategories = async params => {
  try {
    const response = await api.get('/products', {
      params: {groupByParentCategories: true, ...params},
    });
    return response.data;
  } catch (error) {
    return {error: error.response ? error.response.data : error.message};
  }
};
