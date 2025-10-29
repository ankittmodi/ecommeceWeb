import React, { useContext, useEffect, useState } from 'react'
import './style.css'
import {Button} from '@mui/material';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { fetchDataFromApi, postData } from '../../utils/Api';
import { MyContext } from '../../App';
const Address = () => {
    const [phone, setPhone] = useState('');
    const[userId,setUserId]=useState();
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] =useState(true);
    const context=useContext(MyContext);
    const [formFeilds, setFormFeilds] = useState({
          address_line1:"",
          city: "",
          state:"",
          pincode:"",
          country:"",
          mobile:"",
          status:true,
          selected:false,
          userId:context.userData?._id
        });
    
     const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFeilds(prev => ({
      ...prev,
      [name]: value
    }));
  }
  useEffect(()=>{
    setFormFeilds(prev => ({
      ...prev,
      userId: formFeilds.userId
    }));
    },[context?.userData])
  //  Status dropdown
  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
    setFormFeilds(prev => ({
      ...prev,
      status: event.target.value
    }));
  }
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
    
        if (!formFeilds.address_line1) {
          context.openAlertBox("error", "Please enter your Address Line 1");
          setIsLoading(false);
          return;
        }
        if (!formFeilds.city) {
          context.openAlertBox("error", "Please enter city name");
          setIsLoading(false);
          return;
        }
        if (!formFeilds.state) {
          context.openAlertBox("error", "Please enter State");
          setIsLoading(false);
          return;
        }
        if (!formFeilds.pincode) {
          context.openAlertBox("error", "Please enter your pincode");
          setIsLoading(false);
          return;
        }
        if (!formFeilds.mobile) {
          context.openAlertBox("error", "Please enter your 10 digit mobile number");
          setIsLoading(false);
          return;
        }
    
        postData(`/api/address/add`, formFeilds, { withCredentials: true })
        .then((data) => {
            // console.log(data);
            setIsLoading(false);

            if (!data.err) {
            context.openAlertBox("success", data.message);
            context.setIsOpenFullScreen({ open: false });
            fetchDataFromApi(`/api/address/get?userId=${context.userData?._id}`).then((res)=>{
                      // console.log(res.data);
                context.setAddress(res.data);
            })
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
    <section className='add-product'>
        <form className='form' onSubmit={handleSubmit}>
            <div className='scroll-form'>
                <div className='products product-grid1'>
                    <div className='col'>
                        <h3>Address Line 1</h3>
                        <input type='text' className='search' 
                            name='address_line1'
                            value={formFeilds.address_line1}
                            onChange={onChangeInput}
                        />
                    </div>
                    <div className='col'>
                        <h3>City</h3>
                        <input type='text' className='search'
                            name='city'
                            value={formFeilds.city}
                            onChange={onChangeInput}
                        />
                    </div>
                </div>
                <div className='products product-grid2'>
                    <div className='col'>
                        <h3>State</h3>
                        <input type='text' className='search'
                            name='state'
                            value={formFeilds.state}
                            onChange={onChangeInput}
                        />
                    </div>
                    <div className='col'>
                        <h3>Pincode</h3>
                        <input type='number' className='search'
                            name='pincode'
                            value={formFeilds.pincode}
                            onChange={onChangeInput}
                        />
                    </div>
                    <div className='col'>
                        <h3>Country</h3>
                        <input type='text' className='search'
                            name='country'
                            value={formFeilds.country}
                            onChange={onChangeInput}
                        />
                    </div>
                </div>
                <div className='products product-grid2'>
                    <div className='col'>
                        <h3>Phone Number</h3>
                        <PhoneInput
                        defaultCountry="in"
                        value={String(formFeilds.mobile || "")}
                        disabled={isLoading===true?true:false}
                        onChange={(value) =>
                            setFormFeilds(prev => ({ ...prev, mobile: value }))
                        }
                        />
                    </div>
                    <div className='col'>
                        <h3>Status</h3>
                        <Select
                        labelId="demo-simple-select-label"
                        id="productCatDrop"
                        value={status}
                        label="Category"
                        size='small'
                        onChange={handleChangeStatus}
                        className='productCat'
                        sx={{ width: '100%' }}
                        >
                        <MenuItem value={true}>True</MenuItem>
                        <MenuItem value={false}>False</MenuItem>
                        </Select>
                    </div>
                </div>
            </div>
            <br/>
            <Button type="submit" className='header-btn'>Publish and View</Button>
        </form>

    </section>
  )
}

export default Address
