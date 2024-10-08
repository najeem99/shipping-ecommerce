import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, FlatList, ScrollView } from "react-native";
import { UserDataContext } from "../context/UserDataContext"; // Assuming this context holds user info
import { getAddressByUserId } from "../services/AddressService"; // Mocked service to get user addresses
import { getCartItems } from "../services/ProductService";
import { Picker } from "@react-native-picker/picker";
import { colors, spacing, typography } from "../theme";
import Button from "../components/Button";
import { createOrder } from "../services/OrderService";
import { useCart } from "../context/CartContext";

const Checkout = ({ navigation }) => {
    const { user } = useContext(UserDataContext);
    const { clearCart } = useCart();
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("COD");
    const [addresses, setAddresses] = useState([]);
    const [orderItems, setOrderItems] = useState([]);
    const [totalCosts, setTotalCosts] = useState(null);
    const userId = user.user.id;

    // Sample data, replace with your actual API calls
    const paymentMethods = [
        { label: "Cash on Delivery (COD)", value: "COD" },
        { label: "Credit Card", value: "CreditCard" },
        { label: "PayPal", value: "PayPal" }
    ];



    const fetchAddressesAndOrderItems = async () => {
        try {
            const fetchedAddresses = await getAddressByUserId(userId);
            const fetchedOrderItems = await getCartItems(userId);
            setAddresses(fetchedAddresses);
            setOrderItems(fetchedOrderItems);
            setDefaultAddress();
            calculateOrderItems(fetchedOrderItems);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const setDefaultAddress = () => {
        addresses.forEach((address) => {
            console.log(address.isDefault === true)
            if (address.isDefault === true) {
                setSelectedAddress(address.id);
            }
        })
    }
    const calculateOrderItems = (items) => {
        const baseAmount = items.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2);
        const taxAmount = (baseAmount * 0.05).toFixed(2);// 5% tax
        setTotalCosts({
            'baseAmount': baseAmount,
            'taxAmount': taxAmount,
            'totalAmount': (parseFloat(baseAmount) + parseFloat(taxAmount)).toFixed(2),
        })
    }

    useEffect(() => {
        fetchAddressesAndOrderItems();
    }, [user]);

    const handleCheckout = async () => {

        const orderPayload = {
            id: `order-${new Date().getTime()}`,
            products: orderItems.map(item => ({ productId: item.id })),
            deliveryAddress: selectedAddress,
            paymentMethod: {
                type: selectedPaymentMethod,
                currency: "AED"
            },
            baseAmount: totalCosts?.baseAmount || 0,
            taxAmount: totalCosts?.taxAmount || 0,
            totalAmount: totalCosts?.totalAmount || 0,
            currency: "AED"
        };

        console.log("Order Payload:", orderPayload);
        // Proceed with order processing here
        try {
            const newOrder = await createOrder(userId, orderPayload);
            console.log('Order created successfully:');
            clearCart();
            navigation.replace('Orders');

        } catch (error) {
            console.error('Failed to create order:', error);
        }

    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.subtitle}>Order Items</Text>
            <View>
                {orderItems.map((item) => (
                    <View style={styles.itemContainer} key={item.id}>
                        <Image source={{ uri: item.productImage }} style={styles.image} />
                        <View style={styles.itemDetails}>
                            <Text style={styles.itemName}>{item.name}</Text>
                            <Text numberOfLines={2} ellipsizeMode='tail' style={styles.itemDescription}>
                                {item.description}
                            </Text>
                            <Text style={styles.itemPrice}>AED {item.price}</Text>
                        </View>
                    </View>
                ))}
            </View>

            <Text style={styles.subtitle}>Select Delivery Address</Text>
            <View style={styles.pickerContainer}>

                <Picker
                    selectedValue={selectedAddress}
                    onValueChange={(itemValue) => setSelectedAddress(itemValue)}
                    style={styles.picker}
                >
                    {addresses?.length == 0 && <Picker.Item style={styles.pickerItem} label="No Delivery Address found" value={null} />}
                    {addresses.map((address) => (
                        <Picker.Item style={styles.pickerItem}
                            key={address.id}
                            label={address?.building + " " + address?.country}
                            value={address.id} />
                    ))}
                </Picker>
            </View>

            <Text style={styles.subtitle}>Select Payment Method</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={selectedPaymentMethod}
                    onValueChange={(itemValue) => setSelectedPaymentMethod(itemValue)}
                    style={styles.picker}>
                    {paymentMethods.map((method) => (
                        <Picker.Item
                            style={styles.pickerItem}
                            key={method.value}
                            label={method.label}
                            value={method.value} />
                    ))}
                </Picker>
            </View>

            <View style={styles.costContainer}>
                <Text style={styles.subtitle}>Base Amount: </Text>

                <Text style={styles.amount}>AED {totalCosts?.baseAmount}</Text>
            </View>
            <View style={styles.costContainer}>

                <Text style={styles.subtitle}>Tax Amount (5%): </Text>
                <Text style={styles.amount}>AED {totalCosts?.taxAmount}</Text>
            </View>
            <View style={styles.costContainer}>


                <Text style={styles.subtitle}>Total Amount (including VAT): </Text>
                <Text style={styles.amount}>AED {totalCosts?.totalAmount}</Text>
            </View>

            <Button label="Checkout"
                disabled={selectedAddress == null}
                onPress={handleCheckout} style={{ marginVertical: 10 }} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: spacing.xs,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    subtitle: {
        color: colors.text,
        fontSize: typography.fontSize.xl,
        fontFamily: typography.primary.light,
        marginVertical: 10,
    },
    orderItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    pickerContainer: {
        borderWidth: 1,
        backgroundColor: colors.palette.neutral100,
        borderColor: colors.border,
        borderRadius: 10,
    },
    picker: {
        height: 50,
        width: "100%",
    },
    pickerItem: {
        color: colors.text,
        fontFamily: typography.primary.medium,
        fontSize: typography.fontSize.xl,

    },
    itemContainer: {
        flexDirection: 'row',
        marginBottom: spacing.sm,
        padding: spacing.sm,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
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
    image: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: spacing.sm,
    },
    costContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    amount: {
        flex: 1,
        fontWeight: 'bold', // Make the amount bold
        color: colors.tint, // You can customize this color as needed
        textAlign: 'right',
        fontSize: typography.fontSize.xl,
    },

});

export default Checkout;
