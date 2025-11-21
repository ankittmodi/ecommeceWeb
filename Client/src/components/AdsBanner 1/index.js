import React from 'react'
import './index.css';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import img1 from '../../assets/addimg1.jpg';
import img2 from '../../assets/addimg2.png';
import img3 from '../../assets/addimg3.jpg';
import img4 from '../../assets/addimg4.jpg';
const AdsBanner1 = () => {
  return (
    <div className='container'>
      <div className="adsection">
        <div className="adsimg">
          <Link to='/'>
          <div className="image-container">
            <img src={img1} alt="" /> 
          </div>
          </Link>
        </div>
        <div className="adsimg">
          <Link to='/'>
          <div className="image-container">
            <img src={img2} alt="" /> 
          </div>
          </Link>
          
        </div>
        <div className="adsimg">
          <Link to='/'>
          <img src={img3} alt="" /> 
          </Link>
        </div>
        <div className="adsimg">
          <Link to='/'>
          <img src={img4} alt="" /> 
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AdsBanner1
