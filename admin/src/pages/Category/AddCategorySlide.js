import React from 'react'
import './style.css'
import UploadBox from '../../Component/UploadBox';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { IoMdClose } from "react-icons/io";
import {Button} from '@mui/material';
const AddCategorySlide = () => {
  return (
    <section className='add-product'>
        <form className='form'>
            <div className='scroll-form'>
                <div className='products'>
                    <div className='col'>
                        <h3>Category Name</h3>
                        <input type='text' className='search cat-name'/>
                    </div>
                </div>

                <div className='upload col'>
                    <h3>Category Images</h3>
                    <div className='upload-file'>
                        <div className='upload-file-wrapper'>
                            <span className='close-icon'><IoMdClose/></span>
                            <div className='file'>
                                <LazyLoadImage
                                effect="blur"
                                wrapperProps={{
                                    // If you need to, you can tweak the effect transition using the wrapper style.
                                    style: {transitionDelay: "1s"},
                                }}
                                alt="image"
                                src="https://thenmozhidesigns.com/cdn/shop/files/V_RK6114copy.jpg?v=1695886293&width=908" // use normal <img> attributes as props
                                />
                            </div>
                        </div>
                        <UploadBox multiple={true}/>
                    </div>
                </div>
            </div>
            <br/>
            <Button type="button" className='header-btn'>Publish and View</Button>
        </form>

    </section>
  )
}

export default AddCategorySlide
