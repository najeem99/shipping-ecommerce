import axios from 'axios';

const API_URL = 'https://66f3d20277b5e8897096fce5.mockapi.io/';

export const getUsers = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/v1/user`)
        return response.data
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }


}