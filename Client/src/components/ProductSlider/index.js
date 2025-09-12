import React from 'react'
import './style.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation,Pagination } from 'swiper/modules';
import ProductItem from '../ProductItem';
const ProductSlider = (props) => {
  return (
    <div className='products'>
      <div className="container">
        <Swiper navigation={true} slidesPerView={props.items}
        spaceBetween={20}
        pagination={{
          clickable: true,
        }} modules={[Navigation,Pagination]} className="mySwiper">
        <SwiperSlide><ProductItem/></SwiperSlide>
        <SwiperSlide><ProductItem/></SwiperSlide>
        <SwiperSlide><ProductItem/></SwiperSlide>
        <SwiperSlide><ProductItem/></SwiperSlide>
        <SwiperSlide><ProductItem/></SwiperSlide>
        <SwiperSlide><ProductItem/></SwiperSlide>
        <SwiperSlide><ProductItem/></SwiperSlide>
        <SwiperSlide><ProductItem/></SwiperSlide>
        <SwiperSlide><ProductItem/></SwiperSlide>
      </Swiper>
      
      </div>
    </div>
  )
}

export default ProductSlider
