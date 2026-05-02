const nodemailer = require("nodemailer");

const port = Number(process.env.SMTP_PORT || 587);
const secure = process.env.SMTP_SECURE === "true";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port,
  secure,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  // Outlook / Office 365 use STARTTLS on 587
  requireTLS: !secure && port === 587,
});

module.exports = transporter;
