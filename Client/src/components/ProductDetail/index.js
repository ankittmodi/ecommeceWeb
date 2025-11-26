import React,{useRef, useState} from 'react';
import './style.css';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import { IoCartOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { IoIosGitCompare } from "react-icons/io";
import QuantityBox from '../../components/QuantityBox';
import Rating from '@mui/material/Rating';
const ProductDetail = (props) => {
  const [activeSize, setActiveSize] = useState(0);
    const[activeTab,setActiveTab]=useState(0);
    const reviewSection=useRef();
    const isActive=(index)=>{
      setActiveSize(index);
    }
    console.log(props?.data);
  return (
      <div className="details-container">
      <div className='details'>
              <h1 className='title'>{props?.data?.name}</h1>
              <div className="brands">
                <p>Brands: <strong>{props?.data?.brand}</strong></p>
                <div className="review">
                  <Rating 
                    name="rating" 
                    value={props?.data?.rating || 0} 
                    readOnly
                  />
                  <p onClick={props.goToReviews}
                  ref={reviewSection}
                  >Review({props.reviewsCount})</p>
                </div>
              </div>
              <div className="price">
                <span className="new-price"><strong>&#x20b9; {props?.data?.price}</strong></span>
                <span className="old-price">&#x20b9; {props?.data?.oldPrice}</span>
                <p>Available in Stock <span>{props?.data?.countInStock} items</span></p>
              </div>
              <br />
              <p>{props?.data?.description}</p>
              
              {/* product size */}
              {Array.isArray(props?.data?.size) && props.data.size.length > 0 && (
                <div className="productSize">
                  <span>Size :</span>
                  <ul className="list list-style mb-0">
                    {props.data.size.map((size, index) => (
                      <li className="list-inline-item" key={index}>
                        <Link
                          className={`tag ${activeSize === index ? 'active' : ''}`}
                          onClick={() => isActive(index)}
                        >
                          {size}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
                {/* <div className="productSize">
                  <span>Size/ Weight:</span>
                  <ul className="list list-style mb-0">
                    <li className="list-inline-item">
                      <Link className={`tag ${activeSize===0?'active':""}`} onClick={()=>isActive(0)}>Small</Link>
                    </li>
                    <li className="list-inline-item">
                      <Link className={`tag ${activeSize===1?'active':""}`}  onClick={()=>isActive(1)}>Large</Link>
                    </li>
                    <li className="list-inline-item">
                      <Link className={`tag ${activeSize===2 ? 'active':""}`} onClick={()=>isActive(2)}>XL</Link>
                    </li>
                    <li className="list-inline-item">
                      <Link className={`tag ${activeSize===3?'active':""}`} onClick={()=>isActive(3)}>XXL</Link>
                    </li>
                  </ul>
                </div> */}
              {/* product size */}
              {Array.isArray(props?.data?.ram) && props.data.ram.length > 0 && (
                <div className="productSize">
                  <span>RAM :</span>
                  <ul className="list list-style mb-0">
                    {props.data.ram.map((ram, index) => (
                      <li className="list-inline-item" key={index}>
                        <Link
                          className={`tag ${activeSize === index ? 'active' : ''}`}
                          onClick={() => isActive(index)}
                        >
                          {ram}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {/* product weight */}
              {Array.isArray(props?.data?.weight) && props.data.weight.length > 0 && (
                <div className="productSize">
                  <span>Weight :</span>
                  <ul className="list list-style mb-0">
                    {props.data.weight.map((weight, index) => (
                      <li className="list-inline-item" key={index}>
                        <Link
                          className={`tag ${activeSize === index ? 'active' : ''}`}
                          onClick={() => isActive(index)}
                        >
                          {weight}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
                <p>Free Shipping (Est. Selivery Time 2-3 Days)</p>
              {/* Quantity box */}
              <div className="quantity-wrapper">
                <div className="quant">
                  <QuantityBox/>
                </div>
                <Button className='add-btn'><IoCartOutline/> Add to Cart</Button>
              </div>
              <div className="detail-fea">
                <span className='wish link-color'><CiHeart className='svg'/> Add to Whislist</span>
                <span className='wish link-color'><IoIosGitCompare className='svg'/> Add to Compare</span>
              </div>
          </div>
    </div>
  )
}

export default ProductDetail
