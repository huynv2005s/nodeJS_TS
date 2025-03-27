const express = require('express')
const { verifyEmail, login, updatePassword, registerUser, forgotPassword, verifyCode } = require('../controllers/user.controller.js')
const { authMiddleware } = require('../middlewares/jwt.middleware.js')
const userRouter = express.Router()

userRouter.post("/register", registerUser)
userRouter.get("/verifyEmail", verifyEmail)
userRouter.post("/forgotPassword", forgotPassword)
userRouter.post("/verifyCode", authMiddleware, verifyCode)
userRouter.post("/updatePassword", updatePassword)
userRouter.post("/login", login)
module.exports = userRouter