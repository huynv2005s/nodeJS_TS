const express = require('express')
const productCtrl = require('../controllers/product.controller.js')
const upload = require('../middlewares/upload.js')
const productRouter = express.Router()

// productRouter.get('/updatePrice', productCtrl.updatePrice)
productRouter.get('/getAllProduct', productCtrl.getAllProduct)
productRouter.get('/getOneProduct/:id', productCtrl.getOneProduct)
productRouter.get('/getProductVariant/:id/:size/:color', productCtrl.getProductVariant)
productRouter.get('/getProductByCategoryId/:id', productCtrl.getProductByCategoryId)
productRouter.post('/addProduct', upload.array('images', 5), productCtrl.addProduct)
productRouter.put('/updateProduct/:id', upload.array('images', 5), productCtrl.updateProduct)
productRouter.delete('/deleteProduct/:id', productCtrl.deleteProduct)

module.exports = productRouter