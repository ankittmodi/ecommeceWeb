import React,{useContext, useState} from 'react'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { RxCross2 } from "react-icons/rx";
import { GoTriangleDown } from "react-icons/go";
import { Link } from 'react-router-dom';
import { deleteData} from '../../utils/Api';
import { myContext } from '../../App';

const MyListItem = (props) => {
    const [sizeanchorEl, setsizeAnchorEl] = useState(null);
    const [selectSize, setselectSize] = useState(props.size);
    const [QtyanchorEl, setQtyAnchorEl] = useState(null);
    const [selectQty, setselectQty] = useState(props.qty);
    const openQty = Boolean(QtyanchorEl);
    const open = Boolean(sizeanchorEl);
    const context=useContext(myContext);

    const handleClick = (event) => {
      setsizeAnchorEl(event.currentTarget);
    };
    const handleClose = (value) => {
      setsizeAnchorEl(null);
      if(value!==null){
        setselectSize(value);
      }
      else{

      }
    };

    const handleClickQty = (event) => {
      setQtyAnchorEl(event.currentTarget);
    };
    const handleCloseQty = (value) => {
      setQtyAnchorEl(null);
      if(value!==null){
        setselectQty(value);
      }
      else{

      }
    };

  const removeItem=(id)=>{
    deleteData(`/api/myList/remove/${id}`).then((res)=>{
      if(!res?.error){
        context.openAlertBox("success","Item deleted from wishlist");
        context.getMyListData();
      }
    })
  }
  return (
    <>
      <div className="cart-item">
              <div className="img">
                <Link to={`/product/${props?.item?.productId}`} className='group'>
                <img src={props?.item?.image} alt=""/></Link>
              </div>
              <div className="info">
                <RxCross2 className='cross-icon' onClick={()=>removeItem(props?.item?._id)}/>
                <h6 style={{color:"#000"}}><Link to={`/product/${props?.item?.productId}`} className='link-color'>{props?.item?.brand}</Link></h6>
                <h3 style={{color:"#000"}}><Link to={`/product/${props?.item?.productId}`}>{props?.item?.productTitle.substr(0,80)+'...'}</Link></h3>
                <div>
                  {/* <Rating name="rating" value={props?.item?.rating || 0} readOnly className='list-rating'/> */}
                </div>
                <div className="size-dropdown">
                  <div className="relative">
                    <span className='span' onClick={handleClick}>size: {selectSize} <GoTriangleDown/></span>
                    <Menu
                      id="basic-menu"
                      anchorEl={sizeanchorEl}
                      open={open}
                      onClose={()=>handleClose(null)}
                      slotProps={{
                        list: {
                          'aria-labelledby': 'basic-button',
                        },
                      }}
                    >
                      <MenuItem onClick={()=>handleClose('Sm')}>Sm</MenuItem>
                      <MenuItem onClick={()=>handleClose('Md')}>Md</MenuItem>
                      <MenuItem onClick={()=>handleClose('Lg')}>Lg</MenuItem>
                      <MenuItem onClick={()=>handleClose('XL')}>XL</MenuItem>
                      <MenuItem onClick={()=>handleClose('XXL')}>XXL</MenuItem>
                    </Menu>
                  </div>
                  <div className="relative">
                    <span className='span' onClick={handleClickQty}>Qty: {selectQty} <GoTriangleDown/></span>
                    <Menu
                      id="basic-menu"
                      anchorEl={QtyanchorEl}
                      open={openQty}
                      onClose={()=>handleCloseQty(null)}
                      slotProps={{
                        list: {
                          'aria-labelledby': 'basic-button',
                        },
                      }}
                    >
                      <MenuItem onClick={()=>handleCloseQty('1')}>1</MenuItem>
                      <MenuItem onClick={()=>handleCloseQty('2')}>2</MenuItem>
                      <MenuItem onClick={()=>handleCloseQty('3')}>3</MenuItem>
                      <MenuItem onClick={()=>handleCloseQty('4')}>4</MenuItem>
                      <MenuItem onClick={()=>handleCloseQty('5')}>5</MenuItem>
                    </Menu>
                  </div>
                </div>
                <div className="price">
                  <span className="new-price"><strong>&#x20b9; {props?.item?.price}</strong></span>
                  <span className="old-price">&#x20b9; {props?.item?.oldPrice}</span>
                  <span className="new-price"><strong>{props?.item?.discount}%OFF</strong></span>
                </div>
                {/* <Button className='bg-org' onClick={()=>addToCart(props?.item?.productId)}>Add to Cart</Button> */}
              </div>
            </div>
    </>
  )
}

export default MyListItem
