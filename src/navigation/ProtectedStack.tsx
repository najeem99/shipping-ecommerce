import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createStackNavigator} from "@react-navigation/stack";

import { useEffect, useState } from 'react';
import Dashboard from '../screens/Dashboard';
import ViewProducts from '../screens/ViewProducts';
import Orders from '../screens/Orders';
import MyAddress from '../screens/MyAddress';
import Header from '../components/Header';
import { CartProvider } from '../context/CartContext';
import CartModal from '../components/Modal/CartModal';
import Checkout from '../screens/Checkout';

const ProtectedStack = createStackNavigator();

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
                <ProtectedStack.Screen
                    name="Checkout"
                    component={Checkout}
                    options={{ headerTitle: 'Checkout' }}

                />
                <ProtectedStack.Screen
                    name="CartModal"
                    component={CartModal}
                    options={{
                        headerShown: false,
                        presentation: 'modal',
                    }}
                />

            </ProtectedStack.Navigator>
            {/* <CartModal></CartModal> */}
        </CartProvider>
    );
};
