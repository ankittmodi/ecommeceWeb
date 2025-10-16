import React,{useState} from 'react'
import './login.css';
import logo from '../../assests/logo.png'
import { Link, NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import { FcGoogle } from "react-icons/fc";
import { BiLogoFacebookCircle } from "react-icons/bi";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
const Login = () => {
  const [loadinggoogle, setLoadinggoogle] =useState(false);
  const [loadingfb, setLoadingfb] =useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  function handleClickGoogle() {
    setLoadinggoogle(true);
  }
  function handleClickFb() {
    setLoadingfb(true);
  }

  const [formFields, setFormFields] = useState({
    email: '',
    password: ''
  });
  

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formFields, 'Remember Me:', rememberMe);
  };
  return (
    <section className='login'>
      {/* ===== Header ===== */}
      <header className='login-header'>
        <NavLink to='/'><img src={logo} alt='logo' /></NavLink>

        <div className='header-btns'>
          <NavLink to='/login' exact='true'>
            <Button className='btn btn1'>Login</Button>
          </NavLink>
          <NavLink to='/signup'>
            <Button className='btn'>Sign Up</Button>
          </NavLink>
        </div>
      </header>

      {/* ===== Login Box (centered) ===== */}
      <div className='login-box'>
        <div className='login-content'>
          <img src={logo} alt='logo' />
          <h1>Welcome Back!<br/> <span style={{color:"blue"}}>Sign in with your credentials.</span></h1>

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
            <span className='content'>Or, Sign in with your email</span>
            <span className='line'></span>
          </div>

          <form onSubmit={handleSubmit}>
          
          {/* Email Field */}
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            name="email"
            value={formFields.email}
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
            value={formFields.password}
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
            <Link to="/forgot-password" style={{ textDecoration: 'none', color: '#1976d2' }}>
              Forgot Password?
            </Link>
          </div>

          {/* Sign In Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={!formFields.email || !formFields.password}
            className='login-btn'
          >
            Sign In
          </Button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Login;
