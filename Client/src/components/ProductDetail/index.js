import React, { useContext, useRef, useState, useEffect } from 'react';
import './style.css';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import { IoCartOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { IoIosGitCompare } from "react-icons/io";
import QuantityBox from '../../components/QuantityBox';
import Rating from '@mui/material/Rating';
import { myContext } from '../../App';

const ProductDetail = (props) => {
  const [activeSize, setActiveSize] = useState(null);
  const [activeRam, setActiveRam] = useState(null);
  const [activeWeight, setActiveWeight] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedRam, setSelectedRam] = useState(null);
  const [selectedWeight, setSelectedWeight] = useState(null);

  const [isAdded, setIsAdded] = useState(false);

  const context = useContext(myContext);
  const reviewSection = useRef();

  const safe = (val) => (val === null || val === undefined ? "" : String(val));

  // ✅ Check if exact product+options is already in cart
  const isAlreadyAdded = context?.cartItems?.some(item =>
    item.productId === props?.data?._id &&
    safe(item.size) === safe(selectedSize) &&
    safe(item.ram) === safe(selectedRam) &&
    safe(item.weight) === safe(selectedWeight)
  );

  // ✅ Check if product exists in cart (ignore options) for refresh
  const isProductInCart = context?.cartItems?.some(item =>
    item.productId === props?.data?._id
  );

  // Set added on refresh
  useEffect(() => {
    if (isProductInCart) {
      setIsAdded(true);
    }
  }, [isProductInCart]);

  const isActive = (index, type, value) => {
    if (type === "size") {
      setActiveSize(index);
      setSelectedSize(value);
    }
    if (type === "ram") {
      setActiveRam(index);
      setSelectedRam(value);
    }
    if (type === "weight") {
      setActiveWeight(index);
      setSelectedWeight(value);
    }
  };

  const handleSelectQty = (qty) => setQuantity(qty);

  const addToCart = (product, userId, quantity) => {
    if (!userId) {
      context.openAlertBox("error", "You are not logged in, please login first!");
      return false;
    }

    if (!selectedSize && !selectedRam && !selectedWeight && 
        (Array.isArray(product.size) && product.size.length > 0 ||
         Array.isArray(product.productRam) && product.productRam.length > 0 ||
         Array.isArray(product.productWeight) && product.productWeight.length > 0)) {
      context.openAlertBox("error", "Please select at least one option (Size, RAM, or Weight) before adding to cart!");
      return false;
    }

    const productItems = {
      _id: product._id,
      name: product.name,
      image: product.images[0],
      price: product?.price,
      oldPrice: product?.oldPrice,
      discount: product?.discount,
      size: selectedSize || '',
      ram: selectedRam || '',
      weight: selectedWeight || '',
      quantity: quantity,
      subTotal: product.price * quantity,
      productId: product._id,
      countInStock: product.countInStock,
    };

    try {
      context?.addToCarts(productItems, userId, quantity);
      setIsAdded(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="details-container">
      <div className='details'>
        <h1 className='title'>{props?.data?.name}</h1>

        <div className="brands">
          <p>Brands: <strong>{props?.data?.brand}</strong></p>
          <div className="review">
            <Rating name="rating" value={props?.data?.rating || 0} readOnly />
            <p onClick={props.goToReviews} ref={reviewSection}>
              Review({props.reviewsCount})
            </p>
          </div>
        </div>

        <div className="price">
          <span className="new-price"><strong>&#x20b9; {props?.data?.price}</strong></span>
          <span className="old-price">&#x20b9; {props?.data?.oldPrice}</span>
          <p>Available in Stock <span>{props?.data?.countInStock} items</span></p>
        </div>

        <br />
        <p>{props?.data?.description}</p>

        {/* SIZE */}
        {Array.isArray(props?.data?.size) && props.data.size.length > 0 && (
          <div className="productSize">
            <span>Size :</span>
            <ul className="list list-style mb-0">
              {props.data.size.map((size, index) => (
                <li className="list-inline-item" key={index}>
                  <Link
                    className={`tag ${activeSize === index ? 'active' : ''}`}
                    onClick={() => isActive(index, "size", size)}
                  >
                    {size}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* RAM */}
        {Array.isArray(props?.data?.productRam) && props.data.productRam.length > 0 && (
          <div className="productSize">
            <span>RAM :</span>
            <ul className="list list-style mb-0">
              {props.data.productRam.map((ram, index) => (
                <li className="list-inline-item" key={index}>
                  <Link
                    className={`tag ${activeRam === index ? 'active' : ''}`}
                    onClick={() => isActive(index, "ram", ram)}
                  >
                    {ram}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* WEIGHT */}
        {Array.isArray(props?.data?.productWeight) && props.data.productWeight.length > 0 && (
          <div className="productSize">
            <span>Weight :</span>
            <ul className="list list-style mb-0">
              {props.data.productWeight.map((weight, index) => (
                <li className="list-inline-item" key={index}>
                  <Link
                    className={`tag ${activeWeight === index ? 'active' : ''}`}
                    onClick={() => isActive(index, "weight", weight)}
                  >
                    {weight}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <p>Free Shipping (Est. Delivery Time 2-3 Days)</p>

        {/* Quantity */}
        <div className="quantity-wrapper">
          <div className="quant">
            <QuantityBox handleSelectQty={handleSelectQty} />
          </div>

          <Button
            className={`add-btn ${isAdded ? "added" : ""}`}
            disabled={isAdded}
            onClick={() =>
              !isAdded && addToCart(props?.data, context?.userData?._id, quantity)
            }
          >
            {isAdded ? "Added" : <><IoCartOutline /> Add to Cart</>}
          </Button>
        </div>

        <div className="detail-fea">
          <span className='wish link-color'><CiHeart className='svg'/> Add to Wishlist</span>
          <span className='wish link-color'><IoIosGitCompare className='svg'/> Add to Compare</span>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
