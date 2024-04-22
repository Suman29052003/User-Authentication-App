const mongoose = require("mongoose");

const connectToDatabase = async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("connected to the database")
    }catch(err){
        console.log("Something Wrong while connecting to database",err)
    }
}

module.exports = connectToDatabase;