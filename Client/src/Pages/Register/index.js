import React, { useContext, useState } from 'react';
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
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const context = useContext(myContext);
  const history = useNavigate();

  // form fields
  const [formFeilds, setFormFeilds] = useState({
    name: "",
    email: "",
    password: ""
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFeilds({
      ...formFeilds,
      [name]: value
    });
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
        context.openAlertBox("success", res.message);

        // ✅ Save details for Verify page
        localStorage.setItem("userEmail", formFeilds.email);
        localStorage.setItem("actionType", "register"); // ✅ important fix

        // clear form
        setFormFeilds({ name: "", email: "", password: "" });

        // redirect to verify
        history("/verify");
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
    <section className="login">
      <div className="container">
        <div className="card">
          <h3>Register with a new Account</h3>
          <form className='login-form' onSubmit={handleSubmit}>
            <div className="form-group">
              <TextField
                id="name"
                name="name"
                value={formFeilds.name}
                disabled={isLoading}
                label="Full Name *"
                variant="outlined"
                className='text'
                onChange={onChangeInput}
              />
            </div>

            <div className="form-group">
              <TextField
                type='email'
                id="email"
                name='email'
                value={formFeilds.email}
                disabled={isLoading}
                label="Email Id *"
                variant="outlined"
                className='text'
                onChange={onChangeInput}
              />
            </div>

            <div className="form-group text1">
              <TextField
                type={isShowPassword ? 'text' : 'password'}
                id="password"
                name='password'
                value={formFeilds.password}
                disabled={isLoading}
                label="Password *"
                variant="outlined"
                className='text text1'
                onChange={onChangeInput}
              />
              <Button
                className='form-btn'
                type='button'
                onClick={() => setIsShowPassword(!isShowPassword)}
              >
                {isShowPassword ? <IoEye /> : <IoMdEyeOff />}
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

            <p>Already have an account? <Link to='/login' className='link link-color'>Login</Link></p>
            <p>Or continue with social Account</p>
            <Button className='sign-btn'><FcGoogle /> Login with Google</Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
