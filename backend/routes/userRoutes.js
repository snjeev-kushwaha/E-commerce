const express = require('express')

const userRoute = express.Router()
const { registerUser,
    loginUser,
    logoutUser,
    forgotPassword,
    resetPassword,
    getUserDetails,
    updateUserPassword,
    updateUserProfile,
    getAllUser,
    getSingleUser,
    updateUserRole,
    deleteUser
} = require('../controllers/userController')

const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth')

userRoute.route('/user/register').post(registerUser)

userRoute.route('/user/login').post(loginUser)

userRoute.route('/user/password/forgot').post(forgotPassword)

userRoute.route('/user/password/reset/:token').put(resetPassword)

userRoute.route('/user/logout').get(logoutUser)

userRoute.route('/user/me').get(isAuthenticatedUser, getUserDetails)

userRoute.route('/user/me/update').put(isAuthenticatedUser, updateUserProfile)

userRoute.route('/user/password/update').put(isAuthenticatedUser, updateUserPassword)

userRoute.route('/user/admin').get(isAuthenticatedUser, authorizeRoles("admin"), getAllUser)

userRoute.route('/user/admin/:id').get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser).put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole).delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser)

module.exports = { userRoute }