import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { Alert, Platform } from 'react-native';

const NotificationService = {
    async configurePushNotifications() {
        const { status } = await Notifications.getPermissionsAsync();
        let finalStatus = status;

        if (finalStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        if (finalStatus !== 'granted') {
            Alert.alert('Permission Required for Push Notifications');
            return;
        }

        try {
            const pushTokenString = (await Notifications.getExpoPushTokenAsync({
                projectId: Constants.expoConfig.extra.eas.projectId,
            }));
            console.log(pushTokenString);

            if (Platform.OS === 'android') {
                await Notifications.setNotificationChannelAsync('default', {
                    name: 'default',
                    importance: Notifications.AndroidImportance.MAX,
                });
            }
        } catch (e: unknown) {
            console.log(`${e}`);
        }
    },

    subscribeToNotifications(onNotificationReceived: (notification: Notifications.Notification) => void) {
        return Notifications.addNotificationReceivedListener(onNotificationReceived);
    },

    subscribeToNotificationResponse(onResponseReceived: (response: Notifications.NotificationResponse) => void) {
        return Notifications.addNotificationResponseReceivedListener(onResponseReceived);
    },

    async scheduleNotification(title: string, body: string, data?: any) {
        await Notifications.scheduleNotificationAsync({
            content: {
                title,
                body,
                data,
            },
            trigger: null,
        });
    },
};

export default NotificationService;
