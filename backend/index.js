const express=require("express")
const dotenv = require('dotenv').config()
const cors= require('cors')
const {mongoose} = require('mongoose')
const cookieParser = require('cookie-parser')
const authRouter= require('./routes/authRoute')
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

const port = 8000;
app.listen(port,()=>{
    console.log(`server running on port no. ${port}`);
})