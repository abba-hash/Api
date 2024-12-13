import jwt from "jsonwebtoken";
import mongoose from "mongoose";


export const generateToken = (id)=>{
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

export const dbconnect = () => mongoose.connect(process.env.MONGODB_URI).then(()=>
    console.log("Connected to MongoDB")).catch((error)=>{
        console.error("Failed to connect to MongoDB", error);
    });