import React,{useContext, useEffect, useState} from 'react'
import './addressPanel.css';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import { myContext } from '../../App';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { fetchDataFromApi, postData } from '../../utils/Api';
import { PhoneInput } from 'react-international-phone';
const AddressPanel = () => {
          const [isLoading, setIsLoading] = useState(false);
          const [status, setStatus] =useState(true);
          const[addressType,setAddressType]=useState("");
          const context=useContext(myContext);
          const [formFeilds, setFormFeilds] = useState({
                address_line1:"",
                city: "",
                state:"",
                pincode:"",
                country:"",
                landmark:"",
                mobile:"",
                addressType:"",
                // status:true,
                // selected:false,
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
        // const handleChangeStatus = (event) => {
        //   setStatus(event.target.value);
        //   setFormFeilds(prev => ({
        //     ...prev,
        //     status: event.target.value
        //   }));
        // }
        const handleChangeAddressType=(event)=>{
          setAddressType(event.target.value);
          setFormFeilds(()=>({
            ...formFeilds,
            addressType:event.target.value
          }))
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
                return ;
              }
              if (!formFeilds.addressType) {
                context.openAlertBox("error", "Please select address type");
                setIsLoading(false);
                return;
              }
          
              postData(`/api/address/add`, formFeilds, { withCredentials: true })
              .then((data) => {
                //   console.log(data);
                  setIsLoading(false);
      
                  if (!data.err) {
                  context.openAlertBox("success", data.message);
                  // onSuccess();
                  fetchDataFromApi(`/api/address/get?userId=${context.userData?._id}`).then((res)=>{
                            // console.log(res.data);
                      context.setAddress(res.data);
                      context.toggleAddressPanel(false)();
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
    <div>
      <form className='form1' onSubmit={handleSubmit}>
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
                                  <h3>Landmark</h3>
                                  <input type='text' className='search'
                                      name='landmark'
                                      value={formFeilds.landmark}
                                      onChange={onChangeInput}
                                  />
                              </div>
                              {/* <div className='col'>
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
                              </div> */}
                          </div>
                          <div className='products product-grid2'>
                              <div className='col'>
                                <h4 style={{opacity:"0.8",fontSize:"14px"}}>Address Type</h4>
                                <RadioGroup
                                  row
                                  aria-labelledby="demo-row-radio-buttons-group-label"
                                  name="row-radio-buttons-group"
                                  value={addressType}
                                  onChange={handleChangeAddressType}
                                >
                                  <FormControlLabel value="Home" control={<Radio />} label="Home" />
                                  <FormControlLabel value="Office" control={<Radio />} label="Office" />
                                </RadioGroup>
                              </div>
                              
                          </div>
                      </div>
                      <br/>
                      <div className='btn-groups'>
                          <Button type="submit" className='bg-org'>Save Address</Button>
                          <Button
                              className='bg-org'
                          >
                              Cancel
                          </Button>
                      </div>
                  </form>
    </div>
  )
}

export default AddressPanel
