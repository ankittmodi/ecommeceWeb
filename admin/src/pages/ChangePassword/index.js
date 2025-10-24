import React,{useContext, useState} from 'react'
import './style.css';
import logo from '../../assests/logo.png'
import Button from '@mui/material/Button';
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate,NavLink } from 'react-router-dom';
import { MyContext, myContext } from '../../App';
import CircularProgress from '@mui/material/CircularProgress';
import { postData } from '../../utils/Api';
import TextField from '@mui/material/TextField';
const ChangePassword = () => {
  const[isShowPassword,setIsShowPassword]=useState(false);
  const[isShowPassword2,setIsShowPassword2]=useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // for backend use password change
  const [formFeilds, setFormFeilds] = useState({
      email:localStorage.getItem("userEmail"),
      newPassword: '',
      confirmPassword: ''
    });
  const context=useContext(MyContext);
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
    <section className='login'>
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
          <img src={logo} alt='logo' />
          <h1>Welcome Back!<br/> <span style={{color:"blue"}}>You can change your password from here.</span></h1>
          <br/>
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
                          className='bg-org login-btn'

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

export default ChangePassword;
