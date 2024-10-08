import React, { createContext, useState, useContext, useEffect } from 'react';
import { useUserData } from './UserDataContext';
import { clearCartItems, getCartItems } from '../services/ProductService';

const CartContext = createContext(null);

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    // const [isCartVisible, setCartVisible] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const { user } = useUserData();

    useEffect(() => {
        const fetchData = async () => {
            await getAllCartItems();
        };

        fetchData();
    }, [user.user.id]); // Depend on userId to refetch when it changes


    // const toggleCart = () => {
    //     setCartVisible(prev => !prev);
    // };

    const addToCart = (product) => {
        setCartItems((prevValue) => {
            return [...prevValue, product]; // Update cart state with new item
        });
        console.log('Product added to cart:', product.name);
    };

    const removeFromCart = (productId) => {
        setCartItems((prevCart) => prevCart.filter((product) => product.id !== productId)); // Remove the product from the cart state
        console.log('Product removed from cart:', productId);
    };

    const setInitialCartItems = (items) => {
        setCartItems(items); // Remove the product from the cart state
    };
    const clearCart = async () => {
        try {
            await clearCartItems(user.user.id); // Call the service to clear the cart in the backend
            setCartItems([]); // Clear the cart items in the state
            console.log('Cart cleared successfully.');
        } catch (error) {
            console.error('Error clearing cart:', error);
        }
    };

    const getAllCartItems = async () => {
        try {
            const cartItems = await getCartItems(user.user.id);
            setInitialCartItems(cartItems); // Update cart state with fetched items
        } catch (error) {
            console.error('Failed to fetch cart items:', error);
        }
    };


    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
