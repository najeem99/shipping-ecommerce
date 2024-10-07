import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext(null);

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [isCartVisible, setCartVisible] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    const toggleCart = () => {
        setCartVisible(prev => !prev);
    };

    const addToCart = (product) => {
        setCartItems((prevValue) => {
            return [...prevValue, product]; // Update cart state with new item
        });
    };

    const removeFromCart = (productId) => {
        setCartItems((prevCart) => prevCart.filter((product) => product.id !== productId)); // Remove the product from the cart state
        console.log('Product removed from cart:', productId);
    };

    const setInitialCartItems = (items) => {
        setCartItems(items); // Remove the product from the cart state
    };


    return (
        <CartContext.Provider value={{ isCartVisible, toggleCart, cartItems, addToCart,removeFromCart,setInitialCartItems }}>
            {children}
        </CartContext.Provider>
    );
};
