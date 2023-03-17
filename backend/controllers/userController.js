const asyncHandler = require('express-async-handler');
const User = require('../model/userModel');
const ErrorHandler = require('../utils/errorhander');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const cloudinary = require('cloudinary');

// register user
const registerUser = asyncHandler(async (req, res, next) => {
    // const myCloud = await cloudinary.uploader.upload(req.files.avatar, {
    //     folder: "avatars",
    //     width: 150,
    //     crop: "scale"
    // })

    const { name, email, password } = req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: "myCloud.public_id",
            url: "myCloud.secure_url",
        }
    });
    sendToken(user, 201, res)

    // const token = user.getJWTToken()
    // res.status(201).json({
    //     success: true,
    //     // user
    //     token
    // })  
})

// Login user
const loginUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    // checking if user has given password and email both
    if (!email || !password) {
        return next(new ErrorHandler("Please enter Email & password", 400))
    }

    const user = await User.findOne({ email: email }).select("+password")
    if (!user) {
        return next(new ErrorHandler("Invalid email or Password", 401))
    }
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password", 401))
    }

    sendToken(user, 200, res)

});

// Logout User
const logoutUser = asyncHandler(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged Out"
    })
})

// Forgot Pasword
const forgotPassword = asyncHandler(async (req, res, next) => {

    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return next(new ErrorHandler("User not found", 404))
    }

    // Get ResetPassword Token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false })

    // const resetPasswordUrl = `http://localhost/api/v1/password/reset/${resetToken}`
    // const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/user/password/reset/${resetToken}`;

    const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it`;              //ttemp;

    try {
        await sendEmail({
            email: user.email,
            subject: `Ecommerce Password Recovery`,
            message,
        })
        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`
        })

    } catch (err) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false })

        return next(new ErrorHandler(err.message, 500))
    }
})

// Reset Password
const resetPassword = asyncHandler(async (req, res, next) => {

    // creating token hash
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest('hex')

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    })

    if (!user) {
        return next(new ErrorHandler("Reset Password token is invalid or has been expired", 404))
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password does not matched", 400))
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res)

})

// Get User Detail
const getUserDetails = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id)

    res.status(200).json({
        success: true,
        user,
    })
})

// update User Password
const updateUserPassword = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password")

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Old Password is incorrect", 400))
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password does not match", 400))
    }

    user.password = req.body.newPassword;

    await user.save()

    sendToken(user, 200, res)

})

// update User Profile
const updateUserProfile = asyncHandler(async (req, res, next) => {

    const newUserData = {
        name: req.body.name,
        // email: req.body.email,
    }

    // if (req.body.avatar !== "") {
    //     const user = await User.findById(req.user.id)
    //     const imageId = user.avatar.public_id;

    //     await cloudinary.v2.uploader.destroy(imageId)

    //     const myCloud = await cloudinary.uploader.upload(req.files.avatar, {
    //         folder: "avatars",
    //         width: 150,
    //         crop: "scale"
    //     })
    //     newUserData.avatar = {
    //         public_id: myCloud.public_id,
    //         url: myCloud.secure_url,
    //     }
    // }
    // we will add cloudinary later

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true
    })
})

// Get all users  (admin)
const getAllUser = asyncHandler(async (req, res, next) => {
    const users = await User.find()

    res.status(200).json({
        success: true,
        users,
    })
})

// Get single User  (admin)
const getSingleUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id)
    if (!user) {
        return next(new ErrorHandler(`User does not exist with Id: ${req.params.id}`))
    }
    res.status(200).json({
        success: true,
        user,
    })
})

// update User Role
const updateUserRole = asyncHandler(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        // email: req.body.email,
        role: req.body.role
    }
    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    res.status(200).json({
        success: true
    })
})

// Delete User -- Admin
const deleteUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id)

    if (!user) {
        return next(new ErrorHandler(`User does not exist with Id: ${req.params.id}`))
    }

    const deletedUser = await User.findByIdAndRemove(user)

    res.status(200).json({
        success: true,
        deletedUser,
    })
})

module.exports = {
    registerUser,
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
}