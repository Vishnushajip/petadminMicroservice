import express from "express";
import {
  createPayment,
  verifyPayment,
} from "../controllers/paymentController.js";

const router = express.Router();

router.post("/createorder", createPayment);
router.post("/verify-payment", verifyPayment);

export default router;
