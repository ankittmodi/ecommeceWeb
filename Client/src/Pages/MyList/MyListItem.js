import React,{useState} from 'react'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { RxCross2 } from "react-icons/rx";
import { GoTriangleDown } from "react-icons/go";
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
const MyListItem = (props) => {
    const [sizeanchorEl, setsizeAnchorEl] = useState(null);
    const [selectSize, setselectSize] = useState(props.size);
    const open = Boolean(sizeanchorEl);
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
    const [QtyanchorEl, setQtyAnchorEl] = useState(null);
    const [selectQty, setselectQty] = useState(props.qty);
    const openQty = Boolean(QtyanchorEl);
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
  return (
    <>
      <div className="cart-item">
              <div className="img">
                <Link to='/product/45875' className='group'>
                <img src="https://serviceapi.spicezgold.com/download/1742462383493_siril-georgette-brown-color-saree-with-blouse-piece-product-images-rvegeptjtj-1-202308161431.jpg" alt=""/></Link>
              </div>
              <div className="info">
                <RxCross2 className='cross-icon'/>
                <h6><Link to='/product/_id' className='link-color'>Koskii</Link></h6>
                <h3><Link to='/product/_id'>Floral Beads and Stones Pure Chiffon Saree</Link></h3>

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
                  <span className="new-price"><strong>Rs. 599</strong></span>
                  <span className="old-price">Rs. 999</span>
                  <span className="new-price"><strong>Rs. 50% OFF</strong></span>
                </div>
                <Button className='my-btn'>Add to Cart</Button>
              </div>
            </div>
    </>
  )
}

export default MyListItem
