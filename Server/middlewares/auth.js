import jwt from 'jsonwebtoken';
const auth=async(req,res,next)=>{
  try{
    var token = req.cookies?.accessToken || req.headers?.authorization?.split(" ")[1];

    if(!token){
      token=req.query.token
    }
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
  return res.status(401).json({
    message: err.message || "Unauthorized",
    error:true,
    success:false
  });
}
}

export default auth;