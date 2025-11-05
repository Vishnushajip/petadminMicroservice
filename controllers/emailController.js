import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

// Configure transporter using Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const sendAgentPasswordResetEmail = async (req, res) => {
  const { to, username, password, subject, htmlContent } = req.body;

  // Validate required fields
  if (!to || !username || !password || !subject || !htmlContent) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Missing required fields: to, username, password, subject, htmlContent"
      });
  }

  try {
    let toArray = to;
    if (typeof to === "string") {
      toArray = [to];
    }

    await transporter.sendMail({
      from: `"DaziPet Services Team" <${process.env.SMTP_EMAIL}>`, // Hardcoded
      to: toArray.join(","),
      subject: subject,
      html: htmlContent,
    });

    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Email send error:", error);
    res
      .status(500)
      .json({ success: false, message: "Email failed to send", error });
  }
};
