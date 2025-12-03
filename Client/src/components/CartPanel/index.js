import React, { useContext } from 'react'
import './style.css';
import {Link} from 'react-router-dom';
import Button from '@mui/material/Button';
// import { RxCross2 } from "react-icons/rx";
import { MdOutlineDelete } from "react-icons/md";
import { deleteData } from '../../utils/Api';
import { myContext } from '../../App';
const CartPanel = (props) => {
  const context=useContext(myContext);
  const removeItem=(id)=>{
    deleteData(`/api/cart/delete-cart-item/${id}`).then((res)=>{
      context.openAlertBox("success","Item Removed");
      context.getCartItems();
    })
  }
  return (
    <>
      <div className="cart-scroll">
        {
          props?.data.map((item,index)=>{
            return(
              <div className="cart-item" key={index}>
              <div className="img">
                <Link to='/product/45875'>
                <img src={item?.image} alt="" /></Link>
              </div>
              <div className="info">
                <p style={{textAlign:"left"}}>{item?.productTitle.substr(0,30)+"..."}</p>
                <p>
                  <span>Qty:<strong>{item?.quantity}</strong> </span>
                  <span style={{color:"#ff5252"}}>Price: <strong>{item?.subTotal}</strong> </span>
                </p>
                <MdOutlineDelete className='icon' onClick={()=>removeItem(item?._id)}/>
              </div>
            </div>
            )
          })
        }
            
            {/* <div className="cart-item">
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
            </div> */}
      </div>

              <div className="bottom-details">
              <div className="bottom-info">
                <span>{context?.cartData?.length} item</span>
                <span><strong>{
                  (context?.cartData?.length!==0?
                  context?.cartData?.map(item=>parseInt(item.price)*item.quantity).reduce((total,value)=>total+value,0):0)?.toLocaleString('en-US',{style:'currency',currency:'INR'})
                }</strong></span>
              </div>
              {/* <div className="bottom-info">
                <span>Shipping</span>
                <span>Rs: <strong>40.00</strong></span>
              </div> */}
              <div className="bottom-info">
                <span>Total (tax excl.)</span>
                <span>Rs. <strong>{
                  (context?.cartData?.length!==0?
                  context?.cartData?.map(item=>parseInt(item.price)*item.quantity).reduce((total,value)=>total+value,0):0)?.toLocaleString('en-US',{style:'currency',currency:'INR'})
                }</strong></span>
              </div>
              <br />
              <div className="btn-group">
              <Link to='/cart' onClick={context.toggleCartPanel(false)}><Button>View Cart</Button></Link>
              <Link to='/checkout'><Button>Checkout</Button></Link>
            </div>
            </div>
    </>
  )
}

export default CartPanel
