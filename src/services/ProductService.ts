import axios from 'axios';

const API_URL = 'http://192.168.56.1:3000';

export const getProducts = async () => {
    try {
        console.log(`https://66f3d20277b5e8897096fce5.mockapi.io/api/v1/Products`);
        const response = await axios.get(`https://66f3d20277b5e8897096fce5.mockapi.io/api/v1/Products`)
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
