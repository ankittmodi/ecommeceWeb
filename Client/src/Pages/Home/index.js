import  React, { useState } from 'react';
import './index.css';
import HomeSlider from '../../components/HomeSlider'
import CatSlider from '../../components/CatSlider'
import { TbTruckDelivery } from "react-icons/tb";
import AdsBanner from '../../components/AdsBanner';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ProductSlider from '../../components/ProductSlider';
import banner from '../../assets/banner.jpg';
import BlogItem from '../../components/BlogItem';
const Home = () => {
  const [value, setValue] =useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className='home'>
      <HomeSlider/>
      <CatSlider/>

      {/* product section */}
      <div className="product">
        <div className="container">
        <div className="product-section">
          <div className="left">
            <h3 className='heading'>Popular Products</h3>
            <p>Do not miss the current offers until the end of August</p>
          </div>
          <div className="right">
            <Box sx={{ 
              width: '100%',
              maxWidth: { xs: 320, sm: 480 }, bgcolor: 'background.paper' }}>
              <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
              >
                <Tab label="Fashion" />
                <Tab label="Electronics" />
                <Tab label="Bags" />
                <Tab label="Footwear" />
                <Tab label="Groceries" />
                <Tab label="Beauty" />
                <Tab label="Welness" />
                <Tab label="Jewellery" />
              </Tabs>
            </Box>
          </div>
        </div>
      </div>
      <ProductSlider items={5}/>
      </div>

      {/* add section */}
      <section className="add">
        <div className="container">
          <div className="freeshipping">
            <div className="col11">
              <TbTruckDelivery className='icon1'/>
              <h3>Free Shipping</h3>
            </div>
            <div className="col2">
              <p>Free Delivery Now On Your First Order and Over Rs. 3000</p>
            </div>
            <span className='price'>- Only Rs. 3000*</span>
          </div>
        </div>
        <AdsBanner/>
      </section>

      {/* latest product section */}
      <div className="latest-product">
        <div className="container">
          <h1>Latest Products</h1>
        </div>
        <ProductSlider items={5}/>
        <AdsBanner item={3} className='latest-banner'/>
      </div>

      {/* Featured product section */}
      <div className="latest-product">
        <div className="container">
          <h1>Featured Products</h1>
        </div>
        <ProductSlider items={6}/>
      </div>

      {/* banner section */}
      <section className="banner">
        <div className="container">
          <img src={banner} alt="" />
        </div>
      </section>

      {/* blog section */}
      <div className="blog-section">
        <div className="container">
          <BlogItem/>
        </div>
      </div>
    </div>
  )
}

export default Home;
