const express=require("express")
const dotenv = require('dotenv').config()
const cors= require('cors')
const {mongoose} = require('mongoose')
const path = require('path')
const cookieParser = require('cookie-parser')
const authRouter= require('./routes/authRoute')
const imageRoutes = require('./routes/imageRoutes')
const productRouter= require('./routes/ProductRoutes')
const offerRoutes= require('./routes/offerRoutes');
const payment = require('./routes/paymentRoute')
const app=express();

//databse connected

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Database Connected'))
.catch((err) => console.log('Database not connected', err))

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}))



app.use('/', authRouter)
app.use('/product', productRouter )
app.use('/api', imageRoutes)
app.use('/',offerRoutes)
app.use('/api/payment', payment)


if(process.env.NODE_ENV =="production"){
    app.use(express.static("frontend/build"));
}

const port = process.env.PORT || 8000;
app.listen(port,()=>{
    console.log(`server running on port no. ${port}`);
})