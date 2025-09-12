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
const ProductItem = () => {
  const context=useContext(myContext);
  return (
    // <div className='container'>
      <div className="image-wrap group">
        <div className="prod-detail ">
          <Link to='/product/_id'>
          <div className="img-part">
            <img src="https://serviceapi.spicezgold.com/download/1742462383491_siril-georgette-brown-color-saree-with-blouse-piece-product-images-rvegeptjtj-2-202308161432.webp" alt="" />
            <img src="https://serviceapi.spicezgold.com/download/1742462383493_siril-georgette-brown-color-saree-with-blouse-piece-product-images-rvegeptjtj-1-202308161431.jpg" alt="" className='top-img' />
          </div>
          </Link>
          <span className='discount'>15%</span>

          <div className="actions">
            <Tooltip title="Zoom" placement="left-start">
            <Button className='btn-icon' onClick={()=>context.setOpenProductDetailsModel(true)}><MdOutlineZoomOutMap/></Button></Tooltip>
            <Tooltip title="Wishlist" placement="left-start">
            <Button className='btn-icon'><FaRegHeart/></Button></Tooltip>
            <Tooltip title="Compare" placement="left-start">
            <Button className='btn-icon'><FaCodeCompare/></Button></Tooltip>
            <Tooltip title="Zoom" placement="left-start">
            <Button className='btn-icon'><FaRegHeart/></Button></Tooltip>
          </div>
          <div className="infor">
          <h6><Link to='/product/_id' className='link-color'>Koskii</Link></h6>
          <h3><Link to='/product/_id'>Floral Beads and Stones Pure Chiffon Saree</Link></h3>
            <Rating name="half-rating-read" defaultValue={4.5} precision={0.5} readOnly />
          <div className="price">
            <span className="old-price">Rs. 999</span>
            <span className="new-price"><strong>Rs. 599</strong></span>
          </div>
          </div>
        </div>
      </div>
    // </div>
  )
}

export default ProductItem;
