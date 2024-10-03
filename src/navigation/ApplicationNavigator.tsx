import { NavigationContainer } from '@react-navigation/native';
import { AuthNavigator } from './AuthStack';
import { useContext } from 'react';
import { UserDataContext } from '../context/UserDataContext';
import { ProctectedNavigator } from './ProtectedStack';

function ApplicationNavigator() {
    console.log("AuthNavigator");
    const { isSignedIn } = useContext(UserDataContext);

    return (
        <NavigationContainer>
            {isSignedIn ? <ProctectedNavigator /> : <AuthNavigator />}
        </NavigationContainer>
    );
}

export default ApplicationNavigator;

