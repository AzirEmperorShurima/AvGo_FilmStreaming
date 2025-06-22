import nodemailer from 'nodemailer';
import { ADMIN_EMAIL, ADMIN_EMAIL_APP_PASSWORD } from '../../../config.js';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: ADMIN_EMAIL,
        pass: ADMIN_EMAIL_APP_PASSWORD,
    },
});

export const sendMailService = async (_mail) => {
    try {
        // Kiểm tra đầu vào
        if (!_mail || !_mail.email || !_mail.username || !_mail.otp) {
            throw new Error('Missing required fields: email, username, or otp');
        }

        // Tạo mailOptions
        const mailOptions = {
            from: ADMIN_EMAIL,
            to: _mail.email,
            subject: 'Your OTP Code',
            text: `Hello ${_mail.username},\n\nYour OTP code is: ${_mail.otp}. It will expire in 15 minutes.\n
            If you don't verified OTP your raw not ACTIVE Account Wil be delete after 7 days
            \n\nThank you.`,
        };

        // Gửi email
        await transporter.sendMail(mailOptions);
        console.log('Mail sent successfully!');
    } catch (error) {
        console.error('Error sending email:', error.message);
        throw error;
    }
};

export const sendMailForgotPassword = async (_mail) => {
    try {
        if (!_mail || !_mail.email || !_mail.username || !_mail.otp) {
            throw new Error('Missing required fields: email, username, or otp');
        }
        console.log(_mail)

        const mailOptions = {
            from: ADMIN_EMAIL,
            to: _mail.email,
            subject: 'Your Forgot Password OTP Code - Link to Change Password',
            text: `Hello ${_mail.username},\n\nYour OTP code is: ${_mail.otp}. It will expire in 15 minutes.\n\n\nThank you.`,
        };

        // Gửi email
        await transporter.sendMail(mailOptions);
        console.log('Mail sent successfully!');
    } catch (error) {
        console.error('Error sending forgot password email:', error.message);
        throw error;
    }
}

export const sendMailNotification = async (_mail) => {
    try {
        if (!_mail || !_mail.email || !_mail.username || !_mail.subject || !_mail.text) {
            throw new Error('Missing required fields: email, username, or otp');
        }
        console.log(_mail)

        const mailOptions = {
            from: ADMIN_EMAIL,
            to: _mail.email,
            subject: _mail.subject,
            text: _mail.text,
            html: _mail.html || "",
        };

        // Gửi email
        await transporter.sendMail(mailOptions);
        console.log('Mail sent successfully!');
    } catch (error) {
        console.error('Error sending forgot password email:', error.message);
        throw error;
    }
}