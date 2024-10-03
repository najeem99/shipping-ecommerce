import { View, Text, Image, StyleSheet } from "react-native";
import { UserDataContext } from "../context/UserDataContext";
import { useContext } from "react";
import Header from "../components/Header";

function Dashboard(props) {
    const { user } = useContext(UserDataContext);
     return (
        <View>
            <View style={styles.profileContainer}>

            {/* <Image
                style={styles.tinyLogo}
                source={{uri: user.user.image}}

            ></Image>
            <Text>Welcome Back {user.user.name}</Text> */}
            <Header></Header>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({

    tinyLogo: {
        width: 100,
        height: 100,
        margin: 2,
        borderRadius:10,
    },
    profileContainer:{
        flexDirection:'row',
    }

});

export default Dashboard;