import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { getOrders } from '../services/OrderService';
import { UserDataContext } from '../context/UserDataContext';
const Orders = ({ props }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { user } = useContext(UserDataContext);
    const userId = user.user.id;

    // Fetch orders when the component mounts
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const fetchedOrders = await getOrders(userId);
                setOrders(fetchedOrders);
            } catch (err) {
                setError(err.message || 'Failed to fetch orders');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [userId]);

    // Render a single order item
    const renderOrderItem = ({ item }) => (
        <View style={styles.orderItem}>
            <Text style={styles.orderText}>Product ID: {item.productId}</Text>
            <Text style={styles.orderText}>Total Amount: {item.totalAmount} {item.currency}</Text>
            <Text style={styles.orderText}>Payment Method: {item.paymentMethod.type}</Text>
        </View>
    );

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
                    keyExtractor={(item) => item.productId}
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
        padding: 20,
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
        color: 'red',
        fontSize: 18,
    },
    noDataText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#888',
    },
    listContent: {
        paddingBottom: 20,
    },
    orderItem: {
        backgroundColor: '#f8f8f8',
        padding: 15,
        marginVertical: 8,
        borderRadius: 8,
    },
    orderText: {
        fontSize: 16,
    },
});
