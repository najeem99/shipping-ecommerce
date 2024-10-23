Here's the `README.md` in a single file format:

```markdown
# React Native Expo Project

This project is a React Native application built with Expo. It supports both Android and iOS platforms, providing a seamless mobile development experience.

## Getting Started

To set up the project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-repo-name.git
   ```

2. **Navigate to the project directory**:
   ```bash
   cd your-project-directory
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Start the Expo development server**:
   ```bash
   npx expo start
   ```

## Project Structure

```
/android              # Android-specific files
/ios                  # iOS-specific files
/assets               # App assets (images, fonts, etc.)
/src                  # Source code
  /components         # Reusable UI components
  /screens            # App screens
  /services           # API services and logic
.env                  # Environment variables
package.json          # Project dependencies and scripts
.gitignore            # Git ignored files
```

## Available Scripts

Here are some common scripts you can run:

- **Start the Expo server**:
  ```bash
  npx expo start
  ```

- **Prebuild the project (Android/iOS)**:
  ```bash
  npx expo prebuild
  ```

- **Run the project on Android**:
  ```bash
  npx expo run:android
  ```

- **Run the project on iOS**:
  ```bash
  npx expo run:ios
  ```

- **Build the project locally**:
  ```bash
  eas build --local
  ```

- **Initialize Expo Application Services (EAS)**:
  ```bash
  eas init
  ```

## ADB Commands

Below are some useful Android Debug Bridge (ADB) commands for managing your Android development environment:

- **List connected devices**:
  ```bash
  adb devices
  ```

- **List all packages (including uninstalled)**:
  ```bash
  adb shell cmd package list packages -u
  ```

- **Run ADB as root**:
  ```bash
  adb root
  ```

- **List Android users**:
  ```bash
  adb shell pm list users
  ```

- **List packages for user 0**:
  ```bash
  adb shell cmd package list packages --user 0 -u
  ```

- **Reinstall an existing package**:
  ```bash
  adb shell cmd package install-existing com.najeem.shipecommerce
  ```

- **Uninstall a package**:
  ```bash
  adb shell pm uninstall com.najeem.shipecommerce
  ```

- **Clean the Gradle project**:
  ```bash
  ./gradlew clean
  ```

- **View error logs from Logcat**:
  ```bash
  adb logcat *:E
  ```

## Useful Links

- [Firebase HTTP V1 Push Notifications with React Native Expo | Foreground & Background Tutorial](https://www.youtube.com/watch?v=yCBecuxzUuU)
- [Expo Run Commands](https://blog.expo.dev/introducing-expo-run-commands-835ae8da4813)
- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
```

This `README.md` contains all the necessary details, including setup instructions, ADB commands, and useful links, all in a single-file format.
