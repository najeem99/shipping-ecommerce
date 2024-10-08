import axios from 'axios';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

export const saveUser = async (payload) => {
  try {
    const response = await axios.post(`${API_URL}/users/`, payload);
    return response.data;
  } catch (error) {
    console.error('Error saving User:', error);
    throw error;
  }
};
