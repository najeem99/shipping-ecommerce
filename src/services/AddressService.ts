// addressService.js
import axios from 'axios';

const API_URL = 'http://192.168.56.1:3000';

export const getAddressByUserId = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/users/${userId}/address`);
    return response.data;
  } catch (error) {
    console.error("Error fetching address:", error);
    throw error;
  }
};
