const asyncHandler = require('express-async-handler');
const ErrorHandler = require('../utils/errorhander');
const jwt = require('jsonwebtoken')
const User = require('../model/userModel')

const isAuthenticatedUser = asyncHandler(async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return next(new ErrorHandler("Please Login to access this resource", 401))
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET)
    
    req.user = await User.findById(decodedData.id)

    next();
})

const authorizeRoles = ((...roles) => {

    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorHandler(
                    `Role: ${req.user.role} is not allowed to access this resource`, 403
                ))
        }

        next();
    };
});

module.exports = { isAuthenticatedUser, authorizeRoles }