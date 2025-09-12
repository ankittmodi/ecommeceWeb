import React from 'react'
import './index.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import img1 from '../../assets/slickimg1.jpg';
import img3 from '../../assets/slickimg3.jpg';
import img4 from '../../assets/slickimg4.jpg';
import img5 from '../../assets/slickimg5.jpg';
import img6 from '../../assets/slickimg6.jpg';
const HomeSlider = () => {
  return (
    <>
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
          <SwiperSlide><img src={img3} alt="" /></SwiperSlide>
          <SwiperSlide><img src={img4} alt="" /></SwiperSlide>
          <SwiperSlide><img src={img5} alt="" /></SwiperSlide>
          <SwiperSlide><img src={img6} alt="" /></SwiperSlide>
          <SwiperSlide><img src={img1} alt="" /></SwiperSlide>
        </Swiper>
      </div>
    </>
  )
}

export default HomeSlider;
