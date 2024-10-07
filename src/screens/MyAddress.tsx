import React, { useContext, useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { UserDataContext } from "../context/UserDataContext";
import { getAddressByUserId } from "../services/AddressService";
import { colors, spacing, typography } from '../theme';

// MyAddress.js
function MyAddress() {
    const [address, setAddress] = useState(null);
    const [error, setError] = useState(null);
    const { user } = useContext(UserDataContext);
    const userId = user.user.id;

    useEffect(() => {
        const fetchAddress = async () => {
            try {
                const fetchedAddress = await getAddressByUserId(userId);
                setAddress(fetchedAddress);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchAddress();
    }, []);

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Error: {error}</Text>
            </View>
        );
    }

    if (!address) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>User Address:</Text>
            {address.map((addr) => (
                <View key={addr.id} style={styles.addressCard}>
                    <Text style={styles.addressText}>City: <Text style={styles.addressValue}>{addr.city}</Text></Text>
                    <Text style={styles.addressText}>Country: <Text style={styles.addressValue}>{addr.country}</Text></Text>
                    <Text style={styles.addressText}>Area: <Text style={styles.addressValue}>{addr.area}</Text></Text>
                    <Text style={styles.addressText}>Building: <Text style={styles.addressValue}>{addr.building}</Text></Text>
                    <Text style={styles.addressText}>Landmark: <Text style={styles.addressValue}>{addr.landmark}</Text></Text>
                    <Text style={styles.addressText}>Default: <Text style={styles.addressValue}>{addr.isDefault ? "Yes" : "No"}</Text></Text>
                </View>
            ))}
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
        backgroundColor: colors.palette.neutral200, // Changed for visual contrast
        shadowColor: colors.palette.neutral400, // Add shadow for depth
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5, // For Android shadow
    },
    addressText: {
        fontSize: typography.fontSize.md,
        color: colors.text,
        marginVertical: spacing.xs / 2, // Added margin for spacing between lines
    },
    addressValue: {
        fontWeight: '600', // Use semi-bold for emphasis
        color: colors.palette.primary600, // Change color for address values for emphasis
    },
    errorText: {
        color: colors.error,
        fontSize: typography.fontSize.md,
    },
});

export default MyAddress;
