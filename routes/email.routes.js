import express from "express";
import { sendAgentPasswordResetEmail } from "../controllers/emailController.js";

const router = express.Router();

router.post("/SendEmail", sendAgentPasswordResetEmail);

export default router;
