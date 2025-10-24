import React,{useState} from 'react'
import './style.css';
import logo from '../../assests/logo.png'
import { Link, NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
const ForgotPassword = () => {
  const [rememberMe, setRememberMe] = useState(false);
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
    <section className='login' style={{height:"100vh"}}>
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
          <h1>Having trouble to sign in? <br/> <span style={{color:"blue"}}>Reset your password.</span></h1>

          <br/>
          <form onSubmit={handleSubmit}>
          
          {/* Email Field */}
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            name="email"
            placeholder='Enter your email'
            value={formFields.email}
            onChange={onChangeInput}
            required
            style={{ marginBottom: '20px' }}
          />

          {/* Sign In Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={!formFields.email || !formFields.password}
            className='login-btn'
          >
            Reset Password
          </Button>
          <br/>
          <div className='forgot-sign'>
          <span>Don't want to reset? </span>
          <Link to="/login" style={{ textDecoration: 'none', color: '#1976d2' }}>
            Sign In
          </Link></div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default ForgotPassword;
