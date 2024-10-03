import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from '../screens/Dashboard';
import { Text } from 'react-native';
import Header from '../components/Header';
const ProctectedStack = createStackNavigator();

export const ProctectedNavigator = () => (
    <ProctectedStack.Navigator initialRouteName="Dashboard"
        
    screenOptions={{header: Header}}


        >
        <ProctectedStack.Screen name="Dashboard" component={Dashboard} 
             
        />
    </ProctectedStack.Navigator>
);
