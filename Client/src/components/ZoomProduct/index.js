
import React, { useRef, useState } from 'react';
import './style.css';
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/styles.min.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Navigation } from 'swiper/modules';

const images = [
  "https://serviceapi.spicezgold.com/download/1742462383488_siril-georgette-brown-color-saree-with-blouse-piece-product-images-rvegeptjtj-3-202308161432.webp",
  "https://serviceapi.spicezgold.com/download/1742462383491_siril-georgette-brown-color-saree-with-blouse-piece-product-images-rvegeptjtj-2-202308161432.webp",
  "https://serviceapi.spicezgold.com/download/1742462383493_siril-georgette-brown-color-saree-with-blouse-piece-product-images-rvegeptjtj-1-202308161431.jpg",
  "https://serviceapi.spicezgold.com/download/1742462383495_siril-georgette-brown-color-saree-with-blouse-piece-product-images-rvegeptjtj-0-202308161431.webp",
  "https://serviceapi.spicezgold.com/download/1742462383488_siril-georgette-brown-color-saree-with-blouse-piece-product-images-rvegeptjtj-3-202308161432.webp",
  "https://serviceapi.spicezgold.com/download/1742462383495_siril-georgette-brown-color-saree-with-blouse-piece-product-images-rvegeptjtj-0-202308161431.webp",
  "https://serviceapi.spicezgold.com/download/1742462383495_siril-georgette-brown-color-saree-with-blouse-piece-product-images-rvegeptjtj-0-202308161431.webp",
  "https://serviceapi.spicezgold.com/download/1742462383495_siril-georgette-brown-color-saree-with-blouse-piece-product-images-rvegeptjtj-0-202308161431.webp"
];

const ZoomProduct = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const zoomSliderBig = useRef();
  const zoomSliderSmall = useRef();

  // Called when a thumbnail is clicked
  const goto = (index) => {
    setSlideIndex(index);
    zoomSliderBig.current.swiper.slideTo(index);
  };

  return (
    <div className="zoom-product">
      {/* Small Thumbnail Slider */}
      <div className="zoom-slider">
        <Swiper
          ref={zoomSliderSmall}
          direction="vertical"
          slidesPerView={4}
          spaceBetween={5}
          navigation={true}
          modules={[Navigation, Pagination]}
          className="zoom-slider-wrapper"
          onSlideChange={(swiper) => {
            const index = swiper.activeIndex;
            setSlideIndex(index);
            zoomSliderBig.current.swiper.slideTo(index);
          }}
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <div className={`item ${slideIndex===index?'active':'notActive'}`} onClick={() => goto(index)}>
                <img src={img} alt={`thumb-${index}`} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Big Zoom Image Slider */}
      <div className="product-zoom">
        <Swiper
          ref={zoomSliderBig}
          slidesPerView={1}
          spaceBetween={5}
          navigation={false}
          modules={[Navigation]}
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <InnerImageZoom src={img} zoomSrc={img} />
              {/* <img src={img} alt="" /> */}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ZoomProduct;
