import React from 'react';
import { Modal, View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { useCart } from '../../context/CartContext';
import Button from '../Button';
import { colors, spacing, typography } from '../../theme';

const CartModal = ({navigation}) => {
    const { isCartVisible, toggleCart, cartItems } = useCart();

    // Calculate total cart value
    const totalCartValue = cartItems
        .reduce((total, item) => total + parseFloat(item.price), 0)
        .toFixed(2); // Round to two decimal places

    const handleCheckout = () => {
        // Implement your checkout logic here
        console.log('Checkout pressed',cartItems);
        navigation.navigate('Checkout')
        // You can navigate to a checkout screen or perform further actions.
    };

    return (
            <View style={styles.container}>
                <Text style={styles.header}>Your Cart</Text>
                {cartItems.length === 0 ? (
                <Text style={styles.emptyCartText}>Your cart is empty.</Text>
            ) : (
                 <FlatList
                    data={cartItems} // Show only items in cart
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                            <Image source={{ uri: item.productImage }} style={styles.image} />
                            <View style={styles.itemDetails}>
                                <Text style={styles.itemName}>{item.name}</Text>
                                <Text style={styles.itemDescription}>{item.description}</Text>
                                <Text style={styles.itemPrice}>AED {item.price}</Text>
                             </View>
                        </View>
                    )}
                />
            )}

                <Text style={styles.totalValue}>Total: AED {totalCartValue}</Text>

                <View style={styles.buttonContainer}>

                    <Button label='Checkout'
                        style={styles.checkoutButton}
                        onPress={handleCheckout}
                    ></Button>
                    <Button label='Close Cart'
                        style={styles.closeButton}
                        // onPress={toggleCart}
                        onPress={() => navigation.goBack()}
                    ></Button>

                </View>
            </View>
     );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: spacing.md,
        backgroundColor: colors.background,
        borderRadius: 20,
        marginHorizontal: spacing.sm,
        marginVertical: spacing.md,
    },
    header: {
        fontSize: typography.fontSize.lg,
        fontWeight: 'bold',
        marginBottom: spacing.sm,
        textAlign: 'center',
    },
    itemContainer: {
        flexDirection: 'row',
        marginBottom: spacing.sm,
        padding: spacing.sm,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: spacing.sm,
    },
    itemDetails: {
        flex: 1,
        justifyContent: 'space-between',
    },
    itemName: {
        fontSize: typography.fontSize.md,
        fontWeight: 'bold',
    },
    itemDescription: {
        fontSize: typography.fontSize.sm,
        color: '#666',
    },
    itemPrice: {
        fontSize: typography.fontSize.md,
        fontWeight: 'bold',
        color: '#000',
    },
    itemQuantity: {
        fontSize: typography.fontSize.sm,
        color: '#666',
    },
    totalValue: {
        fontSize: typography.fontSize.lg,
        fontWeight: 'bold',
        color: '#000',
        marginTop: spacing.md,
        textAlign: 'center',
    },
    buttonContainer: {
        marginTop: spacing.md,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    checkoutButton: {
        backgroundColor: '#4CAF50',
        marginRight: spacing.sm,
        alignItems: 'center',
        width: '100%',
    },
    closeButton: {
        backgroundColor: '#f44336',
        width: '100%',
    },
    emptyCartText: {
        fontSize: typography.fontSize.md,
        color: '#666',
        textAlign: 'center',
        marginTop: spacing.md,
        height:'70%',
    },

});


export default CartModal;
