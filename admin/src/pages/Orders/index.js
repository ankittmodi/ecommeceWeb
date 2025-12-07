import React, { useEffect, useState } from 'react';
import './style.css'
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { Button } from '@mui/material';
import Badges from '../../Component/Badges';
import SearchBox from '../../Component/SearchBox';
import {fetchDataFromApi } from '../../utils/Api';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
const Order = () => {
  const[isOpenOrder,setIsOpenOrder]=useState(null);
    const[order,setOrder]=useState([]);
    const [status, setStatus] =useState('');

    const handleChangeStatus = (event) => {
      setStatus(event.target.value);
    }; 

    const isShowOrder=(index)=>{
      if(isOpenOrder===index){
        setIsOpenOrder(null);
      }
      else{
        setIsOpenOrder(index);
      }
    }
  useEffect(()=>{
      fetchDataFromApi(`/api/order/order-list`).then((res)=>{
        // console.log(res?.data);
        if(!res?.error){
          setOrder(res?.data);
          
        }
      })
    },[]);
  return (
    <div className='tables-card'>
        <div className='table-flex recent-order'>
          <h2>Recent Orders</h2>
          <div>
            <SearchBox className="order-search"/>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="order-table">
            <thead className='table-container'>
              <tr className='table-header'>
                <th>&nbsp;</th>
                <th>Order Id</th>
                <th>Payment Id</th>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Address</th>
                <th>Pincode</th>
                <th>Total Amount</th>
                <th>Email</th>
                <th>User Id</th>
                <th>Order Status</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
                {
                  order?.length!==0 && order?.map((order,index)=>{
                    return(
                      <>
                        <tr>
                            <td><Button onClick={()=>isShowOrder(index)}>
                            {isOpenOrder===index?<FaAngleUp />:<FaAngleDown/>}
                            </Button></td>
                            <td>{order?._id}</td>
                            <td>{order.paymentId?order.paymentId:'CASH ON DELIVERY'}</td>
                            <td>{order?.userId?.name}</td>
                            <td>{order?.userId?.mobile}</td>
                            <td>{order?.delivery_address?.landmark +","+ order?.delivery_address?.address_line1+","+ order?.delivery_address?.city}</td>
                            <td>{order?.delivery_address?.pincode}</td>
                            <td>{order?.totalAmt}</td>
                            <td>{order?.userId?.email}</td>
                            <td>{order?.userId?._id}</td>
                            <td>{order?.order_status}</td>
                            <td>
                              <Select
                                value={status}
                                onChange={handleChangeStatus}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                style={{width:"90px"}}
                              >
                                <MenuItem value={"pending"}>Pending</MenuItem>
                                <MenuItem value={"confirm"}>Confirm</MenuItem>
                                <MenuItem value={"delivered"}>Delivered</MenuItem>
                              </Select>
                            </td>
                            <td>{order?.createdAt?.split("T")[0]}</td>
                            
                          </tr>
                          {
                            isOpenOrder===index && (
                            <tr>
                            <td colSpan="8">
                              <hr />
                              <table className="order-table1">
                                <thead>
                                  <tr style={{width:"100%"}}>
                                    <th style={{width:"10%"}}>Product Id</th>
                                    <th style={{width:"50px"}}>Product Title</th>
                                    <th style={{width:"5%"}}>Image</th>
                                    <th style={{width:"5%"}}>Quantity</th>
                                    <th style={{width:"5%"}}>Price</th>
                                    <th style={{width:"5%"}}>Subtotal</th>
                                  </tr>
                                </thead>
                                <tbody>
                                {
                                  order?.products?.map((product,index)=>{
                                    return(
                                      <tr>
                                        <td>{product?.productId}</td>
                                        <td style={{width:"50px"}}>{product.productTitle?.substr(0,100)+"..."}</td>
                                        <td><img src={product?.image} alt="" className='table-img'/></td>
                                        <td>{product?.quantity}</td>
                                        <td> &#x20b9; {product?.price}</td>
                                        <td> &#x20b9; {product?.subTotal}</td>
                                      </tr>
                                    )
                                  })
                                }
                                  
                                  {/* <tr>
                                    <td>3h4g56g476g4g4h5j7</td>
                                    <td>Koskii saree</td>
                                    <td><img src="https://serviceapi.spicezgold.com/download/1742462383493_siril-georgette-brown-color-saree-with-blouse-piece-product-images-rvegeptjtj-1-202308161431.jpg" alt="" className='table-img'/></td>
                                    <td>1</td>
                                    <td>1500:00</td>
                                    <td>1540:00</td>
                                  </tr> */}
                                </tbody>
                              </table>
                            </td>
                            </tr>
                            
                            )
                          }
                      </>
                    )
                  })
                }
                 
                  {/* <tr>
                    <td><Button onClick={()=>isShowOrder(1)}>
                    {isOpenOrder===1?<FaAngleUp />:<FaAngleDown/>}
                    </Button></td>
                    <td>3h4g56g476g4g4h5j7</td>
                    <td>h4g56g476g4</td>
                    <td>Ankit Kumar</td>
                    <td>5485158415</td>
                    <td>Maithon, Dhanbad, Jharkhand, India</td>
                    <td>828407</td>
                    <td>1499:00</td>
                    <td>murad345@gmail.com</td>
                    <td>Ankit123445</td>
                    <td><Badge status='confirm'/></td>
                    <td>25-07-2025</td>
                  </tr>
                  {
                    isOpenOrder===1 && (
                    <tr>
                    <td colSpan="9">
                      <hr />
                      <table className="order-table1">
                        <thead>
                          <tr>
                            <th>Product Id</th>
                            <th>Product Title</th>
                            <th>Image</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Subtotal</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>3h4g56g476g4g4h5j7</td>
                            <td>Koskii saree</td>
                            <td><img src="https://serviceapi.spicezgold.com/download/1742462383493_siril-georgette-brown-color-saree-with-blouse-piece-product-images-rvegeptjtj-1-202308161431.jpg" alt="" className='table-img'/></td>
                            <td>1</td>
                            <td>1500:00</td>
                            <td>1540:00</td>
                          </tr>
                          <tr>
                            <td>3h4g56g476g4g4h5j7</td>
                            <td>Koskii saree</td>
                            <td><img src="https://serviceapi.spicezgold.com/download/1742462383493_siril-georgette-brown-color-saree-with-blouse-piece-product-images-rvegeptjtj-1-202308161431.jpg" alt="" className='table-img'/></td>
                            <td>1</td>
                            <td>1500:00</td>
                            <td>1540:00</td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                    </tr>
                    
                    )
                  } */}
                </tbody>
          </table>
        </div>
      </div>
  )
}

export default Order
