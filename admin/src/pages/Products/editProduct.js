import React,{useContext, useEffect, useState} from 'react'
import './style.css'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Rating from '@mui/material/Rating';
import UploadBox from '../../Component/UploadBox';
import { IoMdClose } from "react-icons/io";
import CircularProgress from '@mui/material/CircularProgress';
import {Button} from '@mui/material';
import { MyContext } from '../../App';
import { deleteImage, editData, fetchDataFromApi } from '../../utils/Api';
import { useParams } from 'react-router-dom';


const EditProduct = () => {

  const [formFeilds,setFormfeilds]=useState({
    name:"",
    description:"",
    images:[],
    brand:"",
    price:"",
    oldPrice:"",
    catName:"",
    category:"",
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
  const { id } = useParams();

  const [productCat, setproductCat] =useState('');
  const [productSubCat, setproductSubCat] =useState('');
  const [productThirdLevelCat, setproductThirdLevelCat] =useState('');
  const [productFeatured, setproductFeatured] =useState('');

  // -------------------- RAM --------------------
  const [ramList, setRamList] = useState([]);
  const [selectedRams, setSelectedRams] = useState([]);

  // -------------------- SIZE --------------------
  const [sizeList, setSizeList] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);

  // -------------------- WEIGHT --------------------
  const [weightList, setWeightList] = useState([]);
  const [selectedWeights, setSelectedWeights] = useState([]);

  // helper: convert incoming item (id | {_id,name} | name) => id if possible
  const resolveToId = (item, list) => {
    if (!item) return null;
    // object with _id
    if (typeof item === 'object' && item._id) return item._id;
    // string: maybe id already
    if (typeof item === 'string') {
      // if exact match with some _id in list -> keep it
      const byId = list.find(i => i._id === item);
      if (byId) return item;
      // else match by name
      const byName = list.find(i => String(i.name).toLowerCase() === String(item).toLowerCase());
      if (byName) return byName._id;
      // else return the string as-is (may be id not present in current list)
      return item;
    }
    return null;
  };

  // LOAD RAM / SIZE / WEIGHT LISTS
  useEffect(() => {
    fetchDataFromApi('/api/product/productRams/get').then((res) => {
      if (res?.success) setRamList(res?.data || []);
    });

    fetchDataFromApi('/api/product/productSize/get').then((res) => {
      if (res?.success) setSizeList(res?.data || []);
    });

    fetchDataFromApi('/api/product/productWeight/get').then((res) => {
      if (res?.success) setWeightList(res?.data || []);
    });
  }, []);


  // LOAD PRODUCT DATA - run after lists may have loaded (depend on lists)
  useEffect(()=>{
    const productId = context?.isOpenFullScreen?.id || id;
    if (!productId) return;

    fetchDataFromApi(`/api/product/${productId}`).then((res)=>{
      if(!res?.product) return;
      const productData = res.product;

      // --- map incoming arrays to IDs using helper and available lists ---
      // incoming productData.productRam could be:
      //  - array of ids -> keep
      //  - array of objects {_id,name} -> map to _id
      //  - array of names -> find corresponding id from ramList by name
      const ramIds = Array.isArray(productData.productRam)
        ? productData.productRam.map(item => resolveToId(item, ramList)).filter(Boolean)
        : [];

      const sizeIds = Array.isArray(productData.size)
        ? productData.size.map(item => resolveToId(item, sizeList)).filter(Boolean)
        : [];

      const weightIds = Array.isArray(productData.productWeight)
        ? productData.productWeight.map(item => resolveToId(item, weightList)).filter(Boolean)
        : [];

      // SET selected states (these are used by MUI Select value)
      setSelectedRams(ramIds);
      setSelectedSizes(sizeIds);
      setSelectedWeights(weightIds);

      // set previews/images
      setPreviews(productData.images || []);

      // set product-level dropdown states
      setproductCat(productData.catId || "");
      setproductSubCat(productData.subCatId || "");
      setproductThirdLevelCat(productData.thirdsubCatId || "");
      setproductFeatured(productData.isFeatured || false);

      // set whole form: for submission, store arrays as ids (not objects)
      setFormfeilds({
        name: productData.name || "",
        description: productData.description || "",
        images: productData.images || [],
        brand: productData.brand || "",
        price: productData.price || "",
        oldPrice: productData.oldPrice || "",
        category: productData.category || "",
        catName: productData.catName || "",
        catId: productData.catId || "",
        subCatId: productData.subCatId || "",
        subCat: productData.subCat || "",
        thirdsubCat: productData.thirdsubCat || "",
        thirdsubCatId: productData.thirdsubCatId || "",
        countInStock: productData.countInStock || "",
        rating: productData.rating || "",
        isFeatured: productData.isFeatured || false,
        discount: productData.discount || "",
        // store ids (ensures backend expects ids)
        productRam: ramIds,
        size: sizeIds,
        productWeight: weightIds,
        dateCreated: productData.dateCreated || ""
      });

    }).catch(err => {
      console.error("fetch product error:", err);
    });

    // run when productId or lists change (so mapping by name can work after lists load)
  }, [ramList, sizeList, weightList, context?.isOpenFullScreen?.id, id]);


  // CATEGORY HANDLERS
  const handleChange = (event) => {
    const id = event.target.value;
    const catObj = context?.catData?.find(cat => cat._id === id);

    setproductCat(id);
    setFormfeilds(prev => ({
      ...prev,
      catId: id,
      catName: catObj?.name || "",
      category: id,
      subCatId: "",
      subCat: "",
      thirdsubCatId: "",
      thirdsubCat: ""
    }));
  };

  const handleProductSubCat = (event) => {
    const id = event.target.value;
    setproductSubCat(id);

    let subCat = "";
    for (let cat of context.catData) {
      if (cat.children) {
        const sub = cat.children.find(s => s._id === id);
        if (sub) {
          subCat = sub.name;
          break;
        }
      }
    }

    setFormfeilds(prev => ({
      ...prev,
      subCatId: id,
      subCat: subCat,
      thirdsubCatId: "",
      thirdsubCat: ""
    }));
  };

  const handleProductThirdLevelCat = (event) => {
    const id = event.target.value;
    setproductThirdLevelCat(id);

    let thirdName = "";
    for (let cat of context.catData) {
      if (cat.children) {
        for (let sub of cat.children) {
          if (sub.children) {
            const third = sub.children.find(t => t._id === id);
            if (third) {
              thirdName = third.name;
              break;
            }
          }
        }
      }
    }

    setFormfeilds(prev => ({
      ...prev,
      thirdsubCatId: id,
      thirdsubCat: thirdName
    }));
  };


  // FEATURED
  const handleIsFeatured=(event)=>{
    setproductFeatured(event.target.value);
    setFormfeilds(prev => ({...prev, isFeatured:event.target.value}));
  }


  // -------------------- RAM / SIZE / WEIGHT HANDLERS --------------------
  const handleProductRam = (event) => {
    let value = event.target.value;
    if (!Array.isArray(value)) value = [value];
    setSelectedRams(value);
    setFormfeilds(prev => ({ ...prev, productRam: value }));
  };


  const handleProductWeight = (event) => {
    let value = event.target.value;
    if (!Array.isArray(value)) value = [value];
    setSelectedWeights(value);
    setFormfeilds(prev => ({ ...prev, productWeight: value }));
  };


  const handleProductSize = (event) => {
    let value = event.target.value;
    if (!Array.isArray(value)) value = [value];
    setSelectedSizes(value);
    setFormfeilds(prev => ({ ...prev, size: value }));
  };


  // NORMAL INPUT
  const onChangeRating=(e, newValue)=>{
    setFormfeilds(prev=>({...prev, rating:newValue}));
  }

  const onChangeInput=(e)=>{
    const{name,value}=e.target;
    setFormfeilds(prev=>({...prev,[name]:value}));
  }


  // IMAGE HANDLING
  const setPreviewsFun = (previewsArr) => {
    setPreviews([...previewsArr]);
    setFormfeilds(prev => ({ ...prev, images: previewsArr }));
  }

  const removeCategoryImage = (image, index) => {
    deleteImage(`/api/product/deleteImage?img=${image}`).then(() => {
      const imagesArr = [...previews];
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
      "catId",
      "subCat",
      "countInStock",
      "rating",
      "discount",
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
    editData(`/api/product/updateProduct/${context.isOpenFullScreen.id}`,formFeilds).then((res)=>{
      console.log(res);
      if(!res.data.error){
        context.openAlertBox("success",res.data.message);
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
        context.openAlertBox("error",res.data.message);
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
                context?.catData?.length!==0 &&
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
                    context?.catData?.map((cat,index)=>{
                      return(
                        <MenuItem key={index} value={cat._id} >{cat.name}</MenuItem>
                      )
                    })
                  }
                </Select>
              }
            </div>

            <div className='col'>
              <h3>Product Sub Category</h3>
              {
                context?.catData?.length!==0 &&
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
                    context?.catData?.map((cat,index)=>{
                      return(
                        cat?.children?.length!==0 && cat?.children.map((subCat,index)=>{
                          return(
                            <MenuItem key={index} value={subCat._id} >{subCat.name}</MenuItem>
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
                context?.catData?.length!==0 &&
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
                    context?.catData?.map((cat,index)=>{
                      return(
                        cat?.children?.length!==0 && cat?.children.map((subCat,index)=>{
                          return(
                            subCat?.children?.length!==0 && subCat?.children.map((thirdCat,index)=>{
                              return(
                                <MenuItem value={thirdCat._id} key={index} >{thirdCat.name}</MenuItem>
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
              <Select multiple size='small'
                value={selectedRams}
                onChange={handleProductRam}
                sx={{ width: "100%" }}>
                {ramList?.map(ram => (
                  <MenuItem key={ram._id} value={ram._id}>{ram.name}</MenuItem>
                ))}
              </Select>
            </div>

            <div className='col'>
              <h3>Product Weight</h3>
              <Select multiple size='small'
                value={selectedWeights}
                onChange={handleProductWeight}
                sx={{ width: "100%" }}>
                {weightList.map(w => (
                  <MenuItem key={w._id} value={w._id}>{w.name}</MenuItem>
                ))}
              </Select>
            </div>

            <div className='col'>
              <h3>Product Size</h3>
              <Select multiple size='small'
                value={selectedSizes}
                onChange={handleProductSize}
                sx={{ width: "100%" }}>
                {sizeList.map(size => (
                  <MenuItem key={size._id} value={size._id}>{size.name}</MenuItem>
                ))}
              </Select>
            </div>

          </div>

          <div className='products product-grid'>
            <div className='col'>
              <h3>Rating</h3>
              <Rating
                name="rating"
                value={formFeilds.rating}
                onChange={onChangeRating}
              />
            </div>
          </div>

          <div className='upload col'>
            <h3>Media & Images</h3>
            <div className='upload-file'>
              {
                previews?.length!==0 && previews?.map((image,index)=>{
                  return (
                    <div className='upload-file-wrapper' key={index}>
                      <span className='close-icon' onClick={()=>removeCategoryImage(image,index)}><IoMdClose/></span>
                      <div className='file'>
                        <img src={image} alt="preview" />
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

export default EditProduct
