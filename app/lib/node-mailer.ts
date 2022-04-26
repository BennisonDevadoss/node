import nodemailer from "nodemailer";
import process from "process";
const dotenv = require("dotenv");
dotenv.config();

console.log("SMTP Service is", process.env.SMTP_HOST);
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

function sendOTP(to: string, otp: string, userName: string) {
  console.log("User mail is", to);
  console.log("Process.env.EMAIL is", process.env.EMAIL);
  console.log("process.env.EMAIL_PASSWORD is", process.env.EMAIL_PASSWORD);
  return transporter.sendMail({
    from: process.env.EMAIL,
    to: to,
    subject: "Your OTP for login to ChiefNET Application",
    html: `<p><b>Dear ${userName},</b></p>
        <p>The One Time Password for your login is ${otp}.</p>
        <p>Regards, <br /> ChiefNET Team.</p>`,
  });
}

export { sendOTP };
