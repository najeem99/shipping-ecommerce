import { NavigationContainer } from '@react-navigation/native';
import { AuthNavigator } from './AuthStack';

function ApplicationNavigator() {
    console.log('ApplicationNavigator')
    return (
        <NavigationContainer>
            <AuthNavigator />
        </NavigationContainer>
    );
}

export default ApplicationNavigator;

