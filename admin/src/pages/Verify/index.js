import React, { useState } from 'react'
import './style.css';
import Button from '@mui/material/Button';
import logo from '../../assests/logo.png'
import sheild from '../../assests/shield.png';
import { Link, NavLink } from 'react-router-dom';
import { OTPBox } from '../../Component/OTPBox';
const Verify = () => {
  const[otp,setOtp]=useState("");
  const handleOtpChange=(value)=>{
        setOtp(value);
    }
  const verifyOTP = (e) => {}
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
          <p style={{fontSize:"16px"}}>OTP send to <span style={{color:"blue"}}>ankit@gmail.com</span></p>
          <form onSubmit={verifyOTP}>
                <OTPBox length={6} onChange={(value) => setOtp(value)} />

            <div className='verify-btn'>
                <Button type='submit' className='login-btn'>Verify OTP</Button>
            </div>
            </form>
        </div>
      </div>
    </section>
  )
}

export default Verify
