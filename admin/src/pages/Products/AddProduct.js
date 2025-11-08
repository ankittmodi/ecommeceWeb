import React,{useContext, useState} from 'react'
import './style.css'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Rating from '@mui/material/Rating';
import UploadBox from '../../Component/UploadBox';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { IoMdClose } from "react-icons/io";
import CircularProgress from '@mui/material/CircularProgress';
import {Button} from '@mui/material';
import { MyContext } from '../../App';
import { deleteImage, postData } from '../../utils/Api';

const AddProduct = () => {

    const [formFeilds,setFormfeilds]=useState({
            name:"",
            description:"",
            images:[],
            brand:"",
            price:"",
            oldPrice:"",
            catName:"",
            catId:"",
            subCatId:"",
            subCatName:"",
            thirdsubCat:"",
            thirdsubCatId:"",
            countInStock:"",
            rating:"",
            isFeatured:false,
            discount:"",
            productRam:[],
            size:[],
            productWeight:[],
            dateCreated:"",
        });
    const[previews,setPreviews]=useState([]);
    const[isLoading,setIsLoading]=useState(false);
    const context=useContext(MyContext);
    // const history=useNavigate();

    const [productCat, setproductCat] =useState('');
    const [productSubCat, setproductSubCat] =useState('');
    const [productThirdLevelCat, setproductThirdLevelCat] =useState('');
    const [productFeatured, setproductFeatured] =useState('');
    const [productRam, setproductRam] =useState([]);
    const [productWeight, setproductWeight] =useState([]);
    const [productSize, setproductSize] =useState([]);

    const handleChange = (event) => {
        setproductCat(event.target.value);
        setFormfeilds(prev => ({...prev, catId:event.target.value}));
    };

    const selectCatByName=(name)=>{
        setFormfeilds(prev => ({...prev, catName:name}));
    }

    const handleProductSubCat = (event) => {
        setproductSubCat(event.target.value);
        setFormfeilds(prev => ({...prev, subCatId:event.target.value}));
    };

    const selectSubCatByName=(name)=>{
        setFormfeilds(prev => ({...prev, subCatName:name}));
    }

    const handleProductThirdLevelCat = (event) => {
        setproductThirdLevelCat(event.target.value);
        setFormfeilds(prev => ({...prev, thirdsubCatId:event.target.value}));
    };

    const selectThirdLevelCatByName=(name)=>{
        setFormfeilds(prev => ({...prev, thirdsubCat:name}));
    }

    const handleIsFeatured=(event)=>{
        setproductFeatured(event.target.value);
        setFormfeilds(prev => ({...prev, isFeatured:event.target.value}));
    }

    const handleProductRam=(event)=>{
        const { value } = event.target;
        const arr = typeof value === 'string' ? value.split(',') : value;
        setproductRam(arr);
        setFormfeilds(prev => ({...prev, productRam:arr}));
    }

    const handleProductWeight=(event)=>{
        const { value } = event.target;
        const arr = typeof value === 'string' ? value.split(',') : value;
        setproductWeight(arr);
        setFormfeilds(prev => ({...prev, productWeight:arr}));
    }

    const handleProductSize=(event)=>{
        const { value } = event.target;
        const arr = typeof value === 'string' ? value.split(',') : value;
        setproductSize(arr);
        setFormfeilds(prev => ({...prev, size:arr}));
    }

    const onChangeRating=(e, newValue)=>{
        setFormfeilds(prev=>({...prev, rating:newValue}));
    }

    const onChangeInput=(e)=>{
        const{name,value}=e.target;
        setFormfeilds(prev=>({...prev,[name]:value}));
    }

    const setPreviewsFun = (previewsArr) => {
        setPreviews([...previewsArr]);
        setFormfeilds(prev => ({ ...prev, images: previewsArr }));
    }

    const removeCategoryImage = (image, index) => {
        deleteImage(`/api/product/deleteImage?img=${image}`).then((res) => {
            
            const imagesArr = [...previews]; // copy, NOT reference
            imagesArr.splice(index, 1);

            setPreviews(imagesArr);
            setFormfeilds(prev => ({ ...prev, images: imagesArr }));
        })
    }


    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(formFeilds);
        const requiredFields = [
            "name",
            "description",
            "brand",
            "price",
            "catName",
            "subCatName",
            "countInStock",
            "rating",
            "discount",
            "productRam",
            "size",
            "productWeight"
        ];

        for (let field of requiredFields) {
            if (!formFeilds[field]) {
                context.openAlertBox("error", `Please enter product ${field}`);
                setIsLoading(false);
                return false;
            }
        }

        if (!formFeilds.images || formFeilds.images.length === 0) {
            context.openAlertBox("error","Please upload product images");
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        postData("/api/product/create",formFeilds).then((res)=>{
            console.log(res);
            if(res.error===false){
                context.openAlertBox("success",res.message);
                setTimeout(()=>{
                    setIsLoading(false);
                    context.setIsOpenFullScreen({
                        open:false
                    })
                    // history("/products")
                },1000)
            }
            else{
                setIsLoading(false);
                context.openAlertBox("error",res.message);
            }
        })
    }

  return (
    <section className='add-product'>
        <form className='form' onSubmit={handleSubmit}>
            <div className='scroll-form'>
                <div className='products'>
                    <div className='col'>
                        <h3>Product Name</h3>
                        <input type='text' className='search' 
                        name='name' 
                        value={formFeilds.name} 
                        onChange={onChangeInput}/>
                    </div>
                </div>
                <div className='products'>
                    <div className='col'>
                        <h3>Product Description</h3>
                        <textarea type='text' className='textarea'
                        name='description' 
                        value={formFeilds.description} 
                        onChange={onChangeInput}
                        />
                    </div>
                </div>
                <div className='products product-grid'>
                    <div className='col'>
                        <h3>Product Category</h3>
                        {
                            context.catData.length!==0 &&
                                <Select
                                labelId="demo-simple-select-label"
                                id="productCatDrop"
                                value={productCat}
                                label="Category"
                                size='small'
                                onChange={handleChange}
                                className='productCat'
                                sx={{ width: '100%' }}
                                >
                                {
                                    context.catData.map((cat,index)=>{
                                        return(
                                            <MenuItem key={cat._id} value={cat._id} onClick={()=>selectCatByName(cat.name)}>{cat.name}</MenuItem>
                                        )
                                    })
                                }
                                </Select>
                        }
                    </div>
                    <div className='col'>
                        <h3>Product Sub Category</h3>
                        {
                            context.catData.length!==0 &&
                                <Select
                                labelId="demo-simple-select-label"
                                    id="productCatDrop"
                                    value={productSubCat}
                                    label="Category"
                                    size='small'
                                    onChange={handleProductSubCat}
                                    className='productCat'
                                sx={{ width: '100%' }}
                                >
                                {
                                    context.catData.map((cat,index)=>{
                                        return(
                                                cat?.children?.length!==0 && cat?.children.map((subCat,index)=>{
                                                    return(
                                                        <MenuItem key={subCat._id} value={subCat._id} onClick={()=>selectSubCatByName(subCat.name)}>{subCat.name}</MenuItem>
                                                    )
                                                })
                                            
                                        )
                                    })
                                }
                                </Select>
                        }
                    </div>
                    <div className='col'>
                        <h3>Product third Level Category</h3>
                        {
                            context.catData.length!==0 &&
                                <Select
                                labelId="demo-simple-select-label"
                                    id="productCatDrop"
                                    value={productThirdLevelCat}
                                    label="Category"
                                    size='small'
                                    onChange={handleProductThirdLevelCat}
                                    className='productCat'
                                sx={{ width: '100%' }}
                                >
                                {
                                    context.catData.map((cat,index)=>{
                                        return(
                                                cat?.children?.length!==0 && cat?.children.map((subCat,index)=>{
                                                    return(
                                                        subCat?.children?.length!==0 && subCat?.children.map((thirdCat,index)=>{
                                                            return(
                                                                <MenuItem value={thirdCat._id} key={index} onClick={()=>selectThirdLevelCatByName(thirdCat.name)}>{thirdCat.name}</MenuItem>
                                                            )
                                                        })
                                                        
                                                    )
                                                })
                                            
                                        )
                                    })
                                }
                                </Select>
                        }
                    </div>
                    <div className='col'>
                        <h3>Product Price</h3>
                        <input type='number' className='search'
                        name='price' 
                        value={formFeilds.price} 
                        onChange={onChangeInput}
                        />
                    </div>
                    <div className='col'>
                        <h3>Product Old Price</h3>
                        <input type='number' className='search'
                         name='oldPrice' 
                        value={formFeilds.oldPrice} 
                        onChange={onChangeInput}
                        />
                    </div>
                    <div className='col'>
                        <h3>Product IsFeatured</h3>
                        <Select
                        labelId="demo-simple-select-label"
                        id="productCatDrop"
                        value={productFeatured}
                        label="Category"
                        size='small'
                        onChange={handleIsFeatured}
                        className='productCat'
                        sx={{ width: '100%' }}
                        >
                        <MenuItem value={true}>True</MenuItem>
                        <MenuItem value={false}>False</MenuItem>
                        </Select>
                    </div>
                    <div className='col'>
                        <h3>Product Stock</h3>
                        <input type='number' className='search'
                         name='countInStock' 
                        value={formFeilds.countInStock} 
                        onChange={onChangeInput}
                        />
                    </div>
                    <div className='col'>
                        <h3>Product Brand</h3>
                        <input type='text' className='search'
                        name='brand' 
                        value={formFeilds.brand} 
                        onChange={onChangeInput}
                        />
                    </div>
                    <div className='col'>
                        <h3>Product Discount</h3>
                        <input type='number' className='search'
                        name='discount' 
                        value={formFeilds.discount} 
                        onChange={onChangeInput}
                        />
                    </div>
                    <div className='col'>
                        <h3>Product Rams</h3>
                        <Select
                        multiple
                        labelId="demo-simple-select-label"
                        id="productCatDrop"
                        value={productRam}
                        label="Category"
                        size='small'
                        onChange={handleProductRam}
                        className='productCat'
                        sx={{ width: '100%' }}
                        >
                        <MenuItem value={"4GB"}>4 GB</MenuItem>
                        <MenuItem value={"6GB"}>6 GB</MenuItem>
                        <MenuItem value={"8GB"}>8 GB</MenuItem>
                        </Select>
                    </div>
                    <div className='col'>
                        <h3>Product Weight</h3>
                        <Select
                        multiple
                        labelId="demo-simple-select-label"
                        id="productCatDrop"
                        value={productWeight}
                        label="Category"
                        size='small'
                        onChange={handleProductWeight}
                        className='productCat'
                        sx={{ width: '100%' }}
                        >
                        <MenuItem value={10}>2KG</MenuItem>
                        <MenuItem value={20}>4kg</MenuItem>
                        <MenuItem value={30}>5KG</MenuItem>
                        <MenuItem value={40}>10kg</MenuItem>
                        </Select>
                    </div>
                    <div className='col'>
                        <h3>Product Size</h3>
                        <Select
                        multiple
                        labelId="demo-simple-select-label"
                        id="productCatDrop"
                        value={productSize}
                        label="Category"
                        size='small'
                        onChange={handleProductSize}
                        className='productCat'
                        sx={{ width: '100%' }}
                        >
                        <MenuItem value={'S'}>S</MenuItem>
                        <MenuItem value={'M'}>M</MenuItem>
                        <MenuItem value={'L'}>L</MenuItem>
                        <MenuItem value={'XL'}>XL</MenuItem>
                        <MenuItem value={'XXL'}>XXL</MenuItem>
                        </Select>
                    </div>
                </div>

                <div className='products product-grid'>
                    <div className='col'>
                        <h3>Rating</h3>
                        <Rating 
                            name="half-rating" 
                            defaultValue={1} 
                            precision={0.5}
                            onChange={onChangeRating}
                        />
                    </div>
                </div>

                <div className='upload col'>
                    <h3>Media & Images</h3>
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
                        <UploadBox multiple={true} name="images" url="/api/product/uploadImages" setPreviewsFun={setPreviewsFun}/>
                    </div>
                </div>
            </div>
            <br/>
            <Button type="submit" className='header-btn'>{isLoading ? <CircularProgress color="inherit" size={20} /> : 'Publish and View'}</Button>
        </form>

    </section>
  )
}

export default AddProduct
