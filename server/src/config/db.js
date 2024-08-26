const mongoose = require('mongoose')
const dev = require('.')

const connectDB = async () => {
    try {
        await mongoose.connect(dev.db.mongoUrl)
        console.log('database is connected')
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = connectDB