import React,{useContext, useEffect, useState} from 'react'
import './style.css';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { IoBagCheckOutline } from "react-icons/io5";
import ItemSize from './ItemSize';
import { myContext } from '../../App';
const CartPage = () => {
  const context=useContext(myContext);
  // console.log(context?.cartData);
  useEffect(()=>{
    context.getCartItems();
  })
  return (
    <section className='add-section'>
      <div className="container">
        <div className="left-part">
          <div className="cart-box">
          <h2>Your Cart</h2>
          <p>There are <span>{context?.cartData?.length}</span> products in your cart</p>
            {
              context?.cartData?.length!==0 && context?.cartData?.map((item,index)=>{
                return(
                  <ItemSize size="small" qty={item?.quantity} key={index} item={item} selected={item?.size}/>
                )
              })
            }
            {/* <ItemSize size="small" qty='1'/>
            <ItemSize/>
            <ItemSize/> */}
          </div>
        </div>
        <div className="right-part">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <hr />
            <div className="bottom-info">
                <span>Subtotal</span>
                <span><strong>{
                  (context?.cartData?.length!==0?
                  context?.cartData?.map(item=>parseInt(item.price)*item.quantity).reduce((total,value)=>total+value,0):0)?.toLocaleString('en-US',{style:'currency',currency:'INR'})
                }</strong></span>
              </div>
              <div className="bottom-info">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="bottom-info">
                <span>Estimate for</span>
                <span>India</span>
              </div>
              <br />
              <div className="cart-btn">
              <Link to='/checkout'><Button className='add-btn'><IoBagCheckOutline/> Checkout</Button></Link>
              </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CartPage
