import React,{useState} from 'react'
import './style.css';
import Sidebar from '../../components/Sidebar';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import ProductItem from '../../components/ProductItem';
import Button from '@mui/material/Button';
import { IoGridSharp } from "react-icons/io5";
import { IoIosMenu } from "react-icons/io";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ProductListItem from '../../components/ProductListItem';
import Pagination from '@mui/material/Pagination';

const ProductListing = () => {
  const[itemView,setItemView]=useState('grid');
  const [anchorEl, setAnchorEl] =useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <section className='product-list'>
      <div className="container">
        <div role="presentation" onClick={handleClick}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/" className='link-color'>
              Home
            </Link>
            <Link underline="hover" color="inherit" href="/" className='link-color'>
              Fashion
            </Link>
            {/* <Typography sx={{ color: 'text.primary' }}>Breadcrumbs</Typography> */}
          </Breadcrumbs>
        </div>
      </div>
      <div className="product-group1">
        <div className="container product-group">
          <div className="sidebar-wrapper">
            <Sidebar/>
          </div>

          <div className="right-content">
            <div className="right-box">
              <div className="right-col1 itemViewAction">
                <Button className={`${itemView==='list' &&'active'}`} onClick={()=>setItemView('list')}><IoIosMenu/></Button>
                <Button className={`${itemView==='grid' &&'active'}`} onClick={()=>setItemView('grid')}><IoGridSharp/></Button>
                <span className='text-size'>There are 19 Products</span>
              </div>
              <div className="right-col2">
                <span className='text-size'>Sort By: </span>
                <div>
                  <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    className='btn-icon'
                  >
                    Sales, highest to lowest
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    slotProps={{
                      list: {
                        'aria-labelledby': 'basic-button',
                      },
                    }}
                  >
                    <MenuItem onClick={handleClose}>Sales, highest to lowest</MenuItem>
                    <MenuItem onClick={handleClose}>Relevance</MenuItem>
                    <MenuItem onClick={handleClose}>Name: A to Z</MenuItem>
                    <MenuItem onClick={handleClose}>Name: Z to A</MenuItem>
                    <MenuItem onClick={handleClose}>Name: low to high</MenuItem>
                    <MenuItem onClick={handleClose}>Name: high to low</MenuItem>
                  </Menu>
                </div>
              </div>
            </div>
            <div className={`${itemView==='grid'?'right-prod':'list-prod'}`}>
            {
              itemView==='grid'?<>
                {[...Array(8)].map((_, i) => (
                <ProductItem key={i} />
              ))}
              </>:<>{[...Array(8)].map((_, i) => (
                <ProductListItem key={i} />
              ))}</>
            }
              
            </div>

            {/* pagination */}
            <div className="pagination">
              <Pagination count={10} color="secondary" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductListing
