import { db } from "../firebase/firebase.config.js";
import { sendNotification } from "../services/fcm.service.js";

export const notifyAgentsByLocation = async (req, res) => {
  try {
    const { location, position } = req.body;

    if (!location || !position) {
      return res
        .status(400)
        .json({ message: "Location and position are required" });
    }

    const agentsSnapshot = await db
      .collection("agents")
      .where("locations", "array-contains", location)
      .get();
    const filteredAgents = agentsSnapshot.docs.filter((doc) => {
      const data = doc.data();
      return data.position?.includes(position);
    });
    const tokens = filteredAgents
      .map((doc) => doc.data().fcmToken)
      .filter(Boolean);

    if (tokens.length === 0) {
      return res
        .status(404)
        .json({
          message: `No agents found for location "${location}" and position "${position}"`,
        });
    }

    const result = await sendNotification(tokens, {
      title: "New Booking Received",
      body: `A new booking in ${location} requires a ${position}!`,
    });

    res.json({
      message: `Notifications sent successfully to agents in ${location}`,
      result,
    });
  } catch (error) {
    console.error("Error sending notifications:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
