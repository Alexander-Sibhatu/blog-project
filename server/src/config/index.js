require('dotenv').config()

const dev = {
    app: {
        serverPort: process.env.SERVER_PORT || 3030,
        jwtActivationSecretKey: process.env.JWT_ACTIVATION_SECRET_KEY,
        smtpUsername: process.env.SMTP_USERNAME,
        smtpPassword: process.env.SMTP_PASSWORD,
    },
    db: {
        mongoUrl: process.env.MONGODB_URL || '',
    }
};

console.log('SMTP Username:', dev.app.smtpUsername);
console.log('SMTP Password:', dev.app.smtpPassword);

module.exports = dev