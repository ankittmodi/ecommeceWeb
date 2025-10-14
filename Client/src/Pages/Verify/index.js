import React, {useContext, useState } from 'react'
import './style.css';
import sheild from '../../assets/shield.png'
import OTPBox from '../../components/OTPBox';
import Button from '@mui/material/Button';
import { postData } from '../../utils/Api';
import { myContext } from '../../App';
import { useNavigate } from 'react-router-dom';
const Verify = () => {
    const[otp,setOtp]=useState("");
    const handleOtpChange=(value)=>{
        setOtp(value);
    }
    const context=useContext(myContext);
    const history=useNavigate();
    const verifyOTP = (e) => {
    e.preventDefault();
    const email = localStorage.getItem("userEmail");
    if (!email) {
      alert("Email missing. Please register again");
      return;
    }

  postData("/api/user/verifyEmail", { email, otp })
    .then(res => {
      if(res.error===false){
        context.openAlertBox("success",res.message);
        history("/login");
      }
      else{
        context.openAlertBox("error",res.message);
      }
    });
}
  return (
    <section className="login">
      <div className="container">
        <div className="card">
            <div className='sheild-img'>
                <img src={sheild} width={80}/>
            </div>
            <h3>Verify OTP</h3>
            <p>OTP send to <span className='otp-sent'>ankitkkumar@gmail.com</span></p>
            <form onSubmit={verifyOTP}>
                <OTPBox length={6} onChange={(value) => setOtp(value)} />

            <div className='verify-btn'>
                <Button type='submit' className='bg-org'>Verify OTP</Button>
            </div>
            </form>
        </div>
      </div>
    </section>
  )
}

export default Verify
