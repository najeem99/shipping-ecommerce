import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FlatList, TouchableOpacity, View, Text, Image, StyleSheet, ActivityIndicator } from "react-native";
import { Products } from "../types/product";
import { getProducts, addToCart as addToCartApi, removeFromCart as removeFromCartApi, getCartItems } from "../services/ProductService";
import { UserDataContext } from "../context/UserDataContext";
import { useCart } from "../context/CartContext";
import { colors, spacing, typography } from "../theme";

function ViewProducts(props) {
    const [product, setProducts] = useState<Products[]>([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); // State to track loading status
    const { cartItems, addToCart, removeFromCart } = useCart(); // Use cart context

    const { user } = useContext(UserDataContext);
    const userId = user.user.id;

    // useEffect to fetch products and cart items
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // Start loading
            await getAllProducts();
            setLoading(false); // End loading
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


    // Function to toggle between adding and removing from cart
    const handleCartToggle = (item) => {
        if (cartItems.some(product => product.id === item.id)) {
            handleRemoveFromCart(item.id);
        } else {
            handleAddToCart(item);
        }
    };

    const handleAddToCart = async (item) => {
        try {
             const updatedCart = await addToCartApi(userId, item);
            addToCart(item)
        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    };

    const handleRemoveFromCart = async (productId) => {
        try {
            await removeFromCartApi(userId, productId); // Assuming this API call confirms the removal
            removeFromCart(productId)
            console.log('Product removed from cart:', productId);
        } catch (error) {
            console.error('Error removing product from cart:', error);
        }
    };

    return (
        <View style={styles.pageContainer}>
            {error && <Text style={styles.errorText}>{error}</Text>}
            {loading ? ( // Show loading indicator while fetching data
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={product}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                        const isInCart = cartItems.some(product => product.id === item.id); // Check if the item is in the cart here

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
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        padding: spacing.sm,
        backgroundColor: colors.background,
    },
    errorText: {
        color: colors.error,
        marginBottom: spacing.xs,
    },
    productCard: {
        flexDirection: 'row',
        padding: spacing.sm,
        marginBottom: spacing.sm,
        backgroundColor: colors.palette.white,
        borderRadius: spacing.xs,
        shadowColor: colors.palette.black,
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    productImage: {
        width: 80,
        height: 80,
        borderRadius: spacing.xs,
        marginRight: spacing.sm,
    },
    productDetails: {
        flex: 1,
        justifyContent: 'center',
    },
    productName: {
        fontSize: typography.fontSize.md,
        fontWeight: 'bold',
        marginBottom: spacing.xxs,
    },
    productPrice: {
        fontSize: typography.fontSize.sm,
        color: colors.tint,
        marginBottom: spacing.xxs,
        fontWeight:'bold',
    },
    productDescription: {
        fontSize: typography.fontSize.xs,
        color: colors.text,
        marginBottom: spacing.sm,
    },
    cartButton: {
        paddingVertical: spacing.xs,
        paddingHorizontal: spacing.sm,
        borderRadius: spacing.xs,
    },
    addButton: {
        backgroundColor: colors.tint,
    },
    removeButton: {
        backgroundColor: colors.error,
    },
    cartButtonText: {
        color: colors.palette.white,
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default ViewProducts;
