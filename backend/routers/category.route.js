const express = require('express')
const categoryCtr = require('../controllers/category.controller.js')
const categoryRouter = express.Router()

categoryRouter.post('/addCategory', categoryCtr.addCategory)
categoryRouter.get('/getAllCategory', categoryCtr.getAllCategory)
categoryRouter.put('/editCategory/:id', categoryCtr.editCategory)
categoryRouter.post('/deleteCategory/:id', categoryCtr.deleteCategory)


module.exports = categoryRouter