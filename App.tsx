import { StatusBar } from 'expo-status-bar';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import { ThemeProvider } from './src/util/ThemeManager';
import Login from './src/screens/Login';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from "expo-font"
import { customFontsToLoad } from './src/theme';
import Register from './src/screens/Register';
import ApplicationNavigator from './src/navigation/ApplicationNavigator';
import { UserAuthProvider } from './src/context/UserDataContext';
import { name as appName } from "./app.json";
import { registerRootComponent } from 'expo';

export default function App() {
  const [areFontsLoaded, fontLoadError] = useFonts(customFontsToLoad)
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
    // backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
  },
});
registerRootComponent(App);

// AppRegistry.registerComponent(appName, () => App);
// AppRegistry.registerComponent(appName.toLowerCase(), () => App);
