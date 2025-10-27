const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: process.env.EMAIL_PORT || 587,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

// ydiolqkkyqvrqsny

// Verify transporter configuration
const verifyTransporter = async () => {
  try {
    await transporter.verify();
    console.log('Email transporter is ready to send emails');
    return true;
  } catch (error) {
    console.error('Email transporter verification failed:', error.message);
    return false;
  }
};

const sendEmail = async (to, subject, html) => {
  try {
    // Verify transporter before sending
    const isReady = await verifyTransporter();
    if (!isReady) {
      throw new Error('Email transporter is not ready');
    }

    const mailOptions = {
      from: {
        name: 'Redragon Colombo',
        address: process.env.EMAIL_USER
      },
      to,
      subject,
      html
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result.messageId);
    return result;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

const sendPasswordResetEmail = async (email, resetCode, userName) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Password Reset Code - Redragon Colombo</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #f4f4f4; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
        .header { text-align: center; padding: 20px 0; border-bottom: 2px solid #e74c3c; }
        .logo { color: #e74c3c; font-size: 28px; font-weight: bold; }
        .content { padding: 30px 0; }
        .code-box { background-color: #f8f9fa; border: 2px solid #e74c3c; border-radius: 10px; padding: 20px; text-align: center; margin: 20px 0; }
        .reset-code { font-size: 36px; font-weight: bold; color: #e74c3c; letter-spacing: 5px; margin: 10px 0; }
        .footer { text-align: center; padding: 20px 0; border-top: 1px solid #eee; color: #666; font-size: 14px; }
        .warning { background-color: #fff3cd; border: 1px solid #ffeaa7; color: #856404; padding: 15px; border-radius: 5px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">Redragon Colombo</div>
        </div>
        
        <div class="content">
          <h2>Password Reset Code</h2>
          <p>Hello ${userName || 'User'},</p>
          
          <p>We received a request to reset your password for your Redragon Colombo account. If you didn't make this request, you can safely ignore this email.</p>
          
          <p>Use the following 6-digit verification code to reset your password:</p>
          
          <div class="code-box">
            <div class="reset-code">${resetCode}</div>
            <p style="margin: 0; color: #666; font-size: 14px;">Enter this code in the password reset form</p>
          </div>
          
          <div class="warning">
            <strong>Important:</strong> This verification code will expire in 5 minutes for security reasons.
          </div>
          
          <p>If you didn't request a password reset, please ignore this email or contact our support team if you have concerns.</p>
          
          <p>Best regards,<br>Redragon Colombo Team</p>
        </div>
        
        <div class="footer">
          <p>&copy; 2024 Redragon Colombo. All rights reserved.</p>
          <p>This is an automated email. Please do not reply to this message.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return await sendEmail(email, 'Password Reset Code - Redragon Colombo', html);
};

module.exports = {
  transporter,
  sendEmail,
  sendPasswordResetEmail,
  verifyTransporter
};