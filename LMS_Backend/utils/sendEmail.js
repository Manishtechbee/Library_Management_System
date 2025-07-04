const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

exports.sendResetEmail = (to, resetLink) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject: 'Library Password Reset',
        html: `<p>You requested to reset your password.</p>
               <p>Click <a href="${resetLink}">here</a> to reset your password. This link is valid for 15 minutes.</p>`
    };

    return transporter.sendMail(mailOptions);
};
