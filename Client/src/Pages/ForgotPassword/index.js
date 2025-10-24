import React, { useContext, useState } from 'react'
import './style.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { myContext } from '../../App';
import CircularProgress from '@mui/material/CircularProgress';
import { postData } from '../../utils/Api';
const ForgotPassword = () => {
  const[isShowPassword,setIsShowPassword]=useState(false);
  const[isShowPassword2,setIsShowPassword2]=useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // for backend use password change
  const [formFeilds, setFormFeilds] = useState({
      email:localStorage.getItem("userEmail"),
      newPassword: '',
      confirmPassword: ''
    });
  const context=useContext(myContext);
  const history=useNavigate();
  

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFeilds(prev => ({
      ...prev,
      [name]: value
    }));
  }

  const valideValue = Object.values(formFeilds).every(el => el);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setIsLoading(true);
  
      if (!formFeilds.newPassword) {
        context.openAlertBox("error", "Please enter new password");
        setIsLoading(false);
        return false;
      }
  
      if (!formFeilds.confirmPassword) {
        context.openAlertBox("error", "Please enter confirm password");
        setIsLoading(false);
        return false;
      }

      if (formFeilds.confirmPassword!==formFeilds.newPassword) {
        context.openAlertBox("error", "Password and confirm password are not matched");
        setIsLoading(false);
        return;
      }

      // backend calling for reset password
      postData(`/api/user/reset-password`,formFeilds).then((res)=>{
        console.log(res);
        if(res.error===false){
          localStorage.removeItem("userEmail");
          localStorage.removeItem("actionType");
          context.openAlertBox("success",res.message);
          setIsLoading(false);
          history('/login');
        }
        else{
          context.openAlertBox("error",res.message);
        }
      })
    }
  return (
    <section className="login">
      <div className="container">
        <div className="card">
          <h3>Forgot Password</h3>
          <form action="" className='login-form' onSubmit={handleSubmit}>
            <div className="form-group text1">
              <TextField
              type={isShowPassword===false?'password':'text'}
                id="password"
                label="New Password *"
                name='newPassword'
                value={formFeilds.newPassword}
                disabled={isLoading===true?true:false}
                variant="outlined" className='text text1'
                onChange={onChangeInput}></TextField>
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
                name='confirmPassword'
                value={formFeilds.confirmPassword}
                disabled={isLoading===true?true:false}
                variant="outlined" className='text text1'
                onChange={onChangeInput}></TextField>
                <Button type='submit' className='form-btn' onClick={()=>setIsShowPassword2(!isShowPassword2)} >
                {
                  isShowPassword2===false?<IoMdEyeOff/>:<IoEye/>
                }
                  </Button>
            </div>

            <div className="login-btn">
              <Button
                disabled={!valideValue || isLoading}
                type='submit'
                className='bg-org'
              >
                {isLoading ? <CircularProgress color="inherit" size={20} /> : 'Change Password'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default ForgotPassword;
