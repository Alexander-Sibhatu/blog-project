const dev = require('../config')
const nodemailer = require('nodemailer');

const sendEmailWithNodeMailer = async (emailData) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, //true for 465, false for other ports
      auth: {
        user: dev.app.smtpUsername, //generated ethereal user
        pass: dev.app.smtpPassword, // generated ethereal password
      },
      debug: true,
    });

    console.log(dev.smtpPassword, dev.smtpUsername)
    const mailOptions = {
      from: dev.app.smtpUsername, // sender's address
      to: emailData.email, // list of receivers
      subject: emailData.subject, // Subject line
      html: emailData.html, // html body
    };

    // send mail with defined transport object
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: %s", info.response);
    
  } catch (error) {
    console.log('Error occurred while sending Email: ', error);
    throw error; // Propagate the error up to the caller
  }
};

module.exports = {sendEmailWithNodeMailer}





// require('dotenv').config();
// const nodemailer = require('nodemailer');

// const sendEmailWithNodeMailer = async () => {
//     const transporter = nodemailer.createTransport({
//         host: "smtp.gmail.com",
//         port: 587,
//         secure: false,
//         auth: {
//             user: process.env.SMTP_USERNAME, // Your Gmail address
//             pass: process.env.SMTP_PASSWORD, // Your Gmail App Password
//         },
//         debug: true,
//     });

//     try {
//         const info = await transporter.sendMail({
//             from: process.env.SMTP_USERNAME,
//             to: "test@example.com", // Replace with a test email address
//             subject: "Test Email",
//             text: "This is a test email sent from Node.js!",
//         });
//         console.log("Email sent:", info.response);
//     } catch (error) {
//         console.error("Error sending email:", error);
//     }
// };

// module.exports = { sendEmailWithNodeMailer }