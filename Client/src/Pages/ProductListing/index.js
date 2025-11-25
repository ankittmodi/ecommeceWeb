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
import ProductLoading from '../../components/ProductLoading';
import { postData } from '../../utils/Api';

const ProductListing = () => {
  const[itemView,setItemView]=useState('grid');
  const [anchorEl, setAnchorEl] =useState(null);
  const open = Boolean(anchorEl);
  // for backend
  const[productData,setProductData]=useState([]);
  const[isLoading,setIsLoading]=useState(false);
  const[page,setPage]=useState(1);
  const[totalPages,setTotalPages]=useState(1);

  // for sortBy
  const[selectedSortBy,setSelectedSortBy]=useState("Name, A to Z");
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSortBy=(name,order,products,value)=>{
    setSelectedSortBy(value);
    postData('/api/product/sortBy',{
      products:products,
      sortBy:name,
      order:order,
    }).then((res)=>{
      setProductData(res);
      setAnchorEl(null);
    })
  }
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
            <Sidebar 
            productData={productData} 
            setProductData={setProductData} 
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            page={page}
            setTotalPages={setTotalPages}
            />
          </div>

          <div className="right-content">
            <div className="right-box">
              <div className="right-col1 itemViewAction">
                <Button className={`${itemView==='list' &&'active'}`} onClick={()=>setItemView('list')}><IoIosMenu/></Button>
                <Button className={`${itemView==='grid' &&'active'}`} onClick={()=>setItemView('grid')}><IoGridSharp/></Button>
                <span className='text-size'>
                There are {productData?.products?.length || 0} Products
              </span>

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
                    {selectedSortBy}
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
                    <MenuItem
                      onClick={()=>{
                        handleSortBy('name','asc',productData,'Name, A to Z');
                        handleClose();
                      }}
                    >
                      Name, A to Z
                    </MenuItem>
                    <MenuItem
                      onClick={()=>{
                        handleSortBy('name','desc',productData,'Name, Z to A');
                        handleClose();
                      }}
                    >
                      Name, Z to A
                    </MenuItem>
                    <MenuItem
                      onClick={()=>{
                        handleSortBy('price','asc',productData,'Price, low to high');
                        handleClose();
                      }}
                    >
                      Price, low to high
                    </MenuItem>
                    <MenuItem
                      onClick={()=>{
                        handleSortBy('price','desc',productData,'Price, high to low');
                        handleClose();
                      }}
                    >
                      Price, high to low
                    </MenuItem>
                    {/* <MenuItem onClick={handleClose}>Relevance</MenuItem>
                    <MenuItem onClick={handleClose}>Name: A to Z</MenuItem>
                    <MenuItem onClick={handleClose}>Name: Z to A</MenuItem>
                    <MenuItem onClick={handleClose}>Name: low to high</MenuItem>
                    <MenuItem onClick={handleClose}>Name: high to low</MenuItem> */}
                  </Menu>
                </div>
              </div>
            </div>
            <div className={`${itemView==='grid'?'right-prod':'list-prod'}`}>
            {
              itemView==='grid'?<>
              {
                isLoading===true?<ProductLoading view={itemView}/>:productData?.products?.length!==0 && productData?.products?.map((item,index)=>{
                  return(
                    <ProductItem key={index} item={item}/>
                  )
                })
              }
                {/* {[...Array(8)].map((_, i) => (
                <ProductItem key={i} />
              ))} */}
              </>:<>
              {/* {[...Array(8)].map((_, i) => (
                <ProductListItem key={i} />
              ))} */}
              {
                isLoading===true?<ProductLoading view={itemView}/>:productData?.products?.length!==0 && productData?.products?.map((item,index)=>{
                  return(
                    <ProductListItem key={index} item={item}/>
                  )
                })
              }
              </>
            }
              
            </div>

            {/* pagination */}
            {
              totalPages>1 &&
              <div className="pagination">
                <Pagination count={totalPages} 
                color="secondary"
                page={page}
                onChange={(e,value)=>setPage(value)}
                 />
              </div>
            }
            {/* <div className="pagination">
              <Pagination count={10} color="secondary" />
            </div> */}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductListing
