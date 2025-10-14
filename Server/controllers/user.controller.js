import userModel from "../models/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import sendEmailFun from "../config/sendEmail.js";
import VerificationEmail from "../utils/verificationEmailTemplate.js";
import generateAccessToken from "../utils/generateAccessToken.js";
import generateRefreshToken from "../utils/generateRefreshToken.js";
import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';
cloudinary.config({
  cloud_name:process.env.cloudinary_Config_cloud_name,
  api_key:process.env.cloudinary_Config_cloud_api_key,
  api_secret:process.env.cloudinary_Config_cloud_api_secret,
  secure:true
});
var imagesArr=[];

// --- Register User ---
export async function registerUserController(req, res) {
  try {
    const { name, email, password, mobile } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Provide email, name, password",
        error: true,
        success: false,
      });
    }

    let user = await userModel.findOne({ email });

    // User already verified
    if (user && user.isVerified) {
      return res.status(400).json({
        message: "User already verified",
        error: true,
        success: false,
      });
    }

    // Hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 min

    if (!user) {
      // New user
      user = new userModel({
        name,
        email,
        password: hashPassword,
        mobile,
        otp,
        otpExpires,
        isVerified: false,
      });
    } else {
      // Unverified user exists, resend OTP
      user.otp = otp;
      user.otpExpires = otpExpires;
    }

    await user.save();

    // Send OTP email
    await sendEmailFun({
      sendTo: email,
      subject: "Verify your email",
      html: VerificationEmail(name, otp),
    });

    return res.status(200).json({
      success: true,
      error: false,
      message: "OTP sent to email. Please verify.",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Internal server error",
      error: true,
      success: false,
    });
  }
}

// --- Verify Email ---
export async function verifyEmailController(req, res) {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({
        message: "Provide email and OTP",
        error: true,
        success: false,
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        message: "Email already verified",
        error: true,
        success: false,
      });
    }

    if (!user.otp || user.otpExpires.getTime() < Date.now()) {
      return res.status(400).json({
        message: "OTP expired",
        error: true,
        success: false,
      });
    }

    if (String(user.otp) !== String(otp)) {
      return res.status(400).json({
        message: "Invalid OTP",
        error: true,
        success: false,
      });
    }

    // OTP valid → verify user
    user.isVerified = true;
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    return res.status(200).json({
      message: "Email verified successfully",
      error: false,
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Internal server error",
      error: true,
      success: false,
    });
  }
}


// login and logout user API
export async function loginUserController(req,res){
  try{
    const {email,password}=req.body;
  const user=await userModel.findOne({email:email});
  if(!user){
    return res.status(400).json({
      message:"User not register",
      error:true,
      success:false
    })
  }
  if(user.status!=="Active"){
    return res.status(400).json({
      message:"Contact to admin",
      error:true,
      success:false
    })
  }
  // for verifying user updated email
  if(user.verify_email!==true){
    return res.status(400).json({
      message:"Your email is not verify yet please verify your email first",
      error:true,
      success:false
    })
  }
  const checkPassword=await bcrypt.compare(password,user.password);
  if(!checkPassword){
    return res.status(400).json({
      message:"Check your password",
      error:true,
      success:false
    })
  }
  const accessToken=await generateAccessToken(user._id);
  const refreshToken=await generateRefreshToken(user._id);

  const updateUser=await userModel.findByIdAndUpdate(user?._id,{
    last_login_date:new Date()
  });

  // adding cookies
  const cookiesOption={
    httpOnly:true,
    secure:true,
    sameSite:"None"
  }
  res.cookie('accessToken',accessToken,cookiesOption);
  res.cookie('refreshToken',refreshToken,cookiesOption);

  return res.json({
    message:"Login SuccessFully",
    error:false,
    success:true,
    data:{
      accessToken,
      refreshToken
    }
  })
  }
  catch(err){
    return res.status(500).json({
      message:err.message || err,
      error:true,
      success:false
    })
  }
}

