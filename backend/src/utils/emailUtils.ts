import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// Create transporter
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.GMAIL_USER, // Replace with your Gmail address from environment variable
        pass: process.env.GMAIL_PASS, // Replace with your Gmail password or app-specific password from environment variable
    },
});

export const sendEmail = async (to: string, subject: string, html?: string) => {
    try {
        const info = await transporter.sendMail({
            from: `"Anurag Dahal" <${process.env.GMAIL_USER}>`, // Corrected format using environment variable
            to,
            subject,
            html,
        });
        if (info.response.includes("250")) {
            return true;
        }
    } catch (error) {
        console.log("Error sending email:", error); // Improved error logging
        return false;
    }
};
