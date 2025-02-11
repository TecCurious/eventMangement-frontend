"use server"
import nodemailer from "nodemailer";

type EmailResult = {
  success: boolean;
  message: string;
  error?: string;
};


export async function sendVerificationEmail(
  email: string, 
  code: string
): Promise<EmailResult> {
  // Validate inputs
  if (!email || !email.includes('@')) {
    return {
      success: false,
      message: 'Invalid email address',
      error: 'Email validation failed'
    };
  }

  if (!code || code.length !== 4 || !/^\d+$/.test(code)) {
    return {
      success: false,
      message: 'Invalid verification code',
      error: 'Code must be exactly 5 digits'
    };
  }

  console.log("sending email to.....................>>>", email);

  // Create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: parseInt(process.env.NODEMAILER_PORT!),
    auth: {
      user: process.env.NODEMAILER_EMAIL_USER,
      pass: process.env.NODEMAILER_EMAIL_PASSWORD,
    },
  });

  // Email configuration
  const mailOptions = {
    from:process.env.NODEMAILER_EMAIL_USER,
    to: email,
    subject: 'Your Verification Code',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Verification Code</h2>
        <p>Your verification code is:</p>
        <h1 style="color: #007bff; font-size: 32px; letter-spacing: 5px; padding: 10px; background-color: #f8f9fa; text-align: center; border-radius: 5px;">
          ${code}
        </h1>
        <p>This code will expire in 10 minutes.</p>
        <p>If you didn't request this code, please ignore this email.</p>
      </div>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
    return {
      success: true,
      message: 'Verification code sent successfully'
    };
    
  } catch (error) {
    console.log("Error sending email:", error);
    return {
      success: false,
      message: 'Failed to send verification code',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}