import React, { useState } from 'react'
import './style.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
const Login = () => {
  const[isShowPassword,setIsShowPassword]=useState(false);
  const [formFeilds,setFormFeilds]=useState(
    {
      email:'',
      password:''
    }
  );
  const history=useNavigate();
  const forgotPassword=()=>{
    history.push('/verify');
  }
  return (
    <section className="login">
      <div className="container">
        <div className="card">
          <h3>Login to your Account</h3>
          <form action="" className='login-form'>
            <div className="form-group">
              <TextField
                type='email'
                id="email"
                label="Email Id *"
                variant="outlined" className='text'
                name='name'></TextField>
            </div>
            <div className="form-group text1">
              <TextField
              type={isShowPassword===false?'password':'text'}
                id="password"
                label="Password *"
                name='password'
                variant="outlined" className='text text1'></TextField>
                <Button type='submit' className='form-btn' onClick={()=>setIsShowPassword(!isShowPassword)} >
                {
                  isShowPassword===false?<IoEye/>:<IoMdEyeOff/>
                }
                  </Button>
            </div>
            <Link to='' className='link-color' onClick={forgotPassword}>Forgot Password ?</Link>

            <div className="login-btn">
              <Button className='bg-org'>Login</Button>
            </div>
            <p>Not Registerd? <Link to='/register' className='link link-color '>Sign Up</Link></p>
            <p>Or continue with social Account</p>
            <Button className='sign-btn'><FcGoogle/> Login with Google</Button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Login;
