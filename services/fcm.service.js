import { messaging } from "../firebase/firebase.config.js";

export const sendNotification = async (tokens, notification) => {
  const message = {
    notification,
    tokens,
    android: {
      notification: {
        sound: "notification_sound",
        priority: "high",
      },
    },
    apns: {
      payload: {
        aps: {
          sound: "notification_sound.mp3",
        },
      },
    },
    data: {
      sound: "notification_sound",
    },
  };

  return await messaging.sendEachForMulticast(message);
};
