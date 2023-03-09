const ErrorHandler = require('../utils/errorhander')

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error"


    // wrong Mongodb Id error
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid: ${err.path}`
        err = new ErrorHandler(message, 400)
    }

    // mongoose duplicate key error
    if (err.code == 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`
        err = new ErrorHandler(message, 400)
    }

    // Wrong JWT error
    if (err.name === "jsonWebTokenError") {
        const message = `Json web token is Invalid, try again`;
        err = new ErrorHandler(message, 400)
    }

    // JWT Expire error
    if (err.name === "TokenExpireError") {
        const message = `Json web token is expire, try again`;
        err = new ErrorHandler(message, 400)
    }

    res.status(err.statusCode).json({
        success: false,
        // error: err.stack
        // error:err
        message: err.message
    })
}