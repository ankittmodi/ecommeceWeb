import sendEmail from "./emailService.js";

const sendEmailFun=async({sendTo,subject,text,html})=>{
  const result=await sendEmail(sendTo,subject,text,html);
  if(result.success){
    return true;
    // result.status(200).json({message:"Email sent successfully",});
  }
  else{
    return false;
  }
}
export default sendEmailFun;