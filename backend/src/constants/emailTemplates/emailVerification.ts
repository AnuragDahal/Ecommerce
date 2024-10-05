import { IEmailTemplate } from "../../types/email";

export const emailVerificationTemplate = ({userName, otp}:IEmailTemplate) => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            color: #333;>
        }
        .container {
            width: 80%;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        h1 {
            color: #4CAF50;
        }
        p {
            font-size: 16px;
            line-height: 1.5;
        }
        .otp {
            font-size: 24px;
            font-weight: bold;
            color: #4CAF50;
        }
        .footer {
            font-size: 14px;
            color: #777;
            text-align: center;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>OTP Verification</h1>
        <p>Hi ${userName},</p>
        <p>We received a request to verify your email address. Please use the following OTP to complete the verification process:</p>
        <p class="otp">${otp}</p>
        <p>If you did not request this verification, please ignore this email or contact our support team.</p>
        <p class="footer">Best regards,<br>Your Company</p>
    </div>
</body>
</html>`;
};