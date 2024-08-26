require('dotenv').config()

const dev = {
    app: {
        serverPort: process.env.SERVER_PORT || 3030,
    },
    db: {
        mongoUrl: process.env.MONGODB_URL || '',
    }
}

module.exports = dev