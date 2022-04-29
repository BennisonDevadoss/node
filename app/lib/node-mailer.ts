import nodemailer from 'nodemailer';
import process from 'process';
const dotenv = require('dotenv');
dotenv.config();

console.log('SMTP Service is', process.env.SMTP_HOST);
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

function sendOTP(to: string, otp: string, userName: string) {
  console.log('User mail is', to);
  console.log('Process.env.EMAIL is', process.env.EMAIL);
  console.log('process.env.EMAIL_PASSWORD is', process.env.EMAIL_PASSWORD);
  return transporter.sendMail({
    from: process.env.EMAIL,
    to,
    subject: 'Your OTP for login to ChiefNET Application',
    html: `<p><b>Dear ${userName},</b></p>
        <p>The One Time Password for your login is ${otp}.</p>
        <p>Regards, <br /> ChiefNET Team.</p>`,
  });
}

function sendInvitationLink(to: string, link: string, userName: string) {
  return transporter.sendMail({
    to,
    from: process.env.EMAIL,
    html: `<p><b>Dear ${userName},</b></p>
  <p>Your email was used to create an account on ChiefNET Orchestrator Proral.</p>
  <p>If you did not request it, please ignore this email. If it is something you requested,</p>
  <p>Please <a href="${link}">click here</a> to reset your password to complete your account setup.</p>
  <p>Regards, <br/> ChiefNET Team.<br/><a href=https://www.chiefnet.io>ChiefNET Private limited, India.</a>`,
    subject: 'Welcome to ChiefNET!',
  });
}

function sendResetLink(to: string, link: string, userName: string) {
  return transporter.sendMail({
    to,
    from: process.env.EMAIL,
    html: `<p><b>Dear ${userName},</b><p>
    <p>Your email was used to reset password on ChiefNET Network Orchestrator Portal.</p>
    <Please <a href="${link}">click here</a> to reset your password to complete your account setup</p>`,
    subject: 'Reset your ChiefNET password',
  });
}
export { sendOTP, sendInvitationLink, sendResetLink };
