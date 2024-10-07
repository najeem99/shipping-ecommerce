import Login from "../screens/Login";
import Register from "../screens/Register";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const AuthStack = createNativeStackNavigator();

export const AuthNavigator = () => (
    <AuthStack.Navigator initialRouteName="Login"
        screenOptions={{
            headerShown: false
        }}
    >
        <AuthStack.Screen name="Login" component={Login} />
        <AuthStack.Screen name="Register" component={Register} />
    </AuthStack.Navigator>
);
