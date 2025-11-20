import React,{useContext, useState} from 'react'
import './style.css'
import UploadBox from '../../Component/UploadBox';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { IoMdClose } from "react-icons/io";
import {Button} from '@mui/material';
import { MyContext } from '../../App';
import { deleteImage, postData } from '../../utils/Api';
import CircularProgress from '@mui/material/CircularProgress';
import { MdOutlineCloudUpload } from "react-icons/md";
const AddHomeSlide = () => {
    const[formFeilds,setFormfeilds]=useState({
        name:"",
        images:[],
    });
    const[previews,setPreviews]=useState([]);
    const[isLoading,setIsLoading]=useState(false);
    const context=useContext(MyContext);


    const setPreviewsFun=(previewsArr)=>{
            // console.log(previewsArr);
            setPreviews(previewsArr);
            // for setting removing image 
            formFeilds.images=previewsArr
        }
        const removeHomeSlideImage=(image,index)=>{
            var imagesArr=[];
            imagesArr=previews;
            deleteImage(`/api/homeSlide/deleteImage?img=${image}`).then((res)=>{
                // console.log(res);
                imagesArr.splice(index,1);
                setPreviews([]);
                setTimeout(()=>{
                    setPreviews(imagesArr);
                    formFeilds.images=imagesArr
                },1000);
            })
        }
    const handleSubmit=(e)=>{
            e.preventDefault();
            setIsLoading(true);
            if (previews.length===0) {
                context.openAlertBox("error", "Please select category images");
                setIsLoading(false);
                return false;
            }
    
            postData("/api/homeSlide/add",formFeilds).then((res)=>{
                console.log(res);
                // setIsLoading(false);
                setTimeout(()=>{
                    setIsLoading(false);
                    context.setIsOpenFullScreen({
                    open:false
                })
                },2000)
            })
        }
  return (
    <section className='add-product'>
        <form className='form' onSubmit={handleSubmit}>
                <div className='products product-grid'>
                <div className='home-upload'>
                    <h3>Media & Images</h3>
                    <div className='upload-file'>
                        {
                            previews.length!==0 && previews.map((image,index)=>{
                                return (
                                    <div className='upload-file-wrapper'>
                                        <span className='close-icon' onClick={()=>removeHomeSlideImage(image,index)}><IoMdClose/></span>
                                        <div className='file' key={index}>
                                            <img 
                                            src={image} // use normal <img> attributes as props
                                            />
                                        </div>
                                    </div>
                                )
                            })
                        }
                        <UploadBox multiple={true} name="images" url="/api/homeSlide/uploadImages" setPreviewsFun={setPreviewsFun}/>
                    </div>
                </div>
            </div>
            <br/>
            <Button type="submit" className='header-btn'><MdOutlineCloudUpload className='upload-icon' />
            {isLoading ? <CircularProgress color="inherit" size={20} /> : "Publish & View"}</Button>
        </form>

    </section>
  )
}

export default AddHomeSlide
