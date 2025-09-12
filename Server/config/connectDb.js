import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

if(!process.env.MONGODB_URI){
  throw new Error("MONGODB_URI is not defined");
}

async function connectDB(){
  try{
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
  }
  catch(err){
    console.log("mongodb connect error",err);
    process.exit(1);
  }
}

export default connectDB;  //export the function to use it in other files