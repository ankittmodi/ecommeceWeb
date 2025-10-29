import React,{useContext, useState} from 'react'
import './login.css';
import logo from '../../assests/logo.png'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { FcGoogle } from "react-icons/fc";
import { BiLogoFacebookCircle } from "react-icons/bi";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import { MyContext } from '../../App';
import { postData } from '../../utils/Api';
import CircularProgress from '@mui/material/CircularProgress';
const Login = () => {
  const [loadinggoogle, setLoadinggoogle] =useState(false);
  const [loadingfb, setLoadingfb] =useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const context = useContext(MyContext);
    const history = useNavigate();
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

  const forgotPassword = (e) => {
      e.preventDefault();
      if (formFeilds.email==="") {
        context.openAlertBox("error", "Please enter email Id!");
        return false;
      }
      else{
        localStorage.setItem("userEmail",formFeilds.email);
        localStorage.setItem("actionType",'forgot-password');
        postData("/api/user/forgot-password", { email:formFeilds.email})
          .then(res => {
              if(res.error===false){
                context.openAlertBox("success",res.message);
                history("/verify");
              }
              else{
                context.openAlertBox("error",res.message);
              }
        });
        // history('/verify');
      }
    }

  const handleSubmit = (e) => {
      e.preventDefault();
      setIsLoading(true);
  
      if (!formFeilds.email) {
        context.openAlertBox("error", "Please enter email Id");
        setIsLoading(false);
        return;
      }
  
      if (!formFeilds.password) {
        context.openAlertBox("error", "Please enter password");
        setIsLoading(false);
        return;
      }
  
      postData("/api/user/login", formFeilds, { withCredentials: true })
        .then((res) => {
          setIsLoading(false);
          if (!res.error) {
            context.openAlertBox("success", res.message);
            setFormFeilds({
              email:"",
              password:""
            })
            localStorage.setItem("accessToken", res.data.accessToken);
            localStorage.setItem("refreshToken", res.data.refreshToken);
  
            // ✅ Update context immediately
            context.setIsLogin(true);
            history('/');
          } else {
            context.openAlertBox("error", res.message);
            setFormFeilds({ email: "", password: "" });
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
          <h1>Welcome Back!<br/> <span style={{color:"blue"}}>Sign In with your credentials.</span></h1>

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
            Sign In with Google
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
            Sign In with Facebook
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
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            name='email'
            value={formFeilds.email}
            disabled={isLoading===true?true:false}
            onChange={onChangeInput}
            required
            style={{ marginBottom: '20px' }}
          />

          {/* Password Field */}
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            name="password"
            disabled={isLoading===true?true:false}
            value={formFeilds.password}
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
            <Link to="#" onClick={forgotPassword} style={{ textDecoration: 'none', color: '#1976d2' }}>
              {isLoading ? <CircularProgress color="inherit" size={20} /> : 'Forgot Password?'}
            </Link>
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
            {isLoading ? <CircularProgress color="inherit" size={20} /> : 'Sign In'}
          </Button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Login;
