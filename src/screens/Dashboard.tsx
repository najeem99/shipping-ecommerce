import { View, Text, Image, StyleSheet } from "react-native";
import { UserDataContext } from "../context/UserDataContext";
import { useContext } from "react";
import Header from "../components/Header";
import { colors } from "../theme";

function Dashboard(props) {
    const { user } = useContext(UserDataContext);
     return (
        <View>
            <View style={styles.profileContainer}>

            {/* <Header></Header> */}
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
        backgroundColor:colors.tint,
    }

});

export default Dashboard;