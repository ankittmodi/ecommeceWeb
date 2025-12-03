import React from 'react'
import './style.css';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
const BannerBox = ({ align, bannerTitle, price, image }) => {
  return (
    <div className="adsimg">
      <Link to="/">
        <div className="image-container">
          <img src={image} alt="" />
          
          <div className={`text ${align}`}>   {/* align apply */}
            <p style={{color:"#ff5252"}}>{bannerTitle}</p>
            <p >{price}</p>
            <Button>Shop Now</Button>
          </div>

        </div>
      </Link>
    </div>
  );
};
export default BannerBox;
