import React, { useContext, useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { UserDataContext } from "../context/UserDataContext";
import { getAddressByUserId } from "../services/AddressService";
import { colors, spacing, typography } from '../theme';
import Button from "../components/Button";
import Icon from 'react-native-vector-icons/FontAwesome5';
import AddAddressModal from "../components/Modal/AddAddressModal";

function MyAddress() {
    const [address, setAddress] = useState([]);
    const [error, setError] = useState(null);
    const [editableAddress, setEditableAddress] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false); // State for modal visibility
    const { user } = useContext(UserDataContext);


    const userId = user.user.id;
    
    const fetchAddress = async () => {
        try {
            const fetchedAddress = await getAddressByUserId(userId);
            setAddress(fetchedAddress);
        } catch (err) {
            setError(err.message);
        }
    };



    useEffect(() => {
        fetchAddress();
    }, [userId]); // Include userId as a dependency

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Error: {error}</Text>
            </View>
        );
    }

    if (!address.length) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color={colors.palette.primary600} />
            </View>
        );
    }
    const handleClick = (value) => {
        if (value) {
            setEditableAddress(value)
        } else {
            setEditableAddress(null)
        }
        setModalVisible(true)
    }
    const closeModal = () => {
        setModalVisible(false);
        fetchAddress();
    }
    // Render each address item
    const renderAddressItem = ({ item }) => (
        <TouchableOpacity style={styles.addressCard} onPress={() => handleClick(item)} >
            <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }} >
                <Text style={styles.addressText}>City: <Text style={styles.addressValue}>{item.city}</Text></Text>
                {/* <Icon style={styles.defaultIcon} name="check-circle" /> */}
                {item.isDefault && <Icon style={styles.defaultIcon} name="check-circle" />}
            </View>
            <Text style={styles.addressText}>Country: <Text style={styles.addressValue}>{item.country}</Text></Text>
            <Text style={styles.addressText}>Area: <Text style={styles.addressValue}>{item.area}</Text></Text>
            <Text style={styles.addressText}>Building: <Text style={styles.addressValue}>{item.building}</Text></Text>
            <Text style={styles.addressText}>Landmark: <Text style={styles.addressValue}>{item.landmark}</Text></Text>
            {/* <Text style={styles.addressText}>Default: <Text style={styles.addressValue}>{item.isDefault ? "Yes" : "No"}</Text></Text> */}

        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Button style={styles.addButton}
                onPress={() => setModalVisible(true)}
                label="Add New Address"
            >
            </Button>
            <FlatList
                data={address}
                renderItem={renderAddressItem}
                keyExtractor={(item) => item.id.toString()} // Ensure unique keys for each item
                contentContainerStyle={styles.listContainer} // Optional: For padding or margins
            />
            <AddAddressModal
                isVisible={isModalVisible}
                editableData={editableAddress}
                onClose={() => closeModal()}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: spacing.md,
        backgroundColor: colors.background,
    },
    title: {
        fontSize: typography.fontSize.xxl,
        fontWeight: 'bold',
        marginBottom: spacing.sm,
    },
    addressCard: {
        marginVertical: spacing.xs,
        padding: spacing.md,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 8,
        backgroundColor: colors.palette.neutral200,
        shadowColor: colors.palette.neutral400,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
    },
    addressText: {
        fontSize: typography.fontSize.md,
        color: colors.text,
        marginVertical: spacing.xs / 2,
    },
    addressValue: {
        fontWeight: '600',
        color: colors.palette.primary600,
    },
    errorText: {
        color: colors.error,
        fontSize: typography.fontSize.md,
    },
    addButton: {
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
    },
    listContainer: {
        paddingBottom: spacing.md, // Optional padding for the bottom of the list
    },
    defaultIcon: {
        fontSize: spacing.lg,
        marginVertical: 'auto',
        paddingHorizontal: spacing.xs,
        color: 'green',

    }
});

export default MyAddress;
