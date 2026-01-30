import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   port: 465,
//   secure: true, // true for port 465, false for other ports
//   auth: {
//     user: process.env.NODEMAILER_EMAIL,
//     pass: process.env.NODEMAILER_PASSWORD,
//   },
// });

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false, // TLS
  auth: {
    // SMPT login
    user: process.env.BREVO_EMAIL,
    // SMPTP key
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

export default transporter;
