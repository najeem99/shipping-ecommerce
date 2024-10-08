import axios from 'axios';
const API_URL = process.env.EXPO_PUBLIC_API_URL;

// Function to get orders for a specific user
export const getOrders = async (userId) => {
  console.log('getOrders',API_URL)
  try {
    const response = await axios.get(`${API_URL}/users/${userId}/orders`);
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

// Function to create a new order for a specific user
export const createOrder = async (userId, orderData) => {
  try {
    const response = await axios.post(`${API_URL}/users/${userId}/orders`, orderData);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};
