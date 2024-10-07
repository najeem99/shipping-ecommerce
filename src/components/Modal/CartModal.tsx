import React from 'react';
import { Modal, View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { useCart } from '../../context/CartContext';
import Button from '../Button';
import { colors } from '../../theme';

const CartModal = () => {
    const { isCartVisible, toggleCart, cartItems } = useCart();

    // Calculate total cart value
    const totalCartValue = cartItems
        .reduce((total, item) => total + parseFloat(item.price), 0)
        .toFixed(2); // Round to two decimal places

    const handleCheckout = () => {
        // Implement your checkout logic here
        console.log('Checkout pressed',cartItems);
        // You can navigate to a checkout screen or perform further actions.
    };

    return (
        <Modal
            visible={isCartVisible}
            animationType="slide"
            onRequestClose={toggleCart}
        >
            <View style={styles.container}>
                <Text style={styles.header}>Your Cart</Text>

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

                <Text style={styles.totalValue}>Total: AED {totalCartValue}</Text>

                <View style={styles.buttonContainer}>

                    <Button label='Checkout'
                        style={styles.checkoutButton}
                        onPress={handleCheckout}
                    ></Button>
                    <Button label='Close Cart'
                        style={styles.closeButton}
                        onPress={toggleCart}
                    ></Button>

                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: colors.background,
        borderRadius:20,
        marginHorizontal:10,
        marginVertical:20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    itemContainer: {
        flexDirection: 'row',
        marginBottom: 15,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 10,
    },
    itemDetails: {
        flex: 1,
        justifyContent: 'space-between',
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemDescription: {
        fontSize: 14,
        color: '#666',
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    itemQuantity: {
        fontSize: 14,
        color: '#666',
    },
    totalValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        marginTop: 20,
        textAlign: 'center',
    },
    buttonContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-around', 
        alignItems: 'center',
    },
    checkoutButton: {
        backgroundColor: '#4CAF50', 
        marginRight: 10, 
        alignItems: 'center',
        width: '100%',
    },
    closeButton: {
        backgroundColor: '#f44336', 
        width: '100%',

    },
});

export default CartModal;
