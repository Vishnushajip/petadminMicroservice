import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { onRequest } from "firebase-functions/v2/https";
import emailRoutes from "./routes/email.routes.js";
import notificationRoutes from "./routes/notification.routes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import { Console } from "console";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/payments", paymentRoutes);
app.use("/api/notifyservice", notificationRoutes);
app.use("/api/email", emailRoutes);


export const Dazi = onRequest(app);
