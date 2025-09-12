import React, { useState } from 'react'
import './style.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { Link } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
const Register = () => {
  const[isShowPassword,setIsShowPassword]=useState(false);
  return (
    <section className="login">
      <div className="container">
        <div className="card">
          <h3>Register with a new Account</h3>
          <form action="" className='login-form'>
          <div className="form-group">
              <TextField
                type='name'
                id="name"
                label="Full Name *"
                variant="outlined" className='text'></TextField>
            </div>
            <div className="form-group">
              <TextField
                type='email'
                id="email"
                label="Email Id *"
                variant="outlined" className='text'></TextField>
            </div>
            <div className="form-group text1">
              <TextField
              type={isShowPassword===false?'password':'text'}
                id="password"
                label="Password *"
                variant="outlined" className='text text1'></TextField>
                <Button className='form-btn' onClick={()=>setIsShowPassword(!isShowPassword)}>
                {
                  isShowPassword===false?<IoEye/>:<IoMdEyeOff/>
                }
                  </Button>
            </div>

            <div className="login-btn">
              <Button className='bg-org'>Register</Button>
            </div>
            <p>Already have an account? <Link to='/login' className='link link-color '>Login</Link></p>
            <p>Or continue with social Account</p>
            <Button className='sign-btn'><FcGoogle/> Login with Google</Button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Register
