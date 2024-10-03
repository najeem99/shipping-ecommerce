import { View, StyleSheet, Dimensions, Pressable } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';

import { colors, spacing, typography } from '../theme';
import { UserDataContext } from "../context/UserDataContext";
import { useContext } from "react";
import { Image } from "react-native";
function Header(props) {
    const { user } = useContext(UserDataContext);
    console.log("Header", user.user.image)
    return (
        <View style={styles.container}>
            <Pressable
                onPress={() => (console.log('menu pressed'))}
            >
                <Icon
                    style={styles.sidebarIcon}
                    name="bars"
                ></Icon>
            </Pressable>
            <View style={styles.imageContainer}>
                <Pressable
                    onPress={() => (console.log('Image pressed'))}
                ><Image
                    style={styles.tinyLogo}
                    source={{ uri: user.user.image }}
                ></Image>
                </Pressable>
            </View>

        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
         justifyContent: 'space-between',
         alignItems: 'center', // Ensure vertical alignment of items

        minHeight: 50, // Set a consistent height for the header
        paddingHorizontal: spacing.xs,
        backgroundColor: colors.palette.neutral300,
        paddingVertical: spacing.xxs
    },
    sidebarIcon: {
        fontSize: spacing.lg,
        marginVertical: 'auto',
        paddingHorizontal: spacing.xs
        // backgroundColor: 'blue'
    },
    imageContainer: {
        flex: 1,
        width: 'auto',
        display: 'flex',
        maxHeight: 40,
        maxWidth: 40,
    },
    tinyLogo: {
        // backgroundColor: 'green',
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        // margin: spacing.xxxs,
        borderRadius: 100,
    },
});
export default Header;