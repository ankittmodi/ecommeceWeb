import React, { useContext, useState } from 'react'
import './style.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { myContext } from '../../App';
const ForgotPassword = () => {
  const[isShowPassword,setIsShowPassword]=useState(false);
  const[isShowPassword2,setIsShowPassword2]=useState(false);
  const context=useContext(myContext);
  const history=useNavigate();

  return (
    <section className="login">
      <div className="container">
        <div className="card">
          <h3>Forgot Password</h3>
          <form action="" className='login-form'>
            <div className="form-group text1">
              <TextField
              type={isShowPassword===false?'password':'text'}
                id="password"
                label="New Password *"
                name='password'
                variant="outlined" className='text text1'></TextField>
                <Button type='submit' className='form-btn' onClick={()=>setIsShowPassword(!isShowPassword)} >
                {
                  isShowPassword===false?<IoMdEyeOff/>:<IoEye/>
                }
                  </Button>
            </div>
            <div className="form-group text1">
              <TextField
              type={isShowPassword2===false?'password':'text'}
                id="Confirm_assword"
                label="Confirm Password *"
                name='password'
                variant="outlined" className='text text1'></TextField>
                <Button type='submit' className='form-btn' onClick={()=>setIsShowPassword2(!isShowPassword2)} >
                {
                  isShowPassword2===false?<IoMdEyeOff/>:<IoEye/>
                }
                  </Button>
            </div>

            <div className="login-btn">
              <Button type='submit' className='bg-org'>Change Password</Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default ForgotPassword;
