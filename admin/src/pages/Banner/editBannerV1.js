import React, { useContext, useEffect, useState } from 'react'
import './style.css';
import UploadBox from '../../Component/UploadBox';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { IoMdClose } from "react-icons/io";
import {Button} from '@mui/material';
import {deleteImage, editData, fetchDataFromApi, postData } from '../../utils/Api';
import { MyContext } from '../../App';
import CircularProgress from '@mui/material/CircularProgress';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
const EditBannerV1 = () => {
  const[formFeilds,setFormfeilds]=useState({
          bannerTitle:"",
          images:[],
          catId:'',
          subCatId:'',
          thirdSubCatId:'',
          // thirdSubCat:'',
          price:'',
          align:'left'
      });
      const[previews,setPreviews]=useState([]);
      const[isLoading,setIsLoading]=useState(false);
      const [productCat, setproductCat] = useState('');
      const [productSubCat, setproductSubCat] = useState('');
      const [productThirdLevelCat, setproductThirdLevelCat] = useState('');
      const[align,setAlign]=useState('');
      const context=useContext(MyContext);

      useEffect(()=>{
              const id=context.isOpenFullScreen.id;
              fetchDataFromApi(`/api/bannerV1/${id}`,formFeilds).then((res)=>{
                //   console.log(res.category);
                  formFeilds.bannerTitle=res?.banner?.bannerTitle;
                  formFeilds.price=res?.banner?.price;
                  formFeilds.images=res?.banner?.images;
                  formFeilds.catId=res?.banner?.catId;
                  formFeilds.subCatId=res?.banner?.subCatId;
                  formFeilds.thirdSubCatId=res?.banner?.thirdSubCatId;
                  setPreviews(res?.banner?.images);
                  setproductCat(res?.banner?.catId);
                  setproductSubCat(res?.banner?.subCatId);
                  setproductThirdLevelCat(res?.banner?.thirdSubCatId)
                  setAlign(res?.banner?.align);
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
      }
      const setPreviewsFun=(previewsArr)=>{
          // console.log(previewsArr);
          setPreviews(previewsArr);
          // for setting removing image 
          formFeilds.images=previewsArr
      }
      const removeBannerImage=(image,index)=>{
          var imagesArr=[];
          imagesArr=previews;
          deleteImage(`/api/bannerV1/deleteImage?img=${image}`).then((res)=>{
              // console.log(res);
              imagesArr.splice(index,1);
              setPreviews([]);
              setTimeout(()=>{
                  setPreviews(imagesArr);
                  formFeilds.images=imagesArr
              },1000);
          })
      }
  const handleChange = (event) => {
        const id = event.target.value;
        const catObj = context.catData.find(cat => cat._id === id);

        setproductCat(id);

        setFormfeilds(prev => ({
            ...prev,
            catId: id,
            catName: catObj?.name || "",
            subCatId: "",
            subCat: "",
            thirdSubCatId: "",
            thirdsubCat: ""
        }));
    };

    const handleProductSubCat = (event) => {
        const id = event.target.value;
        setproductSubCat(id);

        let subCat = "";
        context.catData.forEach(cat => {
            const sub = cat.children?.find(s => s._id === id);
            if (sub) subCat = sub.name;
        });

        setFormfeilds(prev => ({
            ...prev,
            subCatId: id,
            subCat
        }));
    }; 
  
    const handleProductThirdLevelCat = (event) => {
        const id = event.target.value;
        setproductThirdLevelCat(id);

        let thirdName = "";
        context.catData.forEach(cat => {
            cat.children?.forEach(sub => {
                const third = sub.children?.find(t => t._id === id);
                if (third) thirdName = third.name;
            });
        });

        setFormfeilds(prev => ({
            ...prev,
            thirdSubCatId: id,
            thirdsubCat: thirdName
        }));
    };

    const handlealign = (e) => {
        const value = e.target.value;
        setAlign(value);
        setFormfeilds(prev => ({
            ...prev,
            align: value
        }));
        };


  const handleSubmit=(e)=>{
    e.preventDefault();
    // console.log(formFeilds);
    setIsLoading(true);
        if (formFeilds.bannerTitle==="") {
            context.openAlertBox("error", "Please enter banner name");
            setIsLoading(false);
            return false;
        }
        if (formFeilds.price==="") {
            context.openAlertBox("error", "Please enter price");
            setIsLoading(false);
            return false;
        }
        if (previews.length===0) {
            context.openAlertBox("error", "Please select category images");
            setIsLoading(false);
            return false;
        }
        editData(`/api/bannerV1/${context.isOpenFullScreen.id}`,formFeilds).then((res)=>{
                    // console.log(res);
                    // setIsLoading(false);
                    setTimeout(()=>{
                        setIsLoading(false);
                        context.setIsOpenFullScreen({
                        open:false
                    })
                    },2000)
                    context.openAlertBox(res?.banner?.message);
                })
  }
  return (
    <sectinon className="banners">
      <form className='banner-form' onSubmit={handleSubmit}>
        <div className='scroll-form'>
                <div className='products'>
                    <div className='banner-cat'>
                        <div className='col'>
                        <h3>Banner Title</h3>
                        <input type='text' name='bannerTitle' className='search cat-name'
                        value={formFeilds.bannerTitle} 
                        onChange={onChangeInput}
                        disabled={isLoading===true?true:false}
                        />
                    </div>
                      {/* CATEGORY */}
                        <div className='col'>
                            <h3>Product Category</h3>
                            {context.catData.length !== 0 && (
                                <Select size='small'
                                    value={productCat}
                                    onChange={handleChange}
                                    sx={{ width: '100%' }}
                                >
                                    {context.catData.map(cat => (
                                        <MenuItem key={cat._id} value={cat._id}>
                                            {cat.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            )}
                        </div>

                        {/* SUB CAT */}
                        <div className='col'>
                            <h3>Product Sub Category</h3>
                            <Select size='small'
                                value={productSubCat}
                                onChange={handleProductSubCat}
                                sx={{ width: '100%' }}
                            >
                                {context.catData.map(cat =>
                                    cat.children?.map(sub => (
                                        <MenuItem key={sub._id} value={sub._id}>
                                            {sub.name}
                                        </MenuItem>
                                    ))
                                )}
                            </Select>
                        </div>
                        {/* THIRD CATEGORY */}
                        <div className='col'>
                            <h3>Third Level Category</h3>
                            <Select size='small'
                                value={productThirdLevelCat}
                                onChange={handleProductThirdLevelCat}
                                sx={{ width: '100%' }}
                            >
                                {context.catData.map(cat =>
                                    cat.children?.map(sub =>
                                        sub.children?.map(third => (
                                            <MenuItem key={third._id} value={third._id}>
                                                {third.name}
                                            </MenuItem>
                                        ))
                                    )
                                )}
                            </Select>
                        </div>

                        {/* PRICE */}
                        <div className='col'>
                            <h3>Price</h3>
                            <input type='number'
                                className='search'
                                name='price'
                                value={formFeilds.price}
                                onChange={onChangeInput}
                            />
                        </div>
                        <div className='col'>
                            <h3>INFO</h3>
                            <Select size='small'
                                value={align}
                                onChange={handlealign}
                                sx={{ width: '100%' }}
                            >
                            <MenuItem  value={'left'}>
                            Left
                            </MenuItem>
                            <MenuItem  value={'right'}>
                            Right
                            </MenuItem>
                            </Select>
                        </div>
                    </div>
                </div>

                <div className='upload col'>
                    <h3>Banner Images</h3>
                    <div className='upload-file'>
                        {
                            previews.length!==0 && previews.map((image,index)=>{
                                return (
                                    <div className='upload-file-wrapper'>
                                        <span className='close-icon' onClick={()=>removeBannerImage(image,index)}><IoMdClose/></span>
                                        <div className='file' key={index}>
                                            <img 
                                            src={image} // use normal <img> attributes as props
                                            />
                                        </div>
                                    </div>
                                )
                            })
                        }
                        <UploadBox multiple={true} name="images" url="/api/bannerV1/uploadImages" setPreviewsFun={setPreviewsFun}/>
                    </div>
                </div>
            </div>
            <br/>
            <Button type="submit" className='header-btn'>{isLoading ? <CircularProgress color="inherit" size={20} /> : 'Publish and View'}</Button>
      </form>
    </sectinon>
  )
}

export default EditBannerV1;
