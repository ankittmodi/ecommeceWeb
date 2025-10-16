import React, { useContext, useState } from 'react'
import './style.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { Link } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { postData } from '../../utils/Api';
import { myContext } from '../../App';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
const Register = () => {
  const[isShowPassword,setIsShowPassword]=useState(false);
  const[isLoading,setIsLoading]=useState(false);
  const context=useContext(myContext);
  const history=useNavigate();
  // for backend use
  const[formFeilds,setFormFeilds]=useState({
    name:"",
    email:"",
    password:""
  });
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
    if(formFeilds.name===""){
      context.openAlertBox("error","Please enterfull name")
      return false;
    }
    if(formFeilds.email===""){
      context.openAlertBox("error","Please enter email Id ")
      return false;
    }
    if(formFeilds.password===""){
      context.openAlertBox("error","Please enter password")
      return false;
    }
    postData("/api/user/register", formFeilds).then((res)=>{
      // console.log(res);
      if(res.error!==true){
        setIsLoading(false);
        context.openAlertBox("success",res.message);
        localStorage.setItem("userEmail",formFeilds.email);
        setFormFeilds({
        name:"",
        email:"",
        password:""
      })
      
      history('/verify');
      }else{
        context.openAlertBox("error",res.message);
        setFormFeilds({
          name:"",
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
          <h3>Register with a new Account</h3>
          <form action="" className='login-form' onSubmit={handleSubmit}>
          <div className="form-group">
              <TextField
                type='name'
                id="name"
                name="name"
                value={formFeilds.name}
                disabled={isLoading===true?true:false}
                label="Full Name *"
                variant="outlined" 
                className='text'
                onChange={onChangeInput}></TextField>
            </div>
            <div className="form-group">
              <TextField
                type='email'
                id="email"
                name='email'
                value={formFeilds.email}
                disabled={isLoading===true?true:false}
                label="Email Id *"
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
                <Button className='form-btn' onClick={()=>setIsShowPassword(!isShowPassword)}>
                {
                  isShowPassword===false?<IoMdEyeOff/>:<IoEye/>
                }
                  </Button>
            </div>

            <div className="login-btn">
              <Button
                disabled={!valideValue}
                type='submit'
                className='bg-org'
              >
                {isLoading ? <CircularProgress color="inherit" size={20} /> : 'Register'}
              </Button>
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
