import React, { useEffect, useRef, useState } from 'react'
import './productDetails.css';
import InnerImageZoom from 'react-inner-image-zoom'
import 'react-inner-image-zoom/lib/styles.min.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useParams } from 'react-router-dom';
import { fetchDataFromApi } from '../../utils/Api';
import { MdOutlineBrandingWatermark } from "react-icons/md";
import { CiCalendarDate } from "react-icons/ci";
import { MdOutlineReviews } from "react-icons/md";
import { LiaWeightSolid } from "react-icons/lia";
import { MdOutlineSettings } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
const ProductDetails = () => {
    const[slideIndex,setSlideIndex]=useState(0);
    const[product,setProduct]=useState();
    const zoomSliderBig=useRef();
    const zoomSliderSmall=useRef();

    const {id}=useParams();
    const goTo=(index)=>{
        setSlideIndex(index);
        zoomSliderSmall.current.swiper.slideTo(index);
        zoomSliderBig.current.swiper.slideTo(index);
    }
    useEffect(() => {
    fetchDataFromApi(`/api/product/${id}`).then(res => {
        setProduct(res.product);

        // fetch names for RAM IDs
        fetchDataFromApi(`/api/product/productRams/get`).then(ramList => {
            const ramNames = res.product.productRam.map(id =>
                ramList.data.find(r => r._id === id)?.name
            );
            setProduct(prev => ({ ...prev, ramNames }));
        });
        fetchDataFromApi(`/api/product/productSize/get`).then(sizeList => {
            const sizeNames = res.product.size.map(id =>
                sizeList.data.find(r => r._id === id)?.name
            );
            setProduct(prev => ({ ...prev, sizeNames }));
        });
        fetchDataFromApi(`/api/product/productWeight/get`).then(weightList => {
            const weightNames = res.product.productWeight.map(id =>
                weightList.data.find(r => r._id === id)?.name
            );
            setProduct(prev => ({ ...prev, weightNames }));
        });
    });
}, []);

  return (
    <>
        <div className='product-table'>
            <h2>Product Details</h2>
        </div>
        <div className='product-details'>
            {
                product?.images?.length!==0 && 
                <div className='product-part1'>
                <div className='pro-slider'>
                    <div className='slider-min'>
                        <Swiper 
                            ref={zoomSliderSmall}
                            direction='vertical'
                            slidesPerView={5}
                            spaceBetween={10}
                            navigation={true} 
                            
                            modules={[Navigation]}
                            className="mySwiper zoomproduct">
                                {
                                    product?.images?.map((img,index)=>{
                                        return(<>
                                            <SwiperSlide key={index}>
                                                <div className={`product-slider ${slideIndex===index?'slide-opacity':'slide-opacity1'}`} onClick={()=>goTo(index)}>
                                                    <img src={img} className='slider-img'/>
                                                </div>
                                            </SwiperSlide>
                                        </>)
                                    })
                                }
                                {/* <SwiperSlide>
                                    <div className={`product-slider ${slideIndex===0?'slide-opacity':'slide-opacity1'}`} onClick={()=>goTo(0)}>
                                        <img src="https://www.jiomart.com/images/product/original/rvicn4zhdf/geum-men-black-solid-cotton-blend-spread-collar-shirt-pack-of-1-product-images-rvicn4zhdf-0-202205271252.jpg?im=Resize=(600,750)" className='slider-img'/>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className={`product-slider ${slideIndex===1?'slide-opacity':'slide-opacity1'}`} onClick={()=>goTo(1)}>
                                        <img src="https://www.jiomart.com/images/product/original/rvicn4zhdf/geum-men-black-solid-cotton-blend-spread-collar-shirt-pack-of-1-product-images-rvicn4zhdf-0-202205271252.jpg?im=Resize=(600,750)" className='slider-img'/>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className={`product-slider ${slideIndex===2?'slide-opacity':'slide-opacity1'}`} onClick={()=>goTo(2)}>
                                        <img src="https://www.jiomart.com/images/product/original/rvicn4zhdf/geum-men-black-solid-cotton-blend-spread-collar-shirt-pack-of-1-product-images-rvicn4zhdf-0-202205271252.jpg?im=Resize=(600,750)" className='slider-img'/>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className={`product-slider ${slideIndex===3?'slide-opacity':'slide-opacity1'}`} onClick={()=>goTo(3)}>
                                        <img src="https://www.jiomart.com/images/product/original/rvicn4zhdf/geum-men-black-solid-cotton-blend-spread-collar-shirt-pack-of-1-product-images-rvicn4zhdf-0-202205271252.jpg?im=Resize=(600,750)" className='slider-img'/>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className={`product-slider ${slideIndex===4?'slide-opacity':'slide-opacity1'}`} onClick={()=>goTo(4)}>
                                        <img src="https://www.jiomart.com/images/product/original/rvicn4zhdf/geum-men-black-solid-cotton-blend-spread-collar-shirt-pack-of-1-product-images-rvicn4zhdf-0-202205271252.jpg?im=Resize=(600,750)" className='slider-img'/>
                                    </div>
                                </SwiperSlide> */}
                        </Swiper>
                    </div>
                </div>
                <div className='main-slider'>
                    <div className='zoom-container'>
                        <Swiper 
                            ref={zoomSliderBig}
                            direction='vertical'
                            slidesPerView={1}
                            spaceBetween={0}
                            navigation={false} 
                            modules={[Navigation]} 
                            className="mySwiper">
                                {
                                    product?.images?.map((img,index)=>{
                                        return(<>
                                            <SwiperSlide key={index}>
                                                <div className={`product-slider1 `}>
                                                    <img src={img} className='slider-img'/>
                                                </div>
                                            </SwiperSlide>
                                        </>)
                                    })
                                }
                        </Swiper>
                    </div>
                </div>
            </div>
            }
            <div className='product-part2'>
                <h1 className='product-header'>{product?.name}</h1>
                <p className='product-para'>{product?.description}</p>
                <div className='brand'>
                    <span className='product-brand'><MdOutlineBrandingWatermark className='product-icon'/>Brand : </span>
                    <span>{product?.brand}</span>
                </div>
                <div className='brand'>
                    <span className='product-brand'><BiCategory className='product-icon'/>Category : </span>
                    <span>{product?.catName}</span>
                </div>
                {
                    product?.productRam?.length!==0 && 
                    <div className='brand'>
                        <span className='product-brand'><MdOutlineSettings className='product-icon'/>RAM : </span>
                        <div className='box'>
                            {
                                product?.ramNames?.map(name => <span>{name}</span>)
                            }
                        </div>
                    </div>
                }
                {
                    product?.size?.length!==0 &&
                    <div className='brand'>
                        <span className='product-brand'><MdOutlineSettings className='product-icon'/>SIZE : </span>
                        <div className='box'>
                            {
                                product?.size?.map((size,index)=>{
                                return(
                                    product?.sizeNames?.map(name => <span>{name}</span>)
                                )
                            })
                            }
                        </div>
                    </div>
                }
                {
                    product?.productWeight?.length!==0 &&
                    <div className='brand'>
                        <span className='product-brand'><LiaWeightSolid className='product-icon'/>Weight : </span>
                        <div className='box'>
                            {
                                product?.productWeight?.map((weight,index)=>{
                                return(
                                    product?.weightNames?.map(name => <span>{name}</span>)
                                )
                            })
                            }
                        </div>
                    </div>
                }
                <div className='brand'>
                    <span className='product-brand'><MdOutlineReviews className='product-icon'/>Review : </span>
                    <span>({product?.reviews?.length>0 ?product?.reviews?.length:0}) Reviews</span>
                </div>
                <div className='brand'>
                    <span className='product-brand'><MdOutlineBrandingWatermark className='product-icon'/>Published : </span>
                    <span>{product?.brand}</span>
                </div>
                <div className='brand'>
                    <span className='product-brand'><CiCalendarDate className='product-icon'/>Published : </span>
                    <span>{product?.createdAt.split("T")[0]}</span>
                </div>
            </div>
        </div>
        {/* <p>{product?.description}</p> */}
        <div className="review-section">
                  <div className="container">
                    <div className="tabContent">
                      <div className="row">
                        <div className="col-md-8">
                          <h3>Customer Reviews</h3>
                          <br />
                          <div className="reviewpart-section">
                            <div className="card p3 reviewCard flex-row">
                              <div className="image">
                                <div className="rounded-circle ">
                                  <img src="https://up.yimg.com/ib/th?id=OIP.AlIScK6urTegkZ178dAAGgHaHa&pid=Api&rs=1&c=1&qlt=95&w=113&h=113" alt="" />
                                </div>
                                <div className="info">
                                  <div className="reviews d-flex ">
                                  <div className='review-desc'>
                                    <span className="text-g d-block text-center">Ankit</span>
                                    <h5>2025-01-08</h5>
                                  </div>
                                  <Rating name="half-rating-read" defaultValue={4.5} precision={0.5} readOnly />
                                </div>
                                <p style={{color:"black"}}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum voluptatem, possimus dolores quidem qui ad distinctio mollitia sint eius voluptas.</p>
                              </div>
                              </div>
                            </div>
                            <div className="card p3 reviewCard flex-row">
                              <div className="image">
                                <div className="rounded-circle ">
                                  <img src="https://up.yimg.com/ib/th?id=OIP.AlIScK6urTegkZ178dAAGgHaHa&pid=Api&rs=1&c=1&qlt=95&w=113&h=113" alt="" />
                                </div>
                                <div className="info">
                                  <div className="reviews d-flex ">
                                  <div className='review-desc'>
                                    <span className="text-g d-block text-center">Ankit</span>
                                    <h5>2025-01-08</h5>
                                  </div>
                                  <Rating name="half-rating-read" defaultValue={4.5} precision={0.5} readOnly />
                                </div>
                                <p style={{color:"black"}}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum voluptatem, possimus dolores quidem qui ad distinctio mollitia sint eius voluptas.</p>
                              </div>
                              </div>
                            </div>
                            <div className="card p3 reviewCard flex-row">
                              <div className="image">
                                <div className="rounded-circle ">
                                  <img src="https://up.yimg.com/ib/th?id=OIP.AlIScK6urTegkZ178dAAGgHaHa&pid=Api&rs=1&c=1&qlt=95&w=113&h=113" alt="" />
                                </div>
                                <div className="info">
                                  <div className="reviews d-flex ">
                                  <div className='review-desc'>
                                    <span className="text-g d-block text-center">Ankit</span>
                                    <h5>2025-01-08</h5>
                                  </div>
                                  <Rating name="half-rating-read" defaultValue={4.5} precision={0.5} readOnly />
                                </div>
                                <p style={{color:"black"}}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum voluptatem, possimus dolores quidem qui ad distinctio mollitia sint eius voluptas.</p>
                              </div>
                              </div>
                            </div>
                            <div className="card p3 reviewCard flex-row">
                              <div className="image">
                                <div className="rounded-circle ">
                                  <img src="https://up.yimg.com/ib/th?id=OIP.AlIScK6urTegkZ178dAAGgHaHa&pid=Api&rs=1&c=1&qlt=95&w=113&h=113" alt="" />
                                </div>
                                <div className="info">
                                  <div className="reviews d-flex ">
                                  <div className='review-desc'>
                                    <span className="text-g d-block text-center">Ankit</span>
                                    <h5>2025-01-08</h5>
                                  </div>
                                  <Rating name="half-rating-read" defaultValue={4.5} precision={0.5} readOnly className='rating'
                                  />
                                </div>
                                <p style={{color:"black"}}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum voluptatem, possimus dolores quidem qui ad distinctio mollitia sint eius voluptas.</p>
                              </div>
                              </div>
                            </div>
                          </div>
                            <br />
                          <form action="" className='reviewForm'>
                          <h4>Add Review</h4>
                          <div className="form-group">
                            <TextField
                            id="outlined-textarea"
                            label="Write a review"
                            placeholder="Placeholder"
                            multiline
                            rows={5}
                            className='review-input'
                          />
                          <br /><br />
                          <Rating name="half-rating-read" defaultValue={4.5} precision={0.5}  />
                          </div>
        
                          <Button className='add-btn'>Submit Review</Button>
                          </form>
                        </div>
                      </div>
        
                    </div>
                  </div>
                </div>
    </>
  )
}

export default ProductDetails
