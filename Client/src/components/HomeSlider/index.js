import React, { useEffect, useState } from 'react'
import './index.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { fetchDataFromApi } from '../../utils/Api.js'
const HomeSlider = () => {
  const[banner,setBanner]=useState();
  useEffect(()=>{
    fetchDataFromApi('/api/homeSlide').then((res)=>{
      console.log(res);
      setBanner(res?.data);
    })
  },[])
  return (
    <>
    {banner?.length>0 && 
    <div className="homeslider">
        <Swiper 
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper">
        {
          banner?.map((slide,index)=>{
            return(
              <SwiperSlide key={index}><img src={slide.images[0]} alt="" /></SwiperSlide>
            )
          })
        }
          {/* <SwiperSlide><img src={img3} alt="" /></SwiperSlide>
          <SwiperSlide><img src={img4} alt="" /></SwiperSlide>
          <SwiperSlide><img src={img5} alt="" /></SwiperSlide>
          <SwiperSlide><img src={img6} alt="" /></SwiperSlide>
          <SwiperSlide><img src={img1} alt="" /></SwiperSlide> */}
        </Swiper>
      </div>}
      
    </>
  )
}

export default HomeSlider;
