import dotenv from "dotenv";
dotenv.config();

import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

export const createOrder = async (amount, currency, receipt) => {
  const options = {
    amount: amount * 100,
    currency,
    receipt,
    payment_capture: 1,
  };

  return await razorpay.orders.create(options);
};
