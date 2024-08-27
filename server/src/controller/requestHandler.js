const errorHandler = (res, statusCode, message, ) => {
    try {
        res.status(statusCode).json({
            success: false,
            message: message
        })
    } catch (error) {
        
    }
}
const successHandler = (res, statusCode, message, data = {}) => {
    try {
        res.status(statusCode).json({
            success: true,
            message: message,
            data: data
        })
    } catch (error) {
        
    }
}

module.exports = { errorHandler, successHandler }