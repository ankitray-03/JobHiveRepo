import transporter from "../config/nodemailer.config.js";
import { transactionalEmailApi } from "../config/Brevo.config.js";
import {
  verificationMailTemplate,
  verificationSuccessMailTemplate,
  resetPasswordEmailTemplate,
  resetPasswordSucessEmailTemplate,
} from "./emailTemplates.js";

export const sendVerificationEMail = async (email, otp) => {
  const Options = {
    from: process.env.BREVO_SENDER_EMAIL,
    to: email,
    subject: "Verify your account",
    html: verificationMailTemplate(otp),
  };

  try {
    await transactionalEmailApi.sendTransacEmail({
      sender: {
        email: Options.from, // VERIFIED
        name: process.env.BREVO_SENDER_NAME,
      },
      to: [{ email: Options.to }],
      subject: Options.subject,
      htmlContent: Options.html,
    });

    console.log("✅ Email sent to:", Options.to);
  } catch (error) {
    throw error;
  }
};

export const sendWelcomeEmail = async (email, name) => {
  const Options = {
    from: process.env.NODEMAILER_EMAIL,
    to: email,
    subject: "Verification Successfull",
    html: verificationSuccessMailTemplate(name),
  };

  try {
    const res = await transporter.sendMail(Options);
    console.log("Welcome mail sent.");
  } catch (error) {
    throw error;
  }
};

export const sendPasswordResetEmail = async (email, reset_link) => {
  const Options = {
    from: process.env.NODEMAILER_EMAIL,
    to: email,
    subject: "Reset Password",
    html: resetPasswordEmailTemplate(reset_link),
  };

  try {
    const res = await transporter.sendMail(Options);
    console.log("Reset Password mail sent.");
  } catch (error) {
    throw error;
  }
};

export const sendResetSuccessEmail = async (email) => {
  const Options = {
    from: process.env.NODEMAILER_EMAIL,
    to: email,
    subject: "Password Updated",
    html: resetPasswordSucessEmailTemplate(),
  };

  try {
    const res = await transporter.sendMail(Options);
    console.log("Reset Success mail sent.");
  } catch (error) {
    throw error;
  }
};
