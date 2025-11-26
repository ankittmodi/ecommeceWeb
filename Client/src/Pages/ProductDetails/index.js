import React,{useContext, useEffect, useState} from 'react';
import './style.css';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import ZoomProduct from '../../components/ZoomProduct';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ProductSlider from '../../components/ProductSlider';
import ProductDetail from '../../components/ProductDetail';
import { useParams } from 'react-router-dom';
import { fetchDataFromApi } from '../../utils/Api';
import CircularProgress from '@mui/material/CircularProgress';
import AddReviews from './AddReviews';
import { myContext } from '../../App';
const ProductDetails = (props) => {
  const [activeSize, setActiveSize] = useState(0);
  const[activeTab,setActiveTab]=useState(0);
  const[productData,setProductData]=useState();
  const[loading,setIsLoading]=useState(false);
  const[reviewsCount,setReviewsCount]=useState(0);
  const[relatedProduct,setRelatedProduct]=useState([]);
  const context=useContext(myContext);
  const isActive=(index)=>{
    setActiveSize(index);
  }
  const {id}=useParams();
  useEffect(()=>{
    setIsLoading(true);
    fetchDataFromApi(`/api/product/${id}`).then((res)=>{
      console.log(res);
      if(!res?.error){
        setProductData(res?.product);

        fetchDataFromApi(`/api/product/getAllProductsBySubCatId/${res?.product?.subCatId}`).then((res)=>{
          // console.log(res?.products);\
          if(!res.error){
            const filteredData=res?.products?.filter((item)=>item._id!==id);
            setRelatedProduct(res?.products);
          }
        })
        setTimeout(()=>{
          setIsLoading(false);
        },500);
      }
    })
    window.scrollTo(0,0);
  },[id]);

  useEffect(()=>{
    fetchDataFromApi(`/api/user/getReview?productId=${id}`).then((res)=>{
                if(!res.error){
                    // setReviewData(res?.reviews);
                  setReviewsCount(res?.reviews?.length)
                }
            });
  },[reviewsCount]);

  const goToReviews=()=>{
    window.scrollTo({
      top:640,
      // top:props?.reviewSection?.current.offsetTop-150,
      behavior:'smooth'
    });
    setActiveTab(2);
  }
  return (
    <>
      <div className='product-details'>
        <div role="presentation" className='container'>
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="/" className='link-color'>
                Home
              </Link>
              <Link underline="hover" color="inherit" href="/" className='link-color'>
                Fashion
              </Link>
              <Link underline="hover" color="primary" href="/" className='link-color'>
                Cropped satin saree
              </Link>
            </Breadcrumbs>
        </div>
      </div>

      <section className='details'>
      {
        loading===true?
        <div className='loader'>
        <CircularProgress size={50} />
      </div>:
        <>
          <div className="container">
          <div className="zoom-container">
            <ZoomProduct images={productData?.images}/>
          </div>
          <ProductDetail data={productData} reviewsCount={reviewsCount} goToReviews={goToReviews}/>
        </div>
        <div className="review-section">
          <div className="container">
            <div className="descr">
              <span className={`link-color ${activeTab===0?"active":""}`} onClick={()=>setActiveTab(0)}>Description</span>
              <span className={`link-color ${activeTab===1?"active":""}`} onClick={()=>setActiveTab(1)}>Product Details</span>
              <span className={`link-color ${activeTab===2?"active":""}`} onClick={()=>setActiveTab(2)}>Reviews ({reviewsCount})</span>
            </div>
            
            {
              activeTab===0 && (<div className="shadow">
              <p>{productData?.description}</p>
              {/* <br />
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p> */}
            </div>)
            }
            {
              activeTab===1 && (<div className="shadow">
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
              <br />
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
            </div>)
            }
            {activeTab===2 && 
            <div>
              {
                productData?.length!==0 && <AddReviews productId={productData?._id} setReviewsCount={setReviewsCount} />
              }
            </div>
            }
            
          </div>
        </div>

        {/* related products */}
        {
          relatedProduct?.length!==0 && 
          <div className="related-product">
            <div className="container">
              <h1>Related Products</h1>
            </div>
            <ProductSlider items={5} data={relatedProduct}/>
          </div>
        }
        
        </>
      }
      </section>
    </>
  )
}
export default ProductDetails
