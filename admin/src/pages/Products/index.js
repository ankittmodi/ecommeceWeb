import React,{useContext, useEffect, useState} from 'react'
import './style.css'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import ProgressBar from '../../Component/progressBar';
import { FiEdit3 } from "react-icons/fi";
import { IoEye } from "react-icons/io5";
import { MdOutlineDelete } from "react-icons/md";
import TooltipMUI from '@mui/material/Tooltip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import SearchBox from '../../Component/SearchBox';
import { MyContext } from '../../App';
import { deleteData, deleteMultipleData, fetchDataFromApi } from '../../utils/Api';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import CircularProgress from '@mui/material/CircularProgress';
import { MdOutlineCloudUpload } from "react-icons/md";
import Rating from '@mui/material/Rating';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } }; 
const columns = [
  { id: 'product', label: 'PRODUCT', minWidth: 150 },
  { id: 'category', label: 'CATEGORY', minWidth: 100 },
  {
    id: 'subcategory',
    label: 'SUB CATEGORY',
    minWidth: 150,
  },
  {
    id: 'price',
    label: 'PRICE',
    minWidth: 130,
  },
  {
    id: 'sales',
    label: 'SALES',
    minWidth: 130,
  },
  {
    id: 'rating',
    label: 'Rating',
    minWidth: 130,
  },
  {
    id: 'action',
    label: 'Action',
    minWidth: 130,
  },
];
const Products = () => {
    const [formFeilds,setFormfeilds]=useState({
                name:"",
                description:"",
                images:[],
                brand:"",
                price:"",
                oldPrice:"",
                catName:"",
                category:"",
                catId:"",
                subCatId:"",
                subCatName:"",
                thirdsubCat:"",
                thirdsubCatId:"",
                countInStock:"",
                rating:"",
                isFeatured:false,
                discount:"",
                productRam:[],
                size:[],
                productWeight:[],
                dateCreated:"",
            });
    const [page, setPage] =useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [productCat, setproductCat] =useState('');
    const [productSubCat, setproductSubCat] =useState('');
    const [productThirdLevelCat, setproductThirdLevelCat] =useState('');
    const[productData,setProductData]=useState([]);
    const[sortedIds,setSortedIds]=useState([]);
    const[isLoading,setIsLoading]=useState(false);
    const context=useContext(MyContext);

    useEffect(()=>{
        getProducts();
    },[context.isOpenFullScreen])

    useEffect(()=>{
      fetchDataFromApi("/api/product/getAllProducts").then((res)=>{
        console.log(res);
        let productArr=[];
            if(!res.error){
                for(let i=0;i<res?.products?.length;i++){
                  productArr[i]=res?.products[i];
                  productArr[i].checked=false;
                }
                setProductData(productArr);
            }
      })
    },[]);

    const handleSelectAll=(e)=>{
      const isChecked=e.target.checked;
      const updateItems=productData.map((item)=>({
        ...item,
        checked:isChecked
      }));
      setProductData(updateItems);

      if(isChecked){
        const ids=updateItems.map((item)=>item._id).sort((a,b)=>a-b);
        setSortedIds(ids);
      }
      else{
        setSortedIds([]);
      }
    }

    const handleCheckBoxChange=(e,id,index)=>{
      const updatedItems=productData.map((item)=>
      item._id===id?{...item,checked:!item.checked}:item);
      setProductData(updatedItems);

      const selectIds=updatedItems
      .filter((item)=>item.checked)
      .map((item)=>item._id)
      .sort((a,b)=>a-b);
      setSortedIds(selectIds);
    }

    const getProducts=()=>{
      setIsLoading(true);
        fetchDataFromApi("/api/product/getAllProducts").then((res)=>{
            let productArr=[];
            if(!res.error){
                for(let i=0;i<res?.products?.length;i++){
                  productArr[i]=res?.products[i];
                  productArr[i].checked=false;
                }
                setTimeout(()=>{
                  setProductData(productArr);
                  setIsLoading(false);
                },500);
            }
        });
    }

    const deleteProduct=(id)=>{
        deleteData(`/api/product/${id}`).then((res)=>{
            getProducts();
            context.openAlertBox("success","Product deleted !")
        })
        .catch(err => {
            console.error("Deletion Failed:", err);
            context.openAlertBox("error", "Failed to delete product due to connection error."); 
        });
    }

    const handleDeleteMultipleProducts = async () => {
      if (sortedIds?.length === 0) {
        context.openAlertBox("error", "Please select items to delete");
        return;
      }

      try {
        const res = await deleteMultipleData(`/api/product/deleteMultiple`, {
          ids: sortedIds,
        });
        console.log(res.data);
        getProducts();
        context.openAlertBox("success", "Selected products deleted!");
      } catch (err) {
        console.error(err);
        context.openAlertBox("error", "Error deleting items");
      }
    };

    const handleChange = (event) => {
        const id = event.target.value;
        const catObj = context.catData?.find(cat => cat._id === id);
        setIsLoading(true);
        setproductCat(id);
        setproductSubCat('');
        setproductThirdLevelCat('');
        setFormfeilds(prev => ({
            ...prev,
            catId: id,
            catName: catObj?.name || "",
            category: id,
            subCatId: "",
            subCat: "",
            thirdsubCatId: "",
            thirdsubCat: ""
        }));
        fetchDataFromApi(`/api/product/getAllProductsByCatId/${id}`).then((res)=>{
          if(!res.error){
            setProductData(res?.products);
            setTimeout(()=>{
              setIsLoading(false);
            },500);
          }
        })
    };

    const handleProductSubCat = (event) => {
    const id = event.target.value;
    setIsLoading(true);
    setproductSubCat(id);
    setproductCat('');
    setproductThirdLevelCat('');
    let subCat = "";

    for (let cat of context.catData || []) {
        if (cat?.children) {
            const sub = cat.children.find(s => s._id === id);
            if (sub) {
                subCat = sub.name;
                break;
            }
        }
    }

    setFormfeilds(prev => ({
        ...prev,
        subCatId: id,
        subCat: subCat,
        thirdsubCatId: "",
        thirdsubCat: ""
    }));

    fetchDataFromApi(`/api/product/getAllProductsBySubCatId/${id}`).then((res)=>{
          if(!res.error){
            setProductData(res.products);
            setTimeout(()=>{
              setIsLoading(false);
            },500);
          }
    })
};

const handleProductThirdLevelCat = (event) => {
    const id = event.target.value;
    setIsLoading(true);
    setproductThirdLevelCat(id);
    setproductCat('');
    setproductSubCat('');
    let thirdName = "";

    for (let cat of context.catData || []) {
        if (cat?.children) {
            for (let sub of cat.children) {
                if (sub?.children) {
                    const third = sub.children.find(t => t._id === id);
                    if (third) {
                        thirdName = third.name;
                        break;
                    }
                }
            }
        }
    }

    setFormfeilds(prev => ({
        ...prev,
        thirdsubCatId: id,
        thirdsubCat: thirdName
    }));

    fetchDataFromApi(`/api/product/getAllProductsBythirdSubCatId/${id}`).then((res)=>{
          if(!res.error){
            setProductData(res.products);
            setTimeout(()=>{
              setIsLoading(false);
            },500);
          }
    })
};

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <>
    <div className='product-table'>
          <h2>Products (material ui)</h2>
          <div className='product-btns'>
            
            <Button className='product-btn'>Export</Button>
            <Button className='product-btn' onClick={()=>context.setIsOpenFullScreen({
                open:true,
                model:'Add Product'
            })}>Add Product</Button>
            {
              sortedIds?.length!==0 && <Button className='product-btn' style={{background:"red",color:"#fff"}} onClick={handleDeleteMultipleProducts}>Delete</Button>
            }
          </div>
    </div>
    <div className='tables-card product-card' style={{paddingTop:"1.5rem"}}>
        <div className='dropdown'>
            <div className='column'>
              <h4>Category By</h4>
                {
                  context.catData?.length>0 &&
                    <Select
                      value={productCat}
                      size='small'
                      onChange={handleChange}
                      className='productCat'
                      sx={{ width: '86%' }}
                    >
                  {
                    context.catData?.map((cat)=>(
                        <MenuItem key={cat._id} value={cat._id}>{cat.name}</MenuItem>
                    ))
                  }
                  </Select>
                }
            </div>
            <div className='column'>
              <h4>Sub Category By</h4>
                {
                    context.catData?.length>0 &&
                        <Select
                            value={productSubCat}
                            size='small'
                            onChange={handleProductSubCat}
                            className='productCat'
                            sx={{ width: '86%' }}
                        >
                        {
                            context.catData?.map(cat =>
                                cat?.children?.length>0 &&
                                cat.children.map(subCat => (
                                    <MenuItem key={subCat._id} value={subCat._id}>{subCat.name}</MenuItem>
                                ))
                            )
                        }
                        </Select>
                }
            </div>
            <div className='column'>
              <h4>Third Level Category By</h4>
                {
                    context.catData?.length>0 &&
                        <Select
                            value={productThirdLevelCat}
                            size='small'
                            onChange={handleProductThirdLevelCat}
                            className='productCat'
                            sx={{ width: '86%' }}
                        >
                        {
                            context.catData?.map(cat =>
                                cat?.children?.length>0 &&
                                    cat.children.map(subCat =>
                                        subCat?.children?.length>0 &&
                                            subCat.children.map(thirdCat => (
                                                <MenuItem key={thirdCat._id} value={thirdCat._id}>{thirdCat.name}</MenuItem>
                                            ))
                                    )
                            )
                        }
                        </Select>
                }
            </div>
            <div className='column2'>
              <SearchBox/>
            </div>
        </div>
        <br/>
        <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox {...label} size="small" 
                onClick={handleSelectAll}
                  checked={productData?.length>0 ? productData.every((item)=>item.checked):false}
                />
              </TableCell>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
          {
            productData?.length!==0 ?
            <>
              {
                isLoading===false && productData?.length!==0 && productData?.slice(page*rowsPerPage,
            page*rowsPerPage+rowsPerPage).map((product)=>(
                <TableRow key={product._id}>
              <TableCell>
                <Checkbox {...label} size="small" 
                checked={product.checked===true?true:false}
                  onChange={(e)=>handleCheckBoxChange(e,product._id)}
                />
              </TableCell>
              <TableCell>
                <div className='body-flex'>
                    <div className='body-img'>
                      <Link to={`/product/${product?._id}`}><LazyLoadImage alt='image' effect='blur' src={product?.images?.[0]}/></Link>
                    </div>
                    <div className='body-info'>
                      <h3><Link to={`/product/${product?._id}`}>{product?.name}</Link></h3>
                      <p className='pro-para'>{product?.description}</p>
                    </div>
                  </div>
              </TableCell>
              <TableCell>
                {product?.catName}
              </TableCell>
              <TableCell>
                {product?.subCat}
              </TableCell>
              <TableCell>
                <p className='pro-para'>₹ {product?.price}</p>
                <p className='pro-para pro-para1'>₹ {product?.oldPrice}</p>
              </TableCell>
              <TableCell>
                <p className="progress-bar pro-para">{product?.sale} Sale</p>
              </TableCell>
              <TableCell>
                <Rating defaultValue={product?.rating} size='small' />
              </TableCell>
              <TableCell>
                <div className='dash-btns'>
                    <TooltipMUI title="Edit" onClick={()=>context.setIsOpenFullScreen({
                    open:true,
                    model:"Edit Product",
                    id:product._id
                })}><Button className='dash-btn'><FiEdit3 /></Button></TooltipMUI>
                    <Link to={`/product/${product._id}`}><TooltipMUI title="View"><Button className='dash-btn'><IoEye /></Button></TooltipMUI></Link>
                    <TooltipMUI title="Delete"><Button className='dash-btn' onClick={()=>deleteProduct(product._id)}><MdOutlineDelete /></Button></TooltipMUI>
                  </div>
              </TableCell>
            </TableRow>
              ))
              }
            </>
            :
            <>
              <TableRow>
                <TableCell colSpan={8}>
                  <div className='product-loader'>
                    <CircularProgress color="inherit"/>
                  </div>
                </TableCell>
              </TableRow>
            </>
          }
            
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={productData?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      </div> 
    </>
  )
}

export default Products;
