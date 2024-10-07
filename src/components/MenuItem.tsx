import { TouchableOpacity, Image, Text, StyleSheet } from "react-native";
import { colors, spacing, typography } from "../theme";


function MenuItem({ imageUrl, title, ...props }) {
    return (
        <TouchableOpacity 
        style={[styles.menuItem]} 
        { ...props}>
            <Image
                style={{
                    width: 150,
                    height: 150,
                    margin: 'auto',
                }}
                source={{ uri: imageUrl }}
            ></Image>
            <Text style={{
                textAlign: 'center',
            }}>{title}</Text>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({

    menuContainer: {
        backgroundColor: 'white',
        borderRadius: 25,
        width: '100%',
        minHeight: 100,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        alignSelf: 'flex-start',
        gap: 10,
        paddingHorizontal: spacing.xs,
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


export default MenuItem;