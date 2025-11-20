import React,{useState} from 'react';
import './style.css';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import ZoomProduct from '../../components/ZoomProduct';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ProductSlider from '../../components/ProductSlider';
import ProductDetail from '../../components/ProductDetail';
const ProductDetails = (props) => {
  const [activeSize, setActiveSize] = useState(0);
  const[activeTab,setActiveTab]=useState(0);
  const isActive=(index)=>{
    setActiveSize(index);
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
        <div className="container">
          <div className="zoom-container">
            <ZoomProduct />
          </div>
          <ProductDetail item={props?.data}/>
        </div>
        <div className="review-section">
          <div className="container">
            <div className="descr">
              <span className={`link-color ${activeTab===0?"active":""}`} onClick={()=>setActiveTab(0)}>Description</span>
              <span className={`link-color ${activeTab===1?"active":""}`} onClick={()=>setActiveTab(1)}>Product Details</span>
              <span className={`link-color ${activeTab===2?"active":""}`} onClick={()=>setActiveTab(2)}>Reviews (5)</span>
            </div>
            
            {
              activeTab===0 && (<div className="shadow">
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
              <br />
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
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
                            <h5>January 10, 2025 at 5:30 pm</h5>
                          </div>
                          <Rating name="half-rating-read" defaultValue={4.5} precision={0.5} readOnly />
                        </div>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum voluptatem, possimus dolores quidem qui ad distinctio mollitia sint eius voluptas.</p>
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
                            <h5>January 10, 2025 at 5:30 pm</h5>
                          </div>
                          <Rating name="half-rating-read" defaultValue={4.5} precision={0.5} readOnly />
                        </div>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum voluptatem, possimus dolores quidem qui ad distinctio mollitia sint eius voluptas.</p>
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
                            <h5>January 10, 2025 at 5:30 pm</h5>
                          </div>
                          <Rating name="half-rating-read" defaultValue={4.5} precision={0.5} readOnly />
                        </div>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum voluptatem, possimus dolores quidem qui ad distinctio mollitia sint eius voluptas.</p>
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
                            <h5>January 10, 2025 at 5:30 pm</h5>
                          </div>
                          <Rating name="half-rating-read" defaultValue={4.5} precision={0.5} readOnly />
                        </div>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum voluptatem, possimus dolores quidem qui ad distinctio mollitia sint eius voluptas.</p>
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
            }
            
          </div>
        </div>

        {/* related products */}
        <div className="related-product">
        <div className="container">
          <h1>Related Products</h1>
        </div>
        <ProductSlider items={5}/>
      </div>
      </section>
    </>
  )
}
export default ProductDetails
