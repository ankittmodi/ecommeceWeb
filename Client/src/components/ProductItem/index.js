import React, { useContext, useEffect, useState } from 'react'
import './style.css';
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import { FaRegHeart } from "react-icons/fa";
import { FaCodeCompare } from "react-icons/fa6";
import { MdOutlineZoomOutMap } from "react-icons/md";
import Tooltip from '@mui/material/Tooltip';
import { AiOutlineMinus } from "react-icons/ai";
import { FaPlus } from "react-icons/fa6";
import { myContext } from '../../App';
import { deleteData, editData } from '../../utils/Api';
const ProductItem = (props) => {
  const[quantity,setQuantity]=useState(1);
  const[isAdded,setIsAdded]=useState(false);
  const[cartItem,setCartItem]=useState([]);
  const context=useContext(myContext);

  useEffect(() => {
  const matched = context?.cartData?.filter(cartItem =>
    cartItem.productId === props?.item?._id
  );

  setQuantity(matched[0]?.quantity || 1);
  if (matched?.length > 0) {
    setCartItem(matched);
    setIsAdded(true);
  }
}, [context?.cartData]);

  const addToCart=(product,userId,quantity)=>{
    context?.addToCarts(product,userId,quantity);
    setIsAdded(true);
  }

  const addQty = () => {
    const newQty = quantity + 1;
    setQuantity(newQty);

    const obj = {
      _id: cartItem[0]?._id,
      qty: newQty,  // ✅ correct value
      subTotal: cartItem[0]?.price * newQty
    };

    editData(`/api/cart/update-qty`, obj).then((res) => {
      // console.log(res);
      context.openAlertBox("success",res?.data?.message);
      context.getCartItems();
    });
  };

  const removeQty = () => {
    const newQty = quantity - 1;

    if (newQty <= 0) {
      // Delete from backend
      deleteData(`/api/cart/delete-cart-item/${cartItem[0]?._id}`).then((res) => {
        // console.log(res);
        context.openAlertBox("success","Item Deleted !");
        setIsAdded(false);
        setQuantity(1); // reset
        context.getCartItems(); // refresh cart
      });
    } else {
      const obj = {
        _id: cartItem[0]?._id,
        qty: newQty,  // ✅ correct value
        subTotal: cartItem[0]?.price * newQty
      };

      editData(`/api/cart/update-qty`, obj).then((res) => {
        // console.log(res);
        context.getCartItems();
      });
       setQuantity(newQty);
      }
  };

  return (
    // <div className='container'>
      <div className="image-wrap group">
        <div className="prod-detail ">
          <Link to={`/product/${props?.item?._id}`}>
          <div className="img-part">
            <img src={props?.item?.images?.[0]} alt="" />
            {props?.item?.images?.[1] && (
              <img src={props?.item?.images?.[1]} alt="" className='top-img'/>
            )}
          </div>
          </Link>
          <div className='image-overlay'>
            
          </div>
          <span className='discount'>
            {props?.item?.discount ? `${props.item.discount}% OFF` : ""}
          </span>


          <div className="actions">
            <Tooltip title="Zoom" placement="left-start">
            <Button className='btn-icon' onClick={()=>context.handleOpenProductDetailsModel(true, props?.item)}><MdOutlineZoomOutMap/></Button></Tooltip>
            <Tooltip title="Wishlist" placement="left-start">
            <Button className='btn-icon'><FaRegHeart/></Button></Tooltip>
            <Tooltip title="Compare" placement="left-start">
            <Button className='btn-icon'><FaCodeCompare/></Button></Tooltip>
            <Tooltip title="Zoom" placement="left-start">
            <Button className='btn-icon'><FaRegHeart/></Button></Tooltip>
          </div>
          <div className="infor">
          <h6><Link to={`/product/${props?.item?._id}`} className='link-color'>{props?.item?.name.substr(0,60)+ "..."}</Link></h6>
          <h3 className="two-line-text"><Link to={`/product/${props?.item?._id}`}>{props?.item?.description.substr(0,50)+ "..."}</Link></h3>
            <Rating name="half-rating-read" defaultValue={props?.item?.rating} readOnly />
          <div className="price">
            <span className="old-price"><strong>&#x20b9; {props?.item?.oldPrice}</strong></span>
            <span className="new-price"> &#x20b9; {props?.item?.price}</span>
          </div>
          <div>
            {
              isAdded===false?
              <Button className='add-to-cart' onClick={()=>addToCart(props?.item,context?.userData?._id,quantity)}>Add to cart</Button>:
              <div className='quantity-btn'>
              <Button className='quant-btn' onClick={removeQty}><AiOutlineMinus /></Button>
              <span style={{color:"#000",fontSize:"14px"}}>{quantity}</span>
              <Button className='quant-btn1' onClick={addQty}><FaPlus /></Button>
            </div>
            }
            
          </div>
          </div>
        </div>
      </div>
    // </div>
  )
}

export default ProductItem;
