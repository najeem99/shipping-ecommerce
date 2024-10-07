import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FlatList, TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";
import { Products } from "../types/product";
import { getProducts, addToCart, removeFromCart, getCartItems } from "../services/ProductService"; // Import getCartItems
import { UserDataContext } from "../context/UserDataContext";

function ViewProducts(props) {
    const [product, setProducts] = useState<Products[]>([]);
    const [error, setError] = useState(null);
    const [cart, setCart] = useState<Products[]>([]); // State to track products in the cart

    const { user } = useContext(UserDataContext);
    const userId = user.user.id;

    // useEffect to fetch products and cart items
    useEffect(() => {
        const fetchData = async () => {
            await getAllProducts();
            await getAllCartItems();
        };

        fetchData();
    }, [userId]); // Depend on userId to refetch when it changes

    const getAllProducts = async () => {
        try {
            const res = await getProducts();
            setProducts(res);
        } catch (error) {
            console.error(error);
            setError("Failed to fetch products. Please try again later.");
        }
    };

    const getAllCartItems = async () => {
        try {
            const cartItems = await getCartItems(userId);
            console.log('cartItems',cartItems)
            setCart(cartItems); // Update cart state with fetched items
        } catch (error) {
            console.error('Failed to fetch cart items:', error);
            setError("Failed to fetch cart items. Please try again later.");
        }
    };

    // Function to toggle between adding and removing from cart
    const handleCartToggle = (item) => {
        if (cart.some(product => product.id === item.id)) {
            handleRemoveFromCart(item.id);
        } else {
            handleAddToCart(item);
        }
    };

    const handleAddToCart = async (item) => {
        try {
            const updatedCart = await addToCart(userId, item);
            setCart((prevValue) => {
                return [...prevValue, updatedCart]; // Update cart state with new item
            });
         } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    };

    const handleRemoveFromCart = async (productId) => {
        try {
            await removeFromCart(userId, productId); // Assuming this API call confirms the removal
            setCart((prevCart) => prevCart.filter((product) => product.id !== productId)); // Remove the product from the cart state
            console.log('Product removed from cart:', productId);
        } catch (error) {
            console.error('Error removing product from cart:', error);
        }
    };
    
    return (
        <View style={styles.pageContainer}>
            {error && <Text style={styles.errorText}>{error}</Text>}
            <FlatList
                data={product}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    const isInCart = cart.some(product => product.id === item.id); // Check if the item is in the cart here

                    return (
                        <View style={styles.productCard}>
                            <Image
                                source={{ uri: item.productImage }}
                                style={styles.productImage}
                            />
                            <View style={styles.productDetails}>
                                <Text style={styles.productName}>{item.name}</Text>
                                <Text style={styles.productPrice}>{`AED ${item.price}`}</Text>
                                <Text style={styles.productDescription}>{item.description}</Text>
                                <Text style={styles.productDescription}>{String(isInCart)}</Text>
                                <TouchableOpacity
                                    style={[styles.cartButton, isInCart ? styles.removeButton : styles.addButton]}
                                    onPress={() => handleCartToggle(item)}
                                >
                                    <Text style={styles.cartButtonText}>
                                        {isInCart ? 'Remove from Cart' : 'Add to Cart'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    );
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f8f8f8',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    productCard: {
        flexDirection: 'row',
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    productImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 10,
    },
    productDetails: {
        flex: 1,
        justifyContent: 'center',
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    productPrice: {
        fontSize: 14,
        color: '#888',
        marginBottom: 4,
    },
    productDescription: {
        fontSize: 12,
        color: '#666',
        marginBottom: 10,
    },
    cartButton: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 4,
    },
    addButton: {
        backgroundColor: '#28a745',
    },
    removeButton: {
        backgroundColor: '#dc3545',
    },
    cartButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default ViewProducts;
