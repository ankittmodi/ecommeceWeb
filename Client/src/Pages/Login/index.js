import React, { useContext, useState } from 'react'
import './style.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { myContext } from '../../App';
import { postData } from '../../utils/Api';
import CircularProgress from '@mui/material/CircularProgress';
const Login = () => {
  const[isShowPassword,setIsShowPassword]=useState(false);
  const[isLoading,setIsLoading]=useState(false);
  const [formFeilds,setFormFeilds]=useState(
    {
      email:'',
      password:''
    }
  );
  const context=useContext(myContext);
  const history=useNavigate();
  const forgotPassword=(e)=>{
    e.preventDefault();
    if(formFeilds.email!==true){
      context.openAlertBox("success", "OTP sent successfully!");
      history('/verify');
    }
  }

  const onChangeInput=(e)=>{
    const{name,value}=e.target;
    setFormFeilds(()=>{
      return{
        ...formFeilds,
        [name]:value
      }
    })
  }
      // no one form feild will be empty
    const valideValue=Object.values(formFeilds).every(el=>el);
    const handleSubmit=(e)=>{
      e.preventDefault();
  
      setIsLoading(true);
      if(formFeilds.email===""){
        context.openAlertBox("error","Please enter email Id ")
        setIsLoading(false);
        return false;
      }
      if(formFeilds.password===""){
        context.openAlertBox("error","Please enter password")
        setIsLoading(false);
        return false;
      }
      postData("/api/user/login", formFeilds,{withCredentials:true}).then((res)=>{
        console.log(res);
        if(res.error!==true){
          setIsLoading(false);
          context.openAlertBox("success",res.message);
          localStorage.setItem("userEmail",formFeilds.email);
          setFormFeilds({
          email:"",
          password:""
        })
        localStorage.setItem("userEmail", res.data.user.email);
        localStorage.setItem("userName", res.data.user.name);
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);
        context.setIsLogin(true);
        history('/');
        }else{
          context.openAlertBox("error",res.message);
          setFormFeilds({
            email:"",
            password:""
          })
          setIsLoading(false);
        }
      })
      
    }
  return (
    <section className="login">
      <div className="container">
        <div className="card">
          <h3>Login to your Account</h3>
          <form action="" className='login-form' onSubmit={handleSubmit}>
            <div className="form-group">
              <TextField
                type='email'
                id="email"
                label="Email Id *"
                name='email'
                value={formFeilds.email}
                disabled={isLoading===true?true:false}
                variant="outlined" className='text'
                onChange={onChangeInput}></TextField>
            </div>
            <div className="form-group text1">
              <TextField
              type={isShowPassword===false?'password':'text'}
                id="password"
                name='password'
                value={formFeilds.password}
                disabled={isLoading===true?true:false}
                label="Password *"
                variant="outlined" className='text text1'
                onChange={onChangeInput}></TextField>
                <Button type='submit' className='form-btn' onClick={()=>setIsShowPassword(!isShowPassword)} >
                {
                  isShowPassword===false?<IoMdEyeOff/>:<IoEye/>
                }
                  </Button>
            </div>
            <Link to='#' className='link-color' onClick={forgotPassword}>Forgot Password ?</Link>

            <div className="login-btn">
              <Button
                disabled={!valideValue}
                type='submit'
                className='bg-org'
              >
                {isLoading ? <CircularProgress color="inherit" size={20} /> : 'Login'}
              </Button>
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
