const express = require('express')
const morgan = require('morgan')
const createError = require('http-errors')
const dev = require('./config')
const connectDB = require('./config/db')

const app = express() 


const port = dev.app.serverPort



app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`)
    connectDB()
})

app.get(('/test', (req, res) => {
    res.status('test api is working')
}))

app.use(morgan('dev'))

app.use((req, res, next) => {
    next(createError(404, 'Route is not found'))
})

app.use((err, req, res, next) => {
    const statusCode = err.statusCode;
    res.status(statusCode || 500).json({
        statusCode: statusCode || 500,
        error: err.message
    })
})