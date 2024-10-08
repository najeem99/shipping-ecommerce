import { View, StyleSheet, Pressable, Text, Image } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { colors, spacing, typography } from '../theme';
import { UserDataContext, useUserData } from "../context/UserDataContext";
import { useContext } from "react";
import React from "react";
import { useCart } from "../context/CartContext";

function Header({ options, route, navigation: { goBack,navigate }, ...props }) {
    const { user } = useUserData();
    const { isCartVisible, toggleCart } = useCart(); // Use cart context

    const commonHeader = () => {
        return (
            <>
                <Pressable onPress={() => goBack()}>
                    <Icon style={styles.sidebarIcon} name="chevron-left" />
                </Pressable>

                <Text style={styles.title}>{options?.headerTitle}</Text>

                <Pressable onPress={() => navigate('CartModal')}>
                    <Icon style={styles.sidebarIcon} name="shopping-cart" />
                </Pressable>
            </>

        )
    }
    const dashboardHeader = () => {
        return (
            <>
                <Pressable onPress={() => console.log('menu pressed')}>
                    <Icon style={styles.sidebarIcon} name="bars" />
                </Pressable>

                <Text style={styles.title}>{options?.headerTitle}</Text>

                <View style={styles.imageContainer}>
                    <Pressable onPress={() => console.log('Image pressed')}>
                        <Image style={styles.tinyLogo} source={{ uri: user.user.image }} />
                    </Pressable>
                </View>
            </>

        )
    }
    return (
        <View style={styles.container}>
            {route.name === 'Dashboard' ? dashboardHeader() : commonHeader()}
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: 50,
        paddingHorizontal: spacing.xs,
        backgroundColor: colors.tint,
        paddingVertical: spacing.xxs,
    },
    sidebarIcon: {
        fontSize: spacing.lg,
        marginVertical: 'auto',
        paddingHorizontal: spacing.xs,
        color: colors.palette.neutral100,
    },
    title: {
        flex: 1,
        fontSize: typography.fontSize.md,
        fontWeight: 'bold',
        color: colors.palette.neutral100,
        textAlign: 'center',
    },
    imageContainer: {
        flex: 1,
        width: 'auto',
        maxHeight: 40,
        maxWidth: 40,
    },
    tinyLogo: {
        width: '100%',
        height: '100%',
        borderRadius: 100,
    },
});

export default Header;
