import { View, Text, Image, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { UserDataContext } from "../context/UserDataContext";
import { useContext } from "react";
import { colors, spacing, typography } from "../theme";
import MenuItem from "../components/MenuItem";

function Dashboard({ navigation, props }) {
    const { user } = useContext(UserDataContext);
    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.profileContainer}>
                <Text style={styles.title}>Dashboard</Text>
                <Text style={styles.welcomeText}>Hello {user.user.name}</Text>

                <View style={styles.menuContainer}>

                    <MenuItem
                        onPress={() => navigation.navigate('ViewProducts')}
                        imageUrl={"https://cdn-icons-png.freepik.com/256/4577/4577267.png?semt=ais_hybrid"}
                        title="Products"
                    ></MenuItem>
                    <MenuItem
                        onPress={() => navigation.navigate('MyAddress')}
                        imageUrl={"https://cdn-icons-png.freepik.com/256/1288/1288563.png?semt=ais_hybrid"}
                        title="My Address"
                    ></MenuItem>
                    <MenuItem
                        onPress={() => navigation.navigate('Orders')}
                        imageUrl={"https://cdn-icons-png.freepik.com/256/3045/3045670.png?semt=ais_hybrid"}
                        title="My Orders"
                    ></MenuItem>
                    <MenuItem
                        onPress={() => navigation.navigate('CartModal')}
                        imageUrl={"https://i.pinimg.com/564x/6d/87/85/6d8785745ce4bfcfde76814d29e3c569.jpg"}
                        title="My Cart"
                    ></MenuItem>

                </View>
            </View>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1, // Allows the ScrollView to take the full height
    },

    profileContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.tint,
        minHeight: 130,
        height: '100%',
        borderBottomLeftRadius: 30,  // Bottom-left corner rounded
        borderBottomRightRadius: 30, // Bottom-right corner rounded
    },
    title: {
        color: colors.palette.neutral100,
        fontSize: typography.fontSize.xxl,
        paddingHorizontal: spacing.sm,
        paddingTop: spacing.md,
        fontWeight: 'bold',
    },
    welcomeText: {
        color: colors.palette.neutral100,
        fontSize: typography.fontSize.lg,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.md,

    },
    menuContainer: {
        backgroundColor: 'white',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        alignSelf: 'flex-start',
        gap: 10,
        paddingHorizontal: spacing.xs,
        flex: 1,
        height: '100%',
    },
    menuItem: {
        // flex: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
        borderRadius: 25,
        minHeight: 100,
        minWidth: 10,
        backgroundColor: 'white',
        width: '48%',
        marginVertical: 10,
    }

});

export default Dashboard;