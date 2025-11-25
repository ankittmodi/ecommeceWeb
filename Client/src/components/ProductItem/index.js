import React, { useContext } from 'react'
import './style.css';
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import { FaRegHeart } from "react-icons/fa";
import { FaCodeCompare } from "react-icons/fa6";
import { MdOutlineZoomOutMap } from "react-icons/md";
import Tooltip from '@mui/material/Tooltip';
import { myContext } from '../../App';
const ProductItem = (props) => {
  const context=useContext(myContext);
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
            <Button className='add-to-cart'>Add to cart</Button>
          </div>
          </div>
        </div>
      </div>
    // </div>
  )
}

export default ProductItem;
