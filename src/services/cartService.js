import api from './api';

export const getCartByUserId = async () => {
  try {
    const response = await api.get('/cart');
    return response.data;
  } catch (error) {
    return { error: error.response ? error.response.data : error.message };
  }
};

export const modifyCart = async (payload) => {
  try {
    const response = await api.post('/cart/modify', payload);
    return response.data;
  } catch (error) {
    return { error: error.response ? error.response.data : error.message };
  }
};

export const clearCart = async () => {
  try {
    const response = await api.delete('/cart');
    return response.data;
  } catch (error) {
    return { error: error.response ? error.response.data : error.message };
  }
};
