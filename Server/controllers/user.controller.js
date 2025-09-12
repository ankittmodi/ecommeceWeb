import userModel from "../models/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import sendEmailFun from "../config/sendEmail.js";
import VerificationEmail from "../utils/verificationEmailTemplate.js";
// import { use } from "react";
export async function registerUserController(req,res){
  try{
    let user;
    const {name,email,password}=req.body;
    if(!name || !email || !password){
      return res.status(400).json({
        message:"Provide email, name, password",
        error:true,
        success:false
      })
    }
    // if user exist or not
    user=await userModel.findOne({email:email});
    if(user){
      return res.json({
        message:"User already Registered with this email",
        error:true,
        success:false
      })
    }
    // generate 6 digit otp
    const verifyCode=Math.floor(100000+Math.random()*900000).toString();
    const salt=await bcrypt.genSalt(10);
    const hashPassword=await bcrypt.hash(password,salt);
    
    user=new userModel({
      email:email,
      password:hashPassword,
      name:name,
      otp:verifyCode,
      otpExpires:Date.now()+600000
    });
    await user.save();

    // send verification email
    const verifyEmail=await sendEmailFun({
      sendTo:email,
      subject:"Verify email from Ecommerce App",
      text:'',
      // first create sendEmail file in config.js
      html:VerificationEmail(name,verifyCode)
    });

    // create a jwt token for verification
    const token=jwt.sign({email:user.email,id:user._id},
      process.env.JSON_WEB_TOKEN_SECRET_KEY
    );

    return res.status(200).json({
      success:true,
      error:false,
      message:"User registered successfully! Please verify your email.",
      token:token, //include this if needed for verification
    })
  }catch(error){
    return res.status(500).json({
      message:error.message || error,
      error:true,
      success:false
    })
  }
}

// verify email controller
export async function verifyEmailController(req,res){
  try{
    const {email,otp}=req.body;
    const user=await userModel.findOne({email:email});

    if(!user){
      return res.status(400).json({
        message:"User not found",
        error:true,
        success:false
      })
    }
    const isCodeValid=user.otp===otp;
    const isNotExpired=user.otpExpires>Date.now();
    if(isCodeValid && isNotExpired){
      user.isVerified=true;
      user.otp=null;
      user.otpExpires=null;
      await user.save();
      return res.status(200).json({error:false,success:true,message:"Email verified successfully"});
    }
    else if(!isCodeValid){
      return res.status(400).json({error:true,success:false,message:"Invalid OTP"});
    }
    else{
      return res.status(400).json({error:true,success:false,message:"OTO expired"});
    }
  }
  catch(err){
    return res.status(500).json({
      message:err.message || err,
      error:true,
      success:false
    })
  }
}