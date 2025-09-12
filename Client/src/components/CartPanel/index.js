import React from 'react'
import './style.css';
import {Link} from 'react-router-dom';
import Button from '@mui/material/Button';
// import { RxCross2 } from "react-icons/rx";
import { MdOutlineDelete } from "react-icons/md";
const CartPanel = () => {
  return (
    <>
      <div className="cart-scroll">
            <div className="cart-item">
              <div className="img">
                <Link to='/product/45875'>
                <img src="https://serviceapi.spicezgold.com/download/1742462383493_siril-georgette-brown-color-saree-with-blouse-piece-product-images-rvegeptjtj-1-202308161431.jpg" alt="" /></Link>
              </div>
              <div className="info">
                <h4 >Cropped satin saree</h4>
                <p>
                  <span>Qty:<strong>2</strong> </span>
                  <span style={{color:"#ff5252"}}>Price: <strong>1,500.00</strong> </span>
                </p>
                <MdOutlineDelete className='icon'/>
              </div>
            </div>
            <div className="cart-item">
              <div className="img">
                <Link to='/product/45875'>
                <img src="https://serviceapi.spicezgold.com/download/1742462383493_siril-georgette-brown-color-saree-with-blouse-piece-product-images-rvegeptjtj-1-202308161431.jpg" alt="" /></Link>
              </div>
              <div className="info">
                <h4 >Cropped satin saree</h4>
                <p>
                  <span>Qty:<strong>2</strong> </span>
                  <span style={{color:"#ff5252"}}>Price: <strong>1,500.00</strong> </span>
                </p>
                <MdOutlineDelete className='icon'/>
              </div>
            </div>
            <div className="cart-item">
              <div className="img">
                <Link to='/product/45875'>
                <img src="https://serviceapi.spicezgold.com/download/1742462383493_siril-georgette-brown-color-saree-with-blouse-piece-product-images-rvegeptjtj-1-202308161431.jpg" alt="" /></Link>
              </div>
              <div className="info">
                <h4 >Cropped satin saree</h4>
                <p>
                  <span>Qty:<strong>2</strong> </span>
                  <span style={{color:"#ff5252"}}>Price: <strong>1,500.00</strong> </span>
                </p>
                <MdOutlineDelete className='icon'/>
              </div>
            </div>
            <div className="cart-item">
              <div className="img">
                <Link to='/product/45875'>
                <img src="https://serviceapi.spicezgold.com/download/1742462383493_siril-georgette-brown-color-saree-with-blouse-piece-product-images-rvegeptjtj-1-202308161431.jpg" alt="" /></Link>
              </div>
              <div className="info">
                <h4 >Cropped satin saree</h4>
                <p>
                  <span>Qty:<strong>2</strong> </span>
                  <span style={{color:"#ff5252"}}>Price: <strong>1,500.00</strong> </span>
                </p>
                <MdOutlineDelete className='icon'/>
              </div>
            </div>
      </div>

      <div className="bottom-details">
        <div className="bottom-info">
          <span>1 item</span>
          <span>Rs: <strong>1,500.00</strong></span>
        </div>
        <div className="bottom-info">
          <span>Shipping</span>
          <span>Rs: <strong>40.00</strong></span>
        </div>
        <div className="bottom-info">
          <span>Total (tax excl.)</span>
          <span>Rs. <strong>19.00</strong></span>
        </div>
        <br />
        <div className="btn-group">
        <Link to='/cart'><Button>View Cart</Button></Link>
        <Link to='/checkout'><Button>Checkout</Button></Link>
      </div>
      </div>
      
    </>
  )
}

export default CartPanel
