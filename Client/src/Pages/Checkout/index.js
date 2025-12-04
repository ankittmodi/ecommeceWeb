import React, { useContext, useEffect, useState } from 'react'
import './style.css';
import Button from '@mui/material/Button';
import { myContext } from '../../App';
import { FiPlus } from "react-icons/fi";
import Radio from "@mui/material/Radio";
import noAddress from '../../assets/noaddress.avif'
import { fetchDataFromApi } from '../../utils/Api';
const Checkout = () => {
  const context=useContext(myContext);
  const[isChecked,setIsChecked]=useState(0);
  const [userAddress, setUserAddress] = useState([]);
  const[selectedAddress,setSelectedAddress]=useState("");
  const[totalAmount,setTotalAmount]=useState();

  const getUserAddress = async () => {
    try {
      const res = await fetchDataFromApi(`/api/address/get?userId=${context.userData?._id}`);
      setUserAddress(res?.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (context.userData?._id) {
      getUserAddress();
    }
  }, [context.userData?._id]);
  const handleChange=(e,index)=>{
    if(e.target.checked){
      setIsChecked(index);
      setSelectedAddress(e.target.value);
    }
  }

  const checkout=()=>{
    
  }
  return (
    <>
      <section className="checkout">
        <form onSubmit={checkout}>
          <div className="container">
          <div className="left-col">
            <div className="card">
              <div className='check-group'>
                <h3>Select Delivery Address</h3>
                <Button className='check-btn' onClick={() => context.toggleAddressPanel(true)()}><FiPlus /> Add New Address</Button>
              </div>
              <br/>
              <div className='select-address'>
              {
                context?.userData?.address_details?.length!==0 ? context?.userData?.address_details?.map((address,index)=>{
                  return(
                    <label className={`address-label ${isChecked===index && "checked-color"}`} key={index}>
                      <Radio name="radio-buttons" size='small' onChange={(e)=>handleChange(e,index)} checked={isChecked===index} value={address?._id}/>
                      <div className='user-info'>
                          <p>{address?.addressType}</p>
                          <h4>{context?.userData?.name}</h4>
                          {/* <div>
                            <Button variant="outlined" className='edit-btn' onClick={() => context.toggleAddressPanel(true)()}>Edit</Button>
                          </div> */}
                        <p>{address?.landmark}, {address?.address_line1}, {address?.city},{address?.pincode}, {address?.State}, {address?.country},</p>
                        <p>+{context?.userData?.mobile}</p>
                      </div>
                    </label>
                  )
                })
                :
                <div className='address-img'>
                  <div className='no-address'>
                    <img src={noAddress}/>
                  </div>
                </div>
              }
                
              </div>
            </div>
          </div>
          <div className="right-col">
            <div className="card">
              <h2>Your Order</h2>
              <div className="right-item">
                <span>Product</span>
                <span>Subtotal:{}</span>
              </div>
              <hr />
              <div className="checkout-box">
                <div className="details">
                {
                  context.cartData?.length!==0 && context?.cartData?.map((item,index)=>{
                    return(
                      <div className="item" key={index}>
                        <div className="img">
                          <img src={item?.image} alt="" />
                        </div>
                        <div className="info">
                          <p>{item?.productTitle.substr(0,25)+"..."}</p>
                          <div className="desc">
                            <span>Qty:{item?.quantity}</span>
                            <span>&#x20b9; {item?.quantity*item?.price}</span>
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
                  
                  {/* <div className="item">
                    <div className="img">
                      <img src="https://serviceapi.spicezgold.com/download/1742462383493_siril-georgette-brown-color-saree-with-blouse-piece-product-images-rvegeptjtj-1-202308161431.jpg" alt="" />
                    </div>
                    <div className="info">
                      <h4>Koskii stylish saree with best one</h4>
                      <div className="desc">
                        <span>Qty: 1</span>
                        <span>Rs: 1300:00</span>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="img">
                      <img src="https://serviceapi.spicezgold.com/download/1742462383493_siril-georgette-brown-color-saree-with-blouse-piece-product-images-rvegeptjtj-1-202308161431.jpg" alt="" />
                    </div>
                    <div className="info">
                      <h4>Koskii stylish saree with best one</h4>
                      <div className="desc">
                        <span>Qty: 1</span>
                        <span>Rs: 1300:00</span>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="img">
                      <img src="https://serviceapi.spicezgold.com/download/1742462383493_siril-georgette-brown-color-saree-with-blouse-piece-product-images-rvegeptjtj-1-202308161431.jpg" alt="" />
                    </div>
                    <div className="info">
                      <h4>Koskii stylish saree with best one</h4>
                      <div className="desc">
                        <span>Qty: 1</span>
                        <span>Rs: 1300:00</span>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="img">
                      <img src="https://serviceapi.spicezgold.com/download/1742462383493_siril-georgette-brown-color-saree-with-blouse-piece-product-images-rvegeptjtj-1-202308161431.jpg" alt="" />
                    </div>
                    <div className="info">
                      <h4>Koskii stylish saree with best one</h4>
                      <div className="desc">
                        <span>Qty: 1</span>
                        <span>Rs: 1300:00</span>
                      </div>
                    </div>
                  </div> */}
                </div>
                <Button className='btn' type='submit'>Checkout</Button>
              </div>
            </div>
          </div>
        </div>
        </form>
      </section>
    </>
  )
}

export default Checkout
