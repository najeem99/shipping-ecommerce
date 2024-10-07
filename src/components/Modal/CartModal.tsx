import React from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';
import { useCart } from '../../context/CartContext';
 
const CartModal = () => {
    const { isCartVisible, toggleCart } = useCart();

    return (
        <Modal
            visible={isCartVisible}
            animationType="slide"
            onRequestClose={toggleCart}
        >
            <View style={styles.container}>
                <Text>Your Cart</Text>
                {/* Add your cart items here */}
                <Button title="Close Cart" onPress={toggleCart} />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default CartModal;
