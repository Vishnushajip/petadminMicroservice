import express from "express";
import { sendBookingNotification } from "../controllers/Booking_notification.controller.js";
import { notifyAgentsByLocation } from "../controllers/notification.controller.js";

const router = express.Router();

router.post("/", notifyAgentsByLocation);
router.post("/sendBookingNotification", sendBookingNotification);

export default router;
