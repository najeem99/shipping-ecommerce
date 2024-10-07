import axios from 'axios';

const API_URL = 'http://192.168.56.1:3000';

// Function to get orders for a specific user
export const getOrders = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/users/${userId}/orders`);
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};
