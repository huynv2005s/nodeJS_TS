const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
app.use(cors())
const cookieParser = require('cookie-parser');
app.use(cookieParser());
require('dotenv').config()
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
//db
// require('./models/product.model.js')

//route
const userRouter = require('./routers/user.route.js')
const categoryRoute = require('./routers/category.route.js')
const productRouter = require('./routers/product.route.js')
const orderRouter = require('./routers/order.route.js')
//
app.get('/', (req, res) => {
    res.send("occdc")
})
app.use('/api', userRouter)
app.use('/api', productRouter)
app.use('/api', categoryRoute)
app.use('/api', orderRouter)


app.listen(process.env.PORT, () => {
    mongoose.connect(process.env.DB_URL).then(() => {
        console.log("connect success")
    }).catch(err => console.log(err));
    console.log(`http://localhost:${process.env.PORT}`)
});