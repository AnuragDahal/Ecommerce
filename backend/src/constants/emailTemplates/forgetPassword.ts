import { IEmailTemplate } from "../../types/email";

export const forgotPasswordTemplate = ({ userName, otp }: IEmailTemplate) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Changed</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            color: #333;
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
            <h1>Reset Your Password</h1>
            <p>Hi ${userName},</p>
            <p>We received a request to reset your password. Please use the following OTP (One-Time Password) to reset your password:</p>
            <h2>${otp}</h2>
            <p>This OTP is valid for the next 10 minutes.</p>
            <p>If you did not request a password reset, please ignore this email or contact our support team immediately.</p>
            <p>Thank you for using our service!</p>
            <p class="footer">Best regards,<br>Shop Now</p>
        </div>
</body>
</html>
`;
