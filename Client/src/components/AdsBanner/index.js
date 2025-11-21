import React from 'react'
import './index.css';

import BannerBox from '../BannerBox';
const AdsBanner = (props) => {
  return (
    <div className='container'>
      <div className="adsection">
      {props?.data?.map((item,index)=>{
        return(
          <BannerBox
          align={item?.align}
          bannerTitle={item?.bannerTitle}
          price={item?.price}
          image={item?.images[0]}
        />

        )
      })}
        {/* <div className="adsimg">
          <Link to='/'>
          <div className="image-container">
            <img src={img1} alt="" /> 
            <div className='text'>
            <p>Buy women products
            <br /> with low price</p>
            <p>Rs. 999</p>
            <Button>Shop Now</Button>
            </div>
          </div>
          </Link>
        </div> */}

      </div>
    </div>
  )
}

export default AdsBanner
