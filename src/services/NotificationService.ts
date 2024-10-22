import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { Alert, Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';

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
            messaging().getToken().then((token) =>{
                console.log('token==',token)

            })
            messaging().getInitialNotification().then(async (remoteMessage)=>{
                if(remoteMessage)
                        console.log(remoteMessage.notification)
            })
            //assume a message-notification contains type payload
            messaging().onNotificationOpenedApp((remoteMessage)=>{
                console.log('notf opened from bg',remoteMessage.notification)
            });

            messaging().setBackgroundMessageHandler(async (remoteMessage)=>{
                console.log('setBackgroundMessageHandler',remoteMessage.notification)

            })

            const unsubscribe = messaging().onMessage(async (remoteMessage)=>{
                // Alert.alert("a new fcm received",JSON.stringify(remoteMessage))
                console.log('a new fcm received',remoteMessage)

            })
            // const pushTokenString = (await Notifications.getExpoPushTokenAsync({
            //     projectId: Constants.expoConfig.extra.eas.projectId,
            // }));
            // console.log(pushTokenString);

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
