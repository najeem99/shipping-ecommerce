import { TouchableOpacity, Image, Text, StyleSheet } from "react-native";
import { colors, spacing, typography } from "../theme";

function MenuItem({ imageUrl, title, ...props }) {
    return (
        <TouchableOpacity style={styles.menuItem} {...props}>
            <Image
                style={styles.image}
                source={{ uri: imageUrl }}
            />
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    menuItem: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
        borderRadius: 25,
        backgroundColor: 'white',
        width: '48%',
        marginVertical: 10,
        padding: spacing.sm, // Add padding for better spacing
        alignItems: 'center', // Center align items
    },
    image: {
        width: 120, // Adjusted width
        height: 120, // Adjusted height
        borderRadius: 15, // Rounded corners for the image
        marginBottom: spacing.xs, // Spacing below the image
    },
    title: {
        textAlign: 'center',
        fontSize: typography.fontSize.md, // Assuming you have typography defined
        fontWeight: 'bold', // Make the title bold
        color: colors.tint, // Use a primary color for the title
    },
});

export default MenuItem;
