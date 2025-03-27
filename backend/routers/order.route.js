const express = require('express')
const multer = require("multer");
const orderCrl = require('../controllers/order.controller.js')
const orderRouter = express.Router()
const upload = multer()
const { authMiddleware } = require('../middlewares/jwt.middleware.js')
orderRouter.post('/checkout', authMiddleware, upload.none(), orderCrl.checkout)
orderRouter.get('/getOrders', orderCrl.getOrders)
orderRouter.get('/getOrderById/:id', orderCrl.getOrderById)
orderRouter.get('/setStatusOrder/:id/:status', orderCrl.setStatusOrder)
orderRouter.post('/payOs/callback', orderCrl.callback)


module.exports = orderRouter