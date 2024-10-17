import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { ThemeProvider } from './src/util/ThemeManager';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from "expo-font"
import { customFontsToLoad } from './src/theme';
import ApplicationNavigator from './src/navigation/ApplicationNavigator';
import { UserAuthProvider } from './src/context/UserDataContext';
import { registerRootComponent } from 'expo';
import { useEffect } from 'react';
import NotificationService from './src/services/NotificationService';

export default function App() {
  const [areFontsLoaded, fontLoadError] = useFonts(customFontsToLoad)

  useEffect(() => {
    async function setupNotifications() {
      await NotificationService.configurePushNotifications();
    }

    setupNotifications();
  }, []);


  useEffect(() => {
    const subscription1 = NotificationService.subscribeToNotifications((notification) => {
      console.log(JSON.parse(JSON.stringify(notification)));
    });

    const subscription2 = NotificationService.subscribeToNotificationResponse((response) => {
      console.log('ResponseReceived', response);
    });

    return () => {
      subscription1.remove();
      subscription2.remove();
    };
  }, [])

  if (!areFontsLoaded && !fontLoadError) {
    return null
  }

  return (
    <ThemeProvider>
      <SafeAreaView style={styles.container}>
        <UserAuthProvider>
          <ApplicationNavigator />
        </UserAuthProvider>

        <StatusBar style="auto" />
      </SafeAreaView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
registerRootComponent(App);

// AppRegistry.registerComponent(appName, () => App);
// AppRegistry.registerComponent(appName.toLowerCase(), () => App);
