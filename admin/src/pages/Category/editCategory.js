import React, { useContext, useEffect, useState } from 'react'
import './style.css'
import UploadBox from '../../Component/UploadBox';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { IoMdClose } from "react-icons/io";
import {Button} from '@mui/material';
import {deleteImage,  editData,  fetchDataFromApi, postData } from '../../utils/Api';
import { MyContext } from '../../App';
import CircularProgress from '@mui/material/CircularProgress';
const EditCategory = () => {
    const[formFeilds,setFormfeilds]=useState({
        name:"",
        images:[],
    });
    const[previews,setPreviews]=useState([]);
    const[isLoading,setIsLoading]=useState(false);
    const context=useContext(MyContext);

    useEffect(()=>{
        const id=context.isOpenFullScreen.id;
        fetchDataFromApi(`/api/category/${id}`,formFeilds).then((res)=>{
            // console.log(res.category);
            formFeilds.name=res.category.name;
            setPreviews(res.category.images)
        })
    },[context.isOpenFullScreen.id])
    const onChangeInput=(e)=>{
        const{name,value}=e.target;
        setFormfeilds(()=>{
            return{
                ...formFeilds,
                [name]:value
            }
        })
        formFeilds.images=previews
    }
    const setPreviewsFun=(previewsArr)=>{
        // console.log(previewsArr);
        setPreviews(previewsArr);
        // for setting removing image 
        formFeilds.images=previewsArr
    }
    const removeCategoryImage=(image,index)=>{
        var imagesArr=[];
        imagesArr=previews;
        deleteImage(`/api/category/deleteImage?img=${image}`).then((res)=>{
            // console.log(res);
            imagesArr.splice(index,1);
            setPreviews([]);
            setTimeout(()=>{
                setPreviews(imagesArr);
                setFormfeilds(prev => ({...prev, images: imagesArr}))
            },1000);
        })
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        setIsLoading(true);
        if (formFeilds.name==="") {
            context.openAlertBox("error", "Please enter category name");
            setIsLoading(false);
            return false;
        }
        if (previews.length===0) {
            context.openAlertBox("error", "Please select category images");
            setIsLoading(false);
            return false;
        }

        editData(`/api/category/${context.isOpenFullScreen.id}`,formFeilds).then((res)=>{
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
            <div className='scroll-form'>
                <div className='products'>
                    <div className='col'>
                        <h3>Category Name</h3>
                        <input type='text' name='name' className='search cat-name'
                        value={formFeilds.name} 
                        onChange={onChangeInput}
                        disabled={isLoading===true?true:false}
                        />
                    </div>
                </div>

                <div className='upload col'>
                    <h3>Category Images</h3>
                    <div className='upload-file'>
                        {
                            previews.length!==0 && previews.map((image,index)=>{
                                return (
                                    <div className='upload-file-wrapper'>
                                        <span className='close-icon' onClick={()=>removeCategoryImage(image,index)}><IoMdClose/></span>
                                        <div className='file' key={index}>
                                            <img 
                                            src={image} // use normal <img> attributes as props
                                            />
                                        </div>
                                    </div>
                                )
                            })
                        }
                        <UploadBox multiple={true} name="images" url="/api/category/uploadImages" setPreviewsFun={setPreviewsFun}/>
                    </div>
                </div>
            </div>
            <br/>
            <Button type="submit" className='header-btn '>{isLoading ? <CircularProgress color="inherit" size={20} /> : 'Publish and View'}</Button>
        </form>

    </section>
  )
}

export default EditCategory
