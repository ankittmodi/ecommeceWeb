import React,{useContext, useState} from 'react'
import './style.css';
import logo from '../../assests/logo.png'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { FcGoogle } from "react-icons/fc";
import { BiLogoFacebookCircle } from "react-icons/bi";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import { postData } from '../../utils/Api';
import { MyContext } from '../../App';

const SignUp = () => {
  const [loadinggoogle, setLoadinggoogle] =useState(false);
  const [loadingfb, setLoadingfb] =useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const context=useContext(MyContext);
  const history=useNavigate();
  function handleClickGoogle() {
    setLoadinggoogle(true);
  }
  function handleClickFb() {
    setLoadingfb(true);
  }

  const [formFeilds, setFormFeilds] = useState({
    email: '',
    password: ''
  });
  

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFeilds(prev => ({
      ...prev,
      [name]: value
    }));
  };
   const valideValue = Object.values(formFeilds).every(el => el);
  const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
  
      // basic validation
      if (!formFeilds.name) return context.openAlertBox("error", "Please enter full name");
      if (!formFeilds.email) return context.openAlertBox("error", "Please enter email ID");
      if (!formFeilds.password) return context.openAlertBox("error", "Please enter password");
  
      try {
        const res = await postData("/api/user/register", formFeilds);
        
        if (res?.error !== true) {
          console.log(res);
          context.openAlertBox("success", res.message);
  
          // ✅ Save details for Verify page
          localStorage.setItem("userEmail", formFeilds.email);
          localStorage.setItem("actionType", "register"); // ✅ important fix
  
          // clear form
          setFormFeilds({ name: "", email: "", password: "" });
  
          // redirect to verify
          // history("/verify");
        } else {
          context.openAlertBox("error", res?.message || "Registration failed");
          setFormFeilds({ name: "", email: "", password: "" });
        }
      } catch (error) {
        console.error("Register Error:", error);
        context.openAlertBox("error", "Unexpected error occurred");
      } finally {
        setIsLoading(false);
      }
    };
  return (
    <section className='login'>
      {/* ===== Header ===== */}
      <header className='login-header'>
        <NavLink to='/'><img src={logo} alt='logo' /></NavLink>

        <div className='header-btns'>
          <Link to='/login' exact='true'>
            <Button className='btn'>Login</Button>
          </Link>
          <Link to='/signup'>
            <Button className='btn'>Sign Up</Button>
          </Link>
        </div>
      </header>

      {/* ===== Login Box (centered) ===== */}
      <div className='login-box'>
        <div className='login-content'>
          <img src={logo} alt='logo' />
          <h1>Join us today !<br/> <span style={{color:"blue"}}>Get special benefits and stay up-to-date.</span></h1>

          <div className='loading-button'>
            <Button
            size="small"
            onClick={handleClickGoogle}
            endIcon={<FcGoogle />}
            loading={loadinggoogle}
            loadingPosition="end"
            variant="outlined"
            className='sign-google'
          >
            Sign Up with Google
          </Button>
          <Button
            size="small"
            onClick={handleClickFb}
            endIcon={<BiLogoFacebookCircle />}
            loading={loadingfb}
            loadingPosition="end"
            variant="outlined"
            className='sign-google'
          >
            Sign Up with Facebook
          </Button>
          </div>
          <br/>
          <div className='description'>
            <span className='line'></span>
            <span className='content'>Or, Sign Up with your email</span>
            <span className='line'></span>
          </div>

          <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <TextField
            label="Full Name"
            variant="outlined"
            fullWidth
            margin="normal"
            name='name'
            value={formFeilds.name}
            disabled={isLoading}
            onChange={onChangeInput}
            required
            style={{ marginBottom: '20px' }}
          />
          {/* Email Field */}
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            name='email'
            value={formFeilds.email}
            disabled={isLoading}
            onChange={onChangeInput}
            required
            style={{ marginBottom: '20px' }}
          />

          {/* Password Field */}
          <TextField
            type={isShowPassword ? 'text' : 'password'}
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            name='password'
            value={formFeilds.password}
            disabled={isLoading}
            onChange={onChangeInput}
            required
          />

          {/* Remember Me & Forgot Password */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', marginBottom: '30px' }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  name="rememberMe"
                  color="primary"
                  size="small"
                />
              }
              label="Remember Me"
            />
            {/* <Link to="/forgot-password" style={{ textDecoration: 'none', color: '#1976d2' }}>
              Forgot Password?
            </Link> */}
          </div>

          {/* Sign In Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={!valideValue}
            className='login-btn'
          >
            {isLoading ? <CircularProgress color="inherit" size={20} /> : 'Register'}
          </Button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default SignUp;
