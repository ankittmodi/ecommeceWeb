import http from 'http';
import nodemailer from 'nodemailer';
// const http=require('http');
// const nodemailer=require('nodemailer');

// configure the smtp transporter
const transporter=nodemailer.createTransport({
  host:'smtp.gmail.com', //for gmail
  port:465, //for secure
  secure:true,
  auth:{
    user:process.env.EMAIL, //your smtp useremail
    pass:process.env.EMAIL_PASS,
  },
});
// transporter.verify(function (error, success) {
//   if (error) {
//     console.log("❌ SMTP Login Failed:", error.message);
//   } else {
//     console.log("✅ SMTP Login Success. Server is ready to send emails!");
//   }
// });
// function to send email
async function sendEmail(to,subject,text,html){
  try{
    const info=await transporter.sendMail({
      from:process.env.EMAIL,//sender address
      to, //list of receiver
      subject,
      text,
      html,
    });
    return {success:true,messageId:info.messageId};
  }
  catch(error){
    console.error('Error sending email:',error);
    return {success:false,error:error.message};
  }
}
export default sendEmail;