// logout controler
export async function logoutController(req,res){
  try{
    const userid=req.userId; //auth middleware
    const cookiesOption={
      httpOnly:true,
      secure:true,
      sameSite:"None"
    }
    res.clearCookie('accessToken',cookiesOption);
    res.clearCookie('refreshToken',cookiesOption);

    const removeRefreshToken=await userModel.findByIdAndUpdate(userid,{
      refresh_token:""
    })
    return res.json({
      message:"Logout Successfully",
      error:false,
      success:true
    })
  }
  catch(err){
    return res.status(500).json({
      message:err.message || err,
      error:true,
      success:false
    })
  }
}

// image upload api

export async function userAvatarController(req, res) {
  try {
    let imagesArr = [];
    const userId = req.userId;
    const image = req.files;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }

    // --- Remove old image if ?img=... is provided ---
    const imgUrl = req.query.img;
    if (imgUrl) {
      const urlArr = imgUrl.split("/");
      const avatarimage = urlArr[urlArr.length - 1]; // e.g. avatar123.jpg
      const imageName = avatarimage.split(".")[0];   // e.g. avatar123

      if (imageName) {
        await cloudinary.uploader.destroy(imageName);
      }
    }

    // --- Upload new image(s) ---
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: false,
    };

    for (let i = 0; i < image?.length; i++) {
      const result = await cloudinary.uploader.upload(image[i].path, options);
      imagesArr.push(result.secure_url);
      fs.unlinkSync(image[i].path); // delete local file after upload
    }

    // --- Save first uploaded image ---
    if (imagesArr.length > 0) {
      user.avatar = imagesArr[0];
      await user.save();
    }

    return res.status(200).json({
      _id: userId,
      avatar: user.avatar,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      error: true,
      success: false,
    });
  }
}

export default userAvatarController;


// delete upload image
export async function removeImageFromCloudinary(req,res){
  const imgUrl=req.query.img;
  // "https://res.cloudinary.com/dtlhmmcer/image/upload/v1758021182/1758021178101_ankitphoto.jpg"  ye is tarah se lega urlArr
  const urlArr=imgUrl.split("/");
  // ["https:","res.cloudinary.com","dtlhmmcer","image","upload","v1758021182","1758021178101_ankitphoto.jpg"] ye neeche wala array is tarah se lega
  const image=urlArr[urlArr.length-1];
  const imageName=image.split(".")[0];
  if(imageName){
    const result=await cloudinary.uploader.destroy(
    imageName,
    (error,result)=>{

    }
  );
  if(result){
    res.status(200).send(result);
  }
  }
}


// update user details
export async function updateUserDetails(req,res){
  try{
    const userId=req.userId; //auth middleware
    const {name,email,mobile,password}=req.body;
    const userExist=await userModel.findById(userId);
    if(!userExist){
      return res.status(400).send('The user can not be updated');
    }
    // verifying user if user exist
    let verifyCode="";
    if(email!==userExist.email){
      verifyCode=Math.floor(100000+Math.random()*900000).toString();
    }
    let hashPassword="";
    if(password){
      const salt=await bcrypt.genSalt(10);
      hashPassword=await bcrypt.hash(password,salt);
    }
    else{
      hashPassword=userExist.password;
    }
    const updateUser=await userModel.findByIdAndUpdate(userId,{
      name:name,
      mobile:mobile,
      email:email,
      varify_email:email!==userExist.email?false:true,
      password:hashPassword,
      otp:verifyCode!==""?verifyCode:null,
      otpExpires:verifyCode!==""?Date.now()+600000:''
    },{new:true});

    // send verification email
    if(email!==userExist.email){
      await sendEmailFun({
        sendTo:email,
        subject:"Verify email from Ecommerce App",
        text:"",
        html:VerificationEmail(email,verifyCode)
      })
    }
    return res.json({
      message:"User updated successfully",
      error:false,
      success:true,
      user:updateUser
    })
  }catch(err){
    return res.status(500).json({
      message:err.message|| err,
      err:true,
      success:false
    })
  }
}

