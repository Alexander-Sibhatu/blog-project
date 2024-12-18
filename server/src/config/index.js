require('dotenv').config()

const dev = {
    app: {
        serverPort: process.env.SERVER_PORT || 3030,
        jwtActivationSecretKey: process.env.JWT_ACTIVATION_SECRET_KEY,
        smtpUsername: process.env.SMTP_USERNAME,
        smtpPassword: process.env.SMTP_PASSWORD,
        clientUrl: process.env.CLIENT_URL,
        jwtAuthorizationSecretKey: process.env.JWT_AUTHORIZATION_SECRET_KEY
    },
    db: {
        mongoUrl: process.env.MONGODB_URL || '',
    }
};


module.exports = dev