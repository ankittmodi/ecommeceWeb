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
import { IoIosHeart } from "react-icons/io";
import { myContext } from '../../App';
import { IoIosClose } from "react-icons/io";
import { deleteData, editData, postData } from '../../utils/Api';
const ProductItem = (props) => {
  const[quantity,setQuantity]=useState(1);
  const[isAdded,setIsAdded]=useState(false);
  const[cartItem,setCartItem]=useState([]);
  const context=useContext(myContext);
  const[activeTab,setActiveTab]=useState(null);
  const[showTab,setShowTab]=useState(false);
  const[selectedTab,setSelectedTab]=useState(null);
  const[isAddedList,setIsAddedList]=useState(false);

  const handleActiveTab=(index,name)=>{
    setActiveTab(index);
    setSelectedTab(name)
  }
  useEffect(() => {
  const matched = context?.cartData?.filter(cartItem =>
    cartItem.productId === props?.item?._id
  );

  const myListItem = context?.myListData?.filter(item =>
    item.productId === props?.item?._id
  );

  setQuantity(matched[0]?.quantity || 1);
  if (matched?.length > 0) {
    setCartItem(matched);
    setIsAdded(true);
  }

  if(myListItem?.length!==0){
    setIsAddedList(true);
  }
  else{
    setIsAddedList(false);
  }
}, [context?.cartData, context?.myListData]);

  const addToCart=(product,userId,quantity)=>{
    const productItems={
      _id:product?._id,
      name:product?.name,
      image:product?.images[0],
      rating:product?.rating,
      price:product?.price,
      oldPrice:product?.oldPrice,
      discount:product?.discount,
      size:props?.item?.size?.length!==0?selectedTab:'',
      ram:props?.item?.productRam?.length!==0?selectedTab:'',
      weight:props?.item?.productWeight?.length!==0?selectedTab:'',
      quantity:quantity,
      subTotal:parseInt(product?.price*quantity),
      productId:product?._id,
      countInStock:product?.countInStock,
    }
    if(props?.item?.size?.length!==0 || props?.item?.productRam?.length!==0 ||props?.item?.productWeight?.length!==0){
      setShowTab(true);
    }
    else{
      context?.addToCarts(productItems,userId,quantity);
      setIsAdded(true);
      setShowTab(false);
    }
    if(activeTab!==null){
      context?.addToCarts(productItems,userId,quantity);
      setIsAdded(true);
      setShowTab(false)
    }
    // console.log(productItems)
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

  const handleAddToMyList=(item)=>{
    // console.log(item);
    if(context.userData===null){
      context.openAlertBox("error","You are not login please login first");
      return false;
    }
    else{
      const obj={
        productId:item?._id,
        userId:context.userData?._id,
        productTitle:item?.name,
        image:item?.images[0],
        rating:item?.rating,
        price:item?.price,
        oldPrice:item?.oldPrice,
        brand:item?.brand,
        discount:item?.discount,
      }
      postData('/api/myList/add',obj).then((res)=>{
        if(!res?.error){
          context.openAlertBox("success","Item added in wishlist");
          context.getMyListData();
          setIsAddedList(true);
        }
        else{
          context.openAlertBox("error","Item already added in wishlist");
        }
      })
    }
  }
  return (
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
          {
            showTab===true && 
            <div className='image-overlay'>
            <IoIosClose className='overlay-close' onClick={()=>setShowTab(false)}/>
          {
            props?.item?.size?.length!==0 && props?.item?.size?.map((size,index)=>{
              return(
                <span className={`overlay-item ${activeTab===index?'tab-color1':'tab-color2'}`} key={index} onClick={()=>handleActiveTab(index,size)}>{size}</span>
              )
            })
          }
          {
            props?.item?.productWeight?.length!==0 && props?.item?.productWeight?.map((item,index)=>{
              return(
                <span className={`overlay-item ${activeTab===index?'tab-color1':'tab-color2'}`} key={index} onClick={()=>handleActiveTab(index,item)}>{item}</span>
              )
            })
          }
          {
            props?.item?.productRam?.length!==0 && props?.item?.productRam?.map((item,index)=>{
              return(
                <span className={`overlay-item ${activeTab===index?'tab-color1':'tab-color2'}`} key={index} onClick={()=>handleActiveTab(index,item)}>{item}</span>
              )
            })
          }
            
            {/* <span className='overlay-item'>M</span>
            <span className='overlay-item'>L</span>
            <span className='overlay-item'>XL</span>
            <span className='overlay-item'>XXL</span> */}
          </div>
          }
          <span className='discount'>
            {props?.item?.discount ? `${props.item.discount}% OFF` : ""}
          </span>

          <div className="actions">
            <Tooltip title="Zoom" placement="left-start">
            <Button className='btn-icon' onClick={()=>context.handleOpenProductDetailsModel(true, props?.item)}><MdOutlineZoomOutMap/></Button></Tooltip>
            <Tooltip title="Wishlist" placement="left-start">
            <Button className='btn-icon' onClick={()=>handleAddToMyList(props?.item)}>
              {
                isAddedList===true?<IoIosHeart style={{color:"green"}}/>:<FaRegHeart/>
              }
            </Button></Tooltip>
            <Tooltip title="Compare" placement="left-start">
            <Button className='btn-icon'><FaCodeCompare/></Button></Tooltip>
          </div>
          <div className="infor">
          <h6><Link to={`/product/${props?.item?._id}`} className='link-color'>{props?.item?.name.substr(0,60)+ "..."}</Link></h6>
          {/* <h3 className="two-line-text"><Link to={`/product/${props?.item?._id}`}>{props?.item?.description.substr(0,50)+ "..."}</Link></h3> */}
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
  )
}

export default ProductItem;
