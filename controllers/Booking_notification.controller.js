import { messaging } from "../firebase/firebase.config.js";

export const sendBookingNotification = async (req, res) => {
  try {
    const { title, body, imageUrl, fcmTokens } = req.body;

    if (
      !title ||
      !body ||
      !Array.isArray(fcmTokens) ||
      fcmTokens.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing or invalid parameters: title, body, fcmTokens",
      });
    }

    const message = {
      notification: {
        title,
        body,
        image: imageUrl || undefined,
      },
      tokens: fcmTokens,
    };

    const response = await messaging.sendEachForMulticast(message);

    return res.status(200).json({
      success: true,
      message: "Notification(s) sent successfully",
      response,
    });
  } catch (error) {
    console.error("Error sending notification:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send notifications",
      error: error.message,
    });
  }
};
