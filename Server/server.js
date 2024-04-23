const express = require('express');
const connectToDatabase = require('./database/dbConnection');
require('dotenv').config()
const cors = require("cors")
const app = express();
const PORT = process.env.PORT || 3000
const authRouter = require('./routes/authRoute.js')

app.use(cors())

app.use(express.json( )); // Middleware for parsing JSON bodies in HTTP requests

// app.get('/',(req,res)=>{
//     res.send("Hello World!")
// })

app.use('/api/auth',authRouter) //  Route prefix to mount the user router at /users

connectToDatabase() // Connecting to the database

app.use((err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    res.status(err.statusCode).json({
        status:err.status,
        message:err.message
    })
})

app.listen(PORT,(req,res)=>{
    console.log(`Server is listening on ${PORT}`);
})

