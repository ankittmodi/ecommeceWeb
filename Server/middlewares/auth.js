import jwt from 'jsonwebtoken';
const auth=async(req,res,next)=>{
  try{
    const token=req.cookies.accessToken || request?.headers?.autorization?.split(" ")[1];
    if(!token){
      return res.status(401).json({
        message:"Provide token"
      })
    }
    const decode=await jwt.verify(token,process.env.SECRET_KEY_ACCESS_TOKEN);
    if(!decode){
      res.status(401).json({
        message:"Unauthorized Access",
        error:true,
        success:false
      })
    }
    req.userId=decode.id;
    next();
  }catch(err){
    return res.status(500).json({
      message:"You have not  login", // error message
      error:true,
      success:false
    })
  }
}

export default auth;