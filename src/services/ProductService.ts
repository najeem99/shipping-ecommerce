import axios from 'axios';

const API_URL = process.env.EXPO_PUBLIC_API_URL;
const MOCK_API_URL = process.env.EXPO_PUBLIC_MOCKAPI_URL;

export const getProducts = async () => {
    try {
        console.log(MOCK_API_URL);
        const response = await axios.get(MOCK_API_URL)
        return response.data
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }


}

export const addToCart = async (userId, product) => {
    try {
        console.log(`${API_URL}/users/${userId}/cartItems`),
            console.log(product)
        const response = await axios.post(`${API_URL}/users/${userId}/cartItems`, product );

        return response.data; // Return the response data
    } catch (error) {
        console.error('Error adding to cart:', error);
        throw error; // Throw the error to handle it in the calling function
    }
};

// Function to remove a product from the cart
export const removeFromCart = async (userId, productId) => {
    try {
        console.log(`${API_URL}/users/${userId}/cartItems/${productId}`)

        const response = await axios.delete(`${API_URL}/users/${userId}/cartItems/${productId}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data; // Return the response data
    } catch (error) {
        console.error('Error removing from cart:', error);
        throw error; // Throw the error to handle it in the calling function
    }
};

export const getCartItems = async (userId) => {
    try {
        console.log(`${API_URL}/users/${userId}/cartItems`); // Log the API URL for debugging
        const response = await axios.get(`${API_URL}/users/${userId}/cartItems`);

        return response.data; // Return the response data
    } catch (error) {
        console.error('Error fetching cart items:', error);
        throw error; // Throw the error to handle it in the calling function
    }
};

// Function to clear all items from the cart
export const clearCartItems = async (userId) => {
    try {
        console.log(`${API_URL}/users/${userId}/cartItems`); // Log the API URL for debugging

        // Perform a DELETE request to remove all cart items
        const response = await axios.delete(`${API_URL}/users/${userId}/cartItems`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data; // Return the response data
    } catch (error) {
        console.error('Error clearing cart:', error);
        throw error; // Throw the error to handle it in the calling function
    }
};