// forgot password
export async function forgotPasswordController(req, res) {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email: email });

    if (!user) {
      return res.status(400).json({
        message: "Email not exist",
        error: true,
        success: false
      });
    }

    // generate OTP
    let verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp=verifyCode;
    user.otpExpires=Date.now() + 600000;
    await user.save();

    // send email
    await sendEmailFun({
      sendTo: email,
      subject: "Verify email from Ecommerce App",
      text: "",
      html: VerificationEmail(user.name, verifyCode)
    });

    return res.json({
      message: "Check Your Email",
      error: false,
      success: true
    });

  } catch (err) {
    return res.status(500).json({
      message: err.message || err,
      error: true,  // ✅ fixed
      success: false
    });
  }
}

// verify forgot password otp
export async function forgotPasswordOtp(req,res){
  try{
    const{email,otp}=req.body;
  const user=await userModel.findOne({email:email})
  if(!user){
    return res.status(400).json({
      message:"Email not available",
      error:true,
      success:false
    })
  }
  if(!email || !otp){
    return res.status(400).json({
      message:"Provide required feild email, otp",
      error:true,
      success:false
    })
  }
  if(otp!==user.otp){
    return res.status(400).json({
      message:"Invalid OTP",
      error:true,
      success:false
    })
  }
  // check otp is expired or not
  const currentTime=new Date().toISOString();
  if(user.otpExpires<currentTime){
    return res.status(400).json({
      message:"Otp is expired",
      error:true,
      success:false
    })
  }

  user.otp="";
  user.otpExpires="";
  user.save();
  return res.status(400).json({
      message:"otp verified successfully",
      error:true,
      success:false
    })
  }
  catch(err){
    return res.status(500).json({
      message: err.message || err,
      err: true,
      success: false
    });
  }
}

// reset password
export async function resetPassword(req, res) {
  try {
    const { email, newPassword, confirmPassword } = req.body;

    // Check required fields
    if (!email || !newPassword || !confirmPassword) {
      return res.status(400).json({
        message: "Provide required fields: email, newPassword, confirmPassword",
        error: true,
        success: false,
      });
    }

    // Find user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Email not found",
        error: true,
        success: false,
      });
    }

    // Check password match
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: "newPassword and confirmPassword must be the same",
        error: true,
        success: false,
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(confirmPassword, salt);

    // Update user password
    user.password = hashPassword;
    await user.save();

    return res.json({
      message: "Password updated successfully.",
      error: false,
      success: true,
    });
  } catch (err) {
    console.error("Reset password error:", err);
    return res.status(500).json({
      message: err.message || "Internal Server Error",
      error: true,
      success: false,
    });
  }
}


// refresh token
export async function refreshToken(req,res){
  try{
    const refreshToken=req.cookies.refreshToken || req.headers.authorization.split(" ")[1]; // bearer token
    if(!refreshToken){
      return res.status(401).json({
        message:"Invalid token",
        error:true,
        success:false
      })
    }
    const verifyToken=await jwt.verify(refreshToken,process.env.SECRET_KEY_REFRESH_TOKEN);
    if(!verifyToken){
      return res.status(401).json({
        message:"token is expired",
        error:true,
        success:false
      })
    }
    const userId=verifyToken._id;
    const newAccessToken=await generateAccessToken(userId);
    const cookiesOption={
      httpOnly:true,
      secure:true,
      sameSite:"None"
    }
    res.cookie('accessToken',newAccessToken,cookiesOption);
  }catch(err){
    return res.status(500).json({
      message: err.message || "Internal Server Error",
      error: true,
      success: false,
    });
  }
}

// get login user details
export async function userDetails(req,res) {
  try{
    const userId=req.userId;

    const user=await userModel.findById(userId).select('-password -refresh_token');

    return res.json({
      message:"User details",
      data:user,
      error:false,
      success:true
    })
  }catch(err){
    return res.status(500).json({
      message: "Something is wrong!",
      error: true,
      success: false,
    });
  }
}
