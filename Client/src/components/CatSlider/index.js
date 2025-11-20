import React, { useContext } from 'react'
import './index.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { myContext } from '../../App';

const CatSlider = () => {
  const context = useContext(myContext);

  return (
    <>
      {context.catData?.length > 0 && (
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
              breakpoints={{
                320: { slidesPerView: 1, spaceBetween: 10 },
                350: { slidesPerView: 2, spaceBetween: 10 },
                375: { slidesPerView: 3, spaceBetween: 10 },
                640: { slidesPerView: 4, spaceBetween: 15 },
                768: { slidesPerView: 5, spaceBetween: 20 },
                992: { slidesPerView: 8, spaceBetween: 20 },
                1024: { slidesPerView: 8, spaceBetween: 20 },
                1280: { slidesPerView: 10, spaceBetween: 25 },
              }}
            >
              {context.catData?.map((cat, index) => (
                <SwiperSlide key={index}>
                  <div className="item">
                    <img src={cat?.images?.[0]} alt="" />
                    <h3>{cat?.name}</h3>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </>
  );
};

export default CatSlider;
