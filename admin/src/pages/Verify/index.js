import React, { useContext, useState } from 'react'
import './style.css';
import Button from '@mui/material/Button';
import logo from '../../assests/logo.png'
import sheild from '../../assests/shield.png';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { OTPBox } from '../../Component/OTPBox';
import { MyContext } from '../../App';
import { postData } from '../../utils/Api';
import CircularProgress from '@mui/material/CircularProgress';
const Verify = () => {
      const[otp,setOtp]=useState("");
      const [isLoading, setIsLoading] = useState(false);
      const handleOtpChange=(value)=>{
          setOtp(value);
      }
      const context=useContext(MyContext);
      const history=useNavigate();
  
      const actionType=localStorage.getItem("actionType");
      const verifyOTP = (e) => {
      e.preventDefault();
      const email = localStorage.getItem("userEmail");
      if (!email) {
        alert("Email missing. Please register again");
        return;
      }
  
      if(actionType!=="forgot-password"){
        postData("/api/user/verifyEmail", { email, otp })
      .then((res) => {
          if(res?.error === false){
            context.openAlertBox("success",res.message);
            history("/login");
          }
          else{
            context.openAlertBox("error",res.message);
          }
        });
      }
      // for calling change password  
      else{
        postData("/api/user/verify-forgot-password-otp", { email:localStorage.getItem("userEmail"), otp:otp })
      .then(res => {
        if(res.error===false){
          context.openAlertBox("success",res.message);
          history("/change-password");
        }
        else{
          context.openAlertBox("error",res.message);
        }
      });
      }
  }
  return (
    <section className='login' style={{height:"100vh"}}>
      {/* ===== Header ===== */}
      <header className='login-header'>
        <Link to='/'><img src={logo} alt='logo' /></Link>

        <div className='header-btns'>
          <Link to='/login' exact='true'>
            <Button className='btn'>Login</Button>
          </Link>
          <NavLink to='/signup'>
            <Button className='btn'>Sign Up</Button>
          </NavLink>
        </div>
      </header>

      {/* ===== Login Box (centered) ===== */}
      <div className='login-box'>
        <div className='login-content'>
          <div className='sheild'>
            <img src={sheild}/>
          </div>
          <h1>Welcome Back! <br/> <span style={{color:"blue"}}>Please verify Your Account.</span></h1>
          <p style={{fontSize:"16px"}}>OTP send to <span style={{color:"blue"}}>{localStorage.getItem("userEmail")}</span></p>
          <form onSubmit={verifyOTP}>
                <OTPBox length={6} onChange={(value) => setOtp(value)} />

            <div className='verify-btn'>
                <Button type='submit' className='login-btn'>{isLoading ? <CircularProgress color="inherit" size={20} /> : 'Verify OTP'}</Button>
            </div>
            </form>
        </div>
      </div>
    </section>
  )
}

export default Verify
