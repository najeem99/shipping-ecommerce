import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import Dashboard from '../screens/Dashboard';
import ViewProducts from '../screens/ViewProducts';
import Orders from '../screens/Orders';
import MyAddress from '../screens/MyAddress';
import Header from '../components/Header';
import { CartProvider } from '../context/CartContext';
import CartModal from '../components/Modal/CartModal';

const ProtectedStack = createNativeStackNavigator();

export const ProtectedNavigator = () => {

    return (
        <CartProvider>
            <ProtectedStack.Navigator
                initialRouteName="Dashboard"
                screenOptions={{
                    headerShown: true,
                    header: (props) => <Header  {...props} ></Header>
                }}
            >
                <ProtectedStack.Screen
                    name="Dashboard"
                    component={Dashboard}

                />
                <ProtectedStack.Screen
                    name="ViewProducts"
                    component={ViewProducts}
                    options={{ headerTitle: 'View Products' }}

                />
                <ProtectedStack.Screen
                    name="Orders"
                    component={Orders}
                    options={{ headerTitle: 'Orders' }}

                />
                <ProtectedStack.Screen
                    name="MyAddress"
                    component={MyAddress}
                    options={{ headerTitle: 'My Address' }}

                />
            </ProtectedStack.Navigator>
            <CartModal></CartModal>
        </CartProvider>
    );
};
