import React, { useContext, useEffect, useState } from 'react'
import './profile.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { MyContext} from '../../App';
import { useNavigate } from 'react-router-dom';
import { editData, fetchDataFromApi} from '../../utils/Api';
import CircularProgress from '@mui/material/CircularProgress';
import MyAccountSidebar from '../../Component/AdminAccount';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import Radio from '@mui/material/Radio';


const Profile = () => {
    const [isLoading, setIsLoading] = useState(false);
    const[userId,setUserId]=useState();
    const [formFeilds, setFormFeilds] = useState({
      name:"",
      email: "",
      mobile:""
    });
    const [phone, setPhone] = useState('');
    
    const [selectedValue, setSelectedValue] =useState('');
    const context=useContext(MyContext);
    const history=useNavigate();
    useEffect(()=>{
      const token=localStorage.getItem("accessToken");
      if(token===null){
        history("/");
      }
    },[context?.isLogin]);

  useEffect(() => {
      if(context?.userData?._id!=="" && context?.userData?._id!==undefined){
        fetchDataFromApi(`/api/address/get?userId=${context.userData?._id}`).then((res)=>{
          // console.log(res.data);
          context.setAddress(res.data);
        })
        setUserId(context?.userData?._id);
        setFormFeilds({
          name:context?.userData?.name,
          email:context?.userData?.email,
          mobile:context?.userData?.mobile
        })
      }
    }, [context?.userData]);

    const handleChange = (event) => {
      setSelectedValue(event.target.value);
    };

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
    <section className='my-account profile' >
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
                <PhoneInput
                    defaultCountry="in"
                    value={String(formFeilds.mobile || "")}
                    disabled={isLoading===true?true:false}
                    onChange={(value) =>
                        setFormFeilds(prev => ({ ...prev, mobile: value }))
                    }
                />
              </div>
            </div>
            <div className='address' onClick={()=>context.setIsOpenFullScreen({
                open:true,
                model:"Add New Address"
                })}>
              <span >Add Address</span>
            </div>

            <div className='address-box'>
                {context.address.length > 0 && context.address.map((item, index) => {
                const value =
                  item.address_line1 +
                  item.city +
                  item.state +
                  item.pincode +
                  item.country;

                return (
                  <div className="address-part" key={index}>
                    <Radio
                      checked={selectedValue === value}
                      onChange={handleChange}
                      value={value}
                      name="radio-buttons"
                    />
                    <span>
                      {item.address_line1}, {item.city}, {item.state} - {item.pincode},{" "}
                      {item.country}
                    </span>
                  </div>
                );
              })}

            </div>
            <br />
            <div className="profile-btn">
              <Button className='login-btn' type='submit' disabled={!valideValue || isLoading}>{isLoading ? <CircularProgress color="inherit" size={25} /> : 'Update Profile'}</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </section>
  )
}

export default Profile
