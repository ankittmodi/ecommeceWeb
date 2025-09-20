import React from 'react'
import './boxes.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination,Navigation} from 'swiper/modules';
import { IoGiftOutline } from "react-icons/io5";
import { RiBarChartGroupedLine } from "react-icons/ri";
import { HiOutlineChartPie } from "react-icons/hi";
import { BsBank } from "react-icons/bs";
import { TbBrandProducthunt } from "react-icons/tb";
const Boxes = () => {
  return (
    <div className='boxes'>
      <Swiper
        slidesPerView={4}
        spaceBetween={10}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="box" style={{color:"#3872fa"}}>
            <IoGiftOutline className='box-icon'/>
            <div className="info">
              <p>Total Images</p>
              <p><strong>1,390</strong></p>
            </div>
            <RiBarChartGroupedLine className='box-icon1'/>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="box">
            <HiOutlineChartPie  className='box-icon' style={{color:"#10b981"}}/>
            <div className="info">
              <p>Sales</p>
              <p><strong>Rs. 57,890.00</strong></p>
            </div>
            <RiBarChartGroupedLine className='box-icon1 ' style={{color:"#10b981"}}/>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="box">
            <BsBank className='box-icon' style={{color:"#7928ca"}}/>
            <div className="info">
              <p>Revenue</p>
              <p><strong>Rs. 93,797.00</strong></p>
            </div>
            <RiBarChartGroupedLine className='box-icon1'style={{color:"#7928ca"}}/>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="box">
            <TbBrandProducthunt className='box-icon' style={{color:"#ca28c2ff"}}/>
            <div className="info">
              <p>Total Products</p>
              <p><strong>1,390</strong></p>
            </div>
            <RiBarChartGroupedLine className='box-icon1' style={{color:"#ca28c2ff"}}/>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default Boxes
