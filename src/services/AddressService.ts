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

// POST: Add new address for the user by user ID
export const postAddressForUser = async (userId, newAddress) => {
  try {
    const response = await axios.post(`${API_URL}/users/${userId}/address`, newAddress);
    return response.data;
  } catch (error) {
    console.error("Error posting new address:", error);
    throw error;
  }
};

// PUT: Update existing address for the user by user ID and address ID
export const updateAddressForUser = async (userId, addressId, updatedAddress) => {
  try {
    const response = await axios.put(`${API_URL}/users/${userId}/address/${addressId}`, updatedAddress);
    return response.data;
  } catch (error) {
    console.error("Error updating the address:", error);
    throw error;
  }
};
