import React, { useContext, useEffect, useState } from 'react'
import './style.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MyAccountSidebar from '../../components/MyAccountSidebar';
import { myContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import { editData } from '../../utils/Api';
import CircularProgress from '@mui/material/CircularProgress';
const MyAccount = () => {
  const [isLoading, setIsLoading] = useState(false);
  const[userId,setUserId]=useState();
    const [formFeilds, setFormFeilds] = useState({
      name:"",
      email: "",
      mobile:""
    });
  const context=useContext(myContext);
  const history=useNavigate();
  useEffect(()=>{
    const token=localStorage.getItem("accessToken");
    if(token===null){
      history("/");
    }
  },[context?.isLogin]);

  useEffect(() => {
      if(context?.userData?._id!=="" && context?.userData?._id!==undefined){
        setUserId(context?.userData?._id);
        setFormFeilds({
          name:context?.userData?.name,
          email:context?.userData?.email,
          mobile:context?.userData?.mobile
        })
      }
    }, [context?.userData]);

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

    if (!formFeilds.name) {
      context.openAlertBox("error", "Please enter your full name");
      setIsLoading(false);
      return;
    }
    if (!formFeilds.email) {
      context.openAlertBox("error", "Please enter email Id");
      setIsLoading(false);
      return;
    }
    if (!formFeilds.mobile) {
      context.openAlertBox("error", "Please enter mobile number");
      setIsLoading(false);
      return;
    }

    // ✅ Call API
    editData(`/api/user/${userId}`, formFeilds, { withCredentials: true })
      .then((res) => {
        const data = res.data;
        if (!data.error) {
          setIsLoading(true);
          context.openAlertBox("success", data.message);

          // ✅ Update context and localStorage
          // localStorage.setItem("userName", data.user.name);
          // localStorage.setItem("userEmail", data.user.email);
          // localStorage.setItem("userMobile", data.user.mobile || "");

          // context.setUserData({
          //   ...context.userData,
          //   name: data.user.name,
          //   email: data.user.email,
          //   mobile: data.user.mobile,
          // });

          // setFormFeilds({
          //   name:"",
          //   email:"",
          //   mobile:""
          // });
          history("/");

        } else {
          context.openAlertBox("error", data.message);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        context.openAlertBox("error", "Something went wrong!");
        console.error(err);
      });
    };

  return (
    <section className='my-account' >
    <div className="container">
      <div className="col1">
        <MyAccountSidebar/>
      </div>
      <div className="col2">
        <div className="submit-details">
          <h2>My Profile</h2>
          <hr />
          <form action="" onSubmit={handleSubmit}>
            <div className="user-form">
              <div className="part1">
                <TextField id="outlined-basic" 
                label="Full Name" 
                variant="outlined" 
                size='small'
                type='text'
                className='input'
                name='name'
                value={formFeilds.name}
                InputLabelProps={{ shrink: true }}
                disabled={isLoading===true?true:false}
                onChange={onChangeInput}
                />
              </div>
              <div className="part1">
                <TextField id="outlined-basic" label="Email" variant="outlined" 
                size='small'
                type='email'
                className='input'
                name='email'
                value={formFeilds.email}
                disabled={true}
                onChange={onChangeInput}
                InputLabelProps={{ shrink: true }}
                />
              </div>
            </div>
            <div className="user-form">
              <div className="part1">
                <TextField id="outlined-basic" 
                label="Phone Number" 
                variant="outlined" 
                size='small'
                type='number'
                className='input'
                name='mobile'
                value={formFeilds.mobile}
                InputLabelProps={{ shrink: true }}
                disabled={isLoading===true?true:false}
                onChange={onChangeInput}
                />
              </div>
            </div>
            <br />
            <div className="profile-btn">
              <Button className='bg-org' type='submit' disabled={!valideValue || isLoading}>{isLoading ? <CircularProgress color="inherit" size={25} /> : 'Update Profile'}</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </section>
  )
}

export default MyAccount
