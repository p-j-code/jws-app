import api from './api';

export const getAllCategories = async params => {
  try {
    const response = await api.get('/categories', {params});
    return response.data.data;
  } catch (error) {
    return {error: error.response ? error.response.data : error.message};
  }
};

export const getCategoryById = async categoryId => {
  try {
    const response = await api.get(`/categories/${categoryId}`);
    return response.data;
  } catch (error) {
    return {error: error.response ? error.response.data : error.message};
  }
};
