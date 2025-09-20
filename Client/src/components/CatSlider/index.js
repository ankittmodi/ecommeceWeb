import React from 'react'
import './index.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
const CatSlider = () => {
  return (
    <div className='catSlider'>
      <div className="container">
        <Swiper 
        slidesPerView={7}
        spaceBetween={30}
        centeredSlides={false}
        autoplay={{
        delay: 2500,
        disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
        // ✅ Responsive breakpoints
          breakpoints={{
            320: {        // Mobile
              slidesPerView: 1,
              spaceBetween: 10,
            },
            350: {        // Mobile
              slidesPerView: 2,
              spaceBetween: 10,
            },
            375: {        // Mobile
              slidesPerView: 3,
              spaceBetween: 10,
            },
            640: {        // Small tablets
              slidesPerView: 4,
              spaceBetween: 15,
            },
            768: {        // Tablets
              slidesPerView: 5,
              spaceBetween: 20,
            },
            992: {        // Tablets
              slidesPerView: 6,
              spaceBetween: 20,
            },
            1024: {       // Laptops
              slidesPerView: 6,
              spaceBetween: 20,
            },
            1280: {       // Large desktops
              slidesPerView: 7,
              spaceBetween: 25,
            },
          }}
        >
          <SwiperSlide><div className="item">
            <img src="https://serviceapi.spicezgold.com/download/1750853024086_1000006454.png" alt="" />
            <h3>Fashion</h3>
          </div></SwiperSlide>
          <SwiperSlide>
          <div className="item">
            <img src="https://serviceapi.spicezgold.com/download/1741660988059_ele.png" alt="" />
            <h3>Electronics</h3>
          </div>
          </SwiperSlide>
          <SwiperSlide>
          <div className="item">
            <img src="https://serviceapi.spicezgold.com/download/1741661045887_bag.png" alt="" />
            <h3>Bags</h3>
          </div>
          </SwiperSlide>
          <SwiperSlide>
          <div className="item">
            <img src="https://serviceapi.spicezgold.com/download/1741661061379_foot.png" alt="" />
            <h3>Footwear</h3>
          </div>
          </SwiperSlide>
          <SwiperSlide>
          <div className="item">
            <img src="https://serviceapi.spicezgold.com/download/1741661077633_gro.png" alt="" />
            <h3>Groceries</h3>
          </div>
          </SwiperSlide>
          <SwiperSlide>
          <div className="item">
            <img src="https://serviceapi.spicezgold.com/download/1741661092792_beauty.png" alt="" />
            <h3>Beauty</h3>
          </div>
          </SwiperSlide>
          <SwiperSlide>
          <div className="item">
            <img src="https://serviceapi.spicezgold.com/download/1741661105893_well.png" alt="" />
            <h3>Welness</h3>
          </div>
          </SwiperSlide>
          <SwiperSlide>
          <div className="item">
            <img src="https://serviceapi.spicezgold.com/download/1749273446706_jw.png" alt="" />
            <h3>Jewellery</h3>
          </div>
          </SwiperSlide>
          <SwiperSlide>
          <div className="item">
            <img src="https://serviceapi.spicezgold.com/download/1741661061379_foot.png" alt="" />
            <h3>Footwear</h3>
          </div>
          </SwiperSlide>
          <SwiperSlide>
          <div className="item">
            <img src="https://serviceapi.spicezgold.com/download/1741661077633_gro.png" alt="" />
            <h3>Groceries</h3>
          </div>
          </SwiperSlide>
          <SwiperSlide>
          <div className="item">
            <img src="https://serviceapi.spicezgold.com/download/1741661092792_beauty.png" alt="" />
            <h3>Groceries</h3>
          </div>
          </SwiperSlide>
          <SwiperSlide>
          <div className="item">
            <img src="https://serviceapi.spicezgold.com/download/1741661105893_well.png" alt="" />
            <h3>Groceries</h3>
          </div>
          </SwiperSlide>
          <SwiperSlide>
          <div className="item">
            <img src="https://serviceapi.spicezgold.com/download/1749273446706_jw.png" alt="" />
            <h3>Groceries</h3>
          </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  )
}

export default CatSlider
