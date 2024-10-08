import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { getOrders } from '../services/OrderService';
import { UserDataContext } from '../context/UserDataContext';
import { colors, spacing, typography } from '../theme';
import { getProducts } from '../services/ProductService';
import { getAddressByUserId } from '../services/AddressService';
 
const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [addresses, setAddresses] = useState([]); // State to hold addresses
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { user } = useContext(UserDataContext);
    const userId = user.user.id;

    // Fetch orders, products, and addresses when the component mounts
    useEffect(() => {
        const fetchOrdersAndProducts = async () => {
            try {
                // Fetch orders
                const fetchedOrders = await getOrders(userId);
                setOrders(fetchedOrders);

                // Fetch products
                const fetchedProducts = await getProducts();
                setProducts(fetchedProducts);

                // Fetch addresses
                const fetchedAddresses = await getAddressByUserId(userId); // Pass userId if needed
                console.log(fetchedAddresses)
                setAddresses(fetchedAddresses);
            } catch (err) {
                setError(err.message || 'Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        fetchOrdersAndProducts();
    }, [userId]);

    // Render a single product item within an order
    const renderProductItem = (product) => (
        <View key={product.id} style={styles.productContainer}>
            <Image
                style={styles.productImage}
                source={{ uri: product.productImage }} // Use the product image URL
            />
            <View style={styles.productInfo}>
                <Text style={styles.productTitle}>{product.name}</Text>
                <Text numberOfLines={1} ellipsizeMode='tail'  style={styles.productQuantity}>{product.description}</Text>
                <Text style={styles.productPrice}>Price: {product.price} {product.currency}</Text>
            </View>
        </View>
    );

    // Get the delivery address for the order
    const getDeliveryAddress = (addressId) => {
        const matchedAddress = addresses.find(address => (address.id)?.toString() === addressId?.toString());
        return matchedAddress ? `${matchedAddress.building}, ${matchedAddress.area}, ${matchedAddress.city}, ${matchedAddress.country}` : `Address not found`;
    };

    // Render a single order item with its products
    const renderOrderItem = ({ item }) => {
        const orderProducts = item.products.map((orderProduct) => {
            // Match products from the order with the products fetched
            const matchedProduct = products.find(product => product.id === orderProduct.productId);
            return matchedProduct ? { ...matchedProduct, quantity: orderProduct.quantity } : null;
        }).filter(Boolean); 

        const deliveryAddress = getDeliveryAddress(item.deliveryAddress);  

        return (
            <View style={styles.orderCard}>
                <View style={styles.orderInfo}>
                    <Text style={styles.orderTitle}>Order ID: {item.id}</Text>
                    <Text style={styles.orderAmount}>
                        Total: <Text style={styles.amountText}>{item.totalAmount} {item.currency}</Text>
                    </Text>
                    <Text style={styles.paymentMethod}>Payment Method: {item.paymentMethod.type}</Text>
                    <Text style={styles.deliveryAddress}>Delivering to: {deliveryAddress}</Text>
                </View>

                 {orderProducts.length > 0 ? (
                    orderProducts.map(renderProductItem)
                ) : (
                    <Text>No products found for this order</Text>
                )}
            </View>
        );
    };

    // Display a loading indicator while fetching data
    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
    }

    // Handle error display
    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    // Render the list of orders
    return (
        <View style={styles.container}>
            {orders.length > 0 ? (
                <FlatList
                    data={orders}
                    keyExtractor={(item) => item.id}  // Use the 'id' field for unique keys
                    renderItem={renderOrderItem}
                    contentContainerStyle={styles.listContent}
                />
            ) : (
                <Text style={styles.noDataText}>No orders found</Text>
            )}
        </View>
    );
};

export default Orders;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        padding: spacing.sm,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: colors.error,
        fontSize: typography.fontSize.lg,
    },
    noDataText: {
        textAlign: 'center',
        fontSize: typography.fontSize.md,
        color: colors.textDim,
    },
    listContent: {
        paddingBottom: spacing.lg,
    },
    orderCard: {
        backgroundColor: colors.palette.neutral200,
        padding: spacing.md,
        marginVertical: spacing.sm,
        borderRadius: 10,
        shadowColor: colors.palette.neutral900,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    orderInfo: {
        marginBottom: spacing.sm,
    },
    orderTitle: {
        fontSize: typography.fontSize.lg,
        fontWeight: 'bold',
    },
    orderAmount: {
        fontSize: typography.fontSize.md,
        color: colors.palette.neutral700,
        marginVertical: spacing.xs,
    },
    amountText: {
        fontWeight: 'bold',
        color: colors.palette.primary500,
    },
    paymentMethod: {
        fontSize: typography.fontSize.sm,
        color: colors.palette.neutral600,
    },
    deliveryAddress: {
        fontSize: typography.fontSize.sm,
        color: colors.palette.neutral600,
        marginTop: spacing.xs,
    },
    productContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    productImage: {
        width: 60,
        height: 60,
        marginRight: spacing.sm,
        borderRadius: 8,
        backgroundColor: colors.palette.neutral300,
    },
    productInfo: {
        flex: 1,
    },
    productTitle: {
        fontSize: typography.fontSize.md,
        fontWeight: 'bold',
    },
    productQuantity: {
        fontSize: typography.fontSize.sm,
        color: colors.palette.neutral700,
    },
    productPrice: {
        fontSize: typography.fontSize.sm,
        color: colors.palette.primary500,
    },
});
