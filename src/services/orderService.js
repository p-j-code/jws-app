import api from './api';

// Create a new order from cart
export const createOrderFromCart = async () => {
  try {
    const response = await api.post('/orders/from-cart');
    return response.data;
  } catch (error) {
    return {error: error.response ? error.response.data : error.message};
  }
};

// Get all orders for a user
export const getOrdersByUserId = async () => {
  try {
    const response = await api.get('/orders/user');
    return response.data;
  } catch (error) {
    return {error: error.response ? error.response.data : error.message};
  }
};

// Get an order by ID
export const getOrderById = async orderId => {
  try {
    const response = await api.get(`/orders/${orderId}`);
    return response.data;
  } catch (error) {
    return {error: error.response ? error.response.data : error.message};
  }
};

// Update order status by user
export const updateOrderStatusByUser = async (orderId, status) => {
  try {
    const response = await api.put(`/orders/${orderId}/status/user`, {
      orderStatus: status,
    });
    return response.data;
  } catch (error) {
    return {error: error.response ? error.response.data : error.message};
  }
};
