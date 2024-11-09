const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const createError = require('http-errors')
const dev = require('./config')
const connectDB = require('./config/db')
const blogRouter = require('./routes/blogRoute')
const userRouter = require('./routes/userRoute')

const app = express() 


const port = dev.app.serverPort




app.use(cors({
    origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
    credentials: true,
    })
)
app.use(cookieParser())
app.use('/public', express.static('public'))
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)

app.use((req, res, next) => {
    next(createError(404, 'Route is not found'))
})

app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`)
    connectDB()
})

app.get(('/test', (req, res) => {
    res.send('test api is working')
}))


app.use((err, req, res, next) => {
    const statusCode = err.statusCode;
    res.status(statusCode || 500).json({
        statusCode: statusCode || 500,
        error: err.message
    })
})