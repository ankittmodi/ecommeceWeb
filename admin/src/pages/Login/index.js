import React from 'react'
import './login.css';
import logo from '../../assests/logo.png'
import login from '../../assests/login-back.jpg';
import { Link,NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';
const Login = () => {
  return (
    <section className='login'>
        <header className='login-header'>
            <NavLink to='/'><img src={logo} alt='logo'/></NavLink>

            <div className='header-btns'>
                <NavLink to='/login' exact={true} activeClassName='isActive'><Button className='btn'>Login</Button></NavLink>
                <NavLink to='/signup'><Button className='btn'>Sign Up</Button></NavLink>
            </div>
        </header>
        <img src={login} alt='login image'/>
    </section>
  )
}

export default Login
