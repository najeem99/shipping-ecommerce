import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from '../screens/Dashboard';
import { Button, Text } from 'react-native';
import Header from '../components/Header';
import ViewProducts from '../screens/ViewProducts';
import Orders from '../screens/Orders';
import MyAddress from '../screens/MyAddress';
const ProctectedStack = createNativeStackNavigator();

export const ProctectedNavigator = () => (
    <ProctectedStack.Navigator initialRouteName="Dashboard"

        screenOptions={{
            headerShown: true,
            header: Header
        }}


    >
        <ProctectedStack.Screen name="Dashboard" component={Dashboard} />
        <ProctectedStack.Screen name="ViewProducts" component={ViewProducts} />
        <ProctectedStack.Screen name="Orders" component={Orders} />
        <ProctectedStack.Screen name="MyAddress" component={MyAddress} />
    </ProctectedStack.Navigator>
);
