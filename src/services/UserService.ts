import axios from 'axios';

const API_URL = 'http://192.168.0.98:3000';

export const getUsers = async () => {
    try {
      const response = await fetch(`${API_URL}/users/`);
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  };
  