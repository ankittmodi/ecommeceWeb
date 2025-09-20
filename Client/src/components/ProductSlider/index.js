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
        spaceBetween={25}
        pagination={{
          clickable: true,
        }} modules={[Navigation,Pagination]} className="mySwiper"
        // ✅ Responsive breakpoints
          breakpoints={{
            320: {        // Mobile
              slidesPerView: 1,
              spaceBetween: 10,
            },
            640: {        // Small tablets
              slidesPerView: 2,
              spaceBetween: 15,
            },
            768: {        // Tablets
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1024: {       // Laptops
              slidesPerView: 4,
              spaceBetween: 20,
            },
            1280: {       // Large desktops
              slidesPerView: 5,
              spaceBetween: 25,
            },
          }}
        >
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
