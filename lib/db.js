// src/mongodb.js
import mongoose from "mongoose";

async function  connectDB() {
    const uri = process.env.DATABASE_URL;
    try{
        await mongoose.connect(uri)
        console.log("connected to mongodb")
    }catch(e) {
        console.error(r);
        
    }
}

module.exports = connectDB;
