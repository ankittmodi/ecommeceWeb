import React,{useState} from 'react';
import './style.css';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import { IoCartOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { IoIosGitCompare } from "react-icons/io";
import QuantityBox from '../../components/QuantityBox';
import Rating from '@mui/material/Rating';
const ProductDetail = () => {
  const [activeSize, setActiveSize] = useState(0);
    const[activeTab,setActiveTab]=useState(0);
    const isActive=(index)=>{
      setActiveSize(index);
    }
  return (
    
      <div className="details-container">
      <div className='details'>
              <h1 className='title'>Cropped satin saree</h1>
              <div className="brands">
                <p>Brands: <strong>House of satin</strong></p>
                <div className="review">
                  <Rating name="half-rating-read" defaultValue={4.5} precision={0.5} readOnly />
                  <p>Review(10)</p>
                </div>
              </div>
              <div className="price">
                <span className="old-price">Rs. 999</span>
                <span className="new-price"><strong>Rs. 599</strong></span>
                <p>Available in Stock <span>120 items</span></p>
              </div>
              <br />
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, delectus animi eum laborum tenetur sunt natus necessitatibus quos rerum. Accusamus accusantium ipsum molestiae enim architecto? Atque placeat libero eos non.Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, delectus animi eum laborum tenetur sunt natus necessitatibus quos rerum. Accusamus accusantium ipsum molestiae enim architecto? Atque placeat libero eos non.</p>
              
              {/* product size */}
                <div className="productSize">
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
                </div>
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
