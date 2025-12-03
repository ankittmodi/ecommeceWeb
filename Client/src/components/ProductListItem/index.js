import React, { useContext, useEffect, useState } from 'react'
import './style.css';
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import { FaRegHeart } from "react-icons/fa";
import { FaCodeCompare } from "react-icons/fa6";
import { MdOutlineZoomOutMap } from "react-icons/md";
import Tooltip from '@mui/material/Tooltip';
import { myContext } from '../../App';
import { IoIosHeart } from "react-icons/io";
import { postData } from '../../utils/Api';

const ProductListItem = (props) => {
  const context = useContext(myContext);

  const [isAddedList, setIsAddedList] = useState(false);

  useEffect(() => {
    const myListItem = context?.myListData?.filter(
      item => item.productId === props?.item?._id
    );

    if (myListItem?.length !== 0) {
      setIsAddedList(true);
    } else {
      setIsAddedList(false);
    }
  }, [context?.myListData]);

  const handleAddToMyList = (item) => {

    if (context.userData === null) {
      context.openAlertBox("error", "You are not login please login first");
      return;
    }

    const obj = {
      productId: item?._id,
      userId: context.userData?._id,
      productTitle: item?.name,
      image: item?.images?.[0],
      rating: item?.rating,
      price: item?.price,
      oldPrice: item?.oldPrice,
      brand: item?.brand,
      discount: item?.discount,
    };

    postData('/api/myList/add', obj).then((res) => {
      if (!res?.error) {
        context.openAlertBox("success", "Item added in wishlist");
        context.getMyListData();
        setIsAddedList(true);
      } else {
        context.openAlertBox("error", "Item already in wishlist");
      }
    });
  };

  return (
    <div className="image-wrap group">
      <div className="prod-detail1">
        <Link to={`/product/${props?.item?._id}`}>
          <div className="img-part1">
            <img src={props?.item?.images?.[0]} alt="" />
            {props?.item?.images?.[1] && (
              <img src={props?.item?.images?.[1]} alt="" className='top-img' />
            )}
          </div>
        </Link>

        {props?.item?.discount && (
          <span className='discount'>{props.item.discount}% OFF</span>
        )}

        <div className="actions">
          <Tooltip title="Zoom" placement="left-start">
            <Button className='btn-icon'
              onClick={() => context.handleOpenProductDetailsModel(true, props?.item)}>
              <MdOutlineZoomOutMap />
            </Button>
          </Tooltip>

          <Tooltip title="Wishlist" placement="left-start">
            <Button className='btn-icon' onClick={() => handleAddToMyList(props?.item)}>
              {isAddedList ? <IoIosHeart style={{ color: "green" }} /> : <FaRegHeart />}
            </Button>
          </Tooltip>

          <Tooltip title="Compare" placement="left-start">
            <Button className='btn-icon'><FaCodeCompare /></Button>
          </Tooltip>
        </div>

        <div className="infor">
          <h6>
            <Link to={`/product/${props?.item?._id}`} className='link-color'>
              {props?.item?.name?.substr(0, 60) + "..."}
            </Link>
          </h6>

          <Rating name="half-rating-read" defaultValue={props?.item?.rating} readOnly />

          <div className="price">
            <span className="old-price">₹ {props?.item?.oldPrice}</span>
            <span className="new-price"><strong>₹ {props?.item?.price}</strong></span>
          </div>

          <Button className='btn-icon'>Add to Cart</Button>
        </div>

      </div>
    </div>
  )
}

export default ProductListItem;
