import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import blog1 from '../../assets/blogimg1.jpg';
import { FaRegClock } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
const BlogItem = () => {
  return (
    <div className='blog-item group'>
    <h1>From the Blog</h1>
      <div className="blog-group">
        <div className="imageWrapper">
          <div className="img-container">
            <Link to=''><img src={blog1} alt="" /></Link>
          </div>
          <div className="infor">
          <div className="date">
            <FaRegClock/>
            <span>12 august, 2025</span>
          </div>
          <h3><Link to=''>Sustainable living through cutting-edge prefabricated homes</Link></h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde consequatur est ratione veniam ....</p>
          <Link to="/">
          Read more
          <FaChevronRight/>
          </Link>
        </div>
        </div>
        <div className="imageWrapper">
          <div className="img-container">
            <Link to=''><img src={blog1} alt="" /></Link>
          </div>
          <div className="infor">
          <div className="date">
            <FaRegClock/>
            <span>12 august, 2025</span>
          </div>
          <h3><Link to=''>Sustainable living through cutting-edge prefabricated homes</Link></h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde consequatur est ratione veniam ....</p>
          <Link to="/">
          Read more
          <FaChevronRight/>
          </Link>
        </div>
        </div>
        <div className="imageWrapper">
          <div className="img-container">
            <Link to=''><img src={blog1} alt="" /></Link>
          </div>
          <div className="infor">
          <div className="date">
            <FaRegClock/>
            <span>12 august, 2025</span>
          </div>
          <h3><Link to=''>Sustainable living through cutting-edge prefabricated homes</Link></h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde consequatur est ratione veniam ....</p>
          <Link to="/">
          Read more
          <FaChevronRight/>
          </Link>
        </div>
        </div>
      </div>
    </div>
  )
}

export default BlogItem
