const nodemailer = require('nodemailer');
const config = require("../config/keys")


const transporter = nodemailer.createTransport({
    host: config.sendEmail.host, // SMTP server hostname
    port: 587, // port
    secure: false,
    auth: {
    user: config.sendEmail.user, 
    pass: config.sendEmail.pass
  },
});

const sendEmail = async (to, subject, text) => {
  await transporter.sendMail({ from: config.sendEmail.user, to, subject, text });
};

module.exports = sendEmail;
