import React,{useState} from 'react'
import './style.css'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Rating from '@mui/material/Rating';
import UploadBox from '../../Component/UploadBox';
const AddProduct = () => {
    const [productCat, setproductCat] =useState('');
    const [productSubCat, setproductSubCat] =useState('');
    const [productFeatured, setproductFeatured] =useState('');
    const [productRam, setproductRam] =useState('');
    const [productWeight, setproductWeight] =useState('');
    const [productSize, setproductSize] =useState('');
    const handleChange = (event) => {
        setproductCat(event.target.value);
    };
    const handleProductSubCat = (event) => {
        setproductSubCat(event.target.value);
    };
    const handleIsFeatured=(event)=>{
        setproductFeatured(event.target.value);
    }
    const handleProductRam=(event)=>{
        setproductRam(event.target.value);
    }
    const handleProductWeight=(event)=>{
        setproductWeight(event.target.value);
    }
    const handleProductSize=(event)=>{
        setproductSize(event.target.value);
    }
  return (
    <section className='add-product'>
        <form className='form'>
            <div className='products'>
                <div className='col'>
                    <h3>Product Name</h3>
                    <input type='text' className='search'/>
                </div>
            </div>
            <div className='products'>
                <div className='col'>
                    <h3>Product Description</h3>
                    <textarea type='text' className='textarea'/>
                </div>
            </div>
            <div className='products product-grid'>
                <div className='col'>
                    <h3>Product Category</h3>
                    <Select
                    labelId="demo-simple-select-label"
                    id="productCatDrop"
                    value={productCat}
                    label="Category"
                    size='small'
                    onChange={handleChange}
                    className='productCat'
                    sx={{ width: '100%' }}
                    >
                    <MenuItem value={null}>None</MenuItem>
                    <MenuItem value={10}>Fashion</MenuItem>
                    <MenuItem value={20}>Beauty</MenuItem>
                    <MenuItem value={30}>Welness</MenuItem>
                    </Select>
                </div>
                <div className='col'>
                    <h3>Product Sub Category</h3>
                    <Select
                    labelId="demo-simple-select-label"
                    id="productCatDrop"
                    value={productSubCat}
                    label="Category"
                    size='small'
                    onChange={handleProductSubCat}
                    className='productCat'
                    sx={{ width: '100%' }}
                    >
                    <MenuItem value={null}>None</MenuItem>
                    <MenuItem value={10}>Fashion</MenuItem>
                    <MenuItem value={20}>Beauty</MenuItem>
                    <MenuItem value={30}>Welness</MenuItem>
                    </Select>
                </div>
                <div className='col'>
                    <h3>Product Price</h3>
                    <input type='number' className='search'/>
                </div>
                <div className='col'>
                    <h3>Product Old Price</h3>
                    <input type='number' className='search'/>
                </div>
            </div>
            <div className='products product-grid'>
                <div className='col'>
                    <h3>Product IsFeatured</h3>
                    <Select
                    labelId="demo-simple-select-label"
                    id="productCatDrop"
                    value={productFeatured}
                    label="Category"
                    size='small'
                    onChange={handleIsFeatured}
                    className='productCat'
                    sx={{ width: '100%' }}
                    >
                    <MenuItem value={10}>True</MenuItem>
                    <MenuItem value={20}>False</MenuItem>
                    </Select>
                </div>
                <div className='col'>
                    <h3>Product Stock</h3>
                    <input type='number' className='search'/>
                </div>
                <div className='col'>
                    <h3>Product Brand</h3>
                    <input type='text' className='search'/>
                </div>
                <div className='col'>
                    <h3>Product Discount</h3>
                    <input type='number' className='search'/>
                </div>
            </div>

            <div className='products product-grid'>
                <div className='col'>
                    <h3>Product Rams</h3>
                    <Select
                    labelId="demo-simple-select-label"
                    id="productCatDrop"
                    value={productRam}
                    label="Category"
                    size='small'
                    onChange={handleProductRam}
                    className='productCat'
                    sx={{ width: '100%' }}
                    >
                    <MenuItem value={"4GB"}>4 GB</MenuItem>
                    <MenuItem value={"6GB"}>6 GB</MenuItem>
                    <MenuItem value={"8GB"}>8 GB</MenuItem>
                    </Select>
                </div>
                <div className='col'>
                    <h3>Product Weight</h3>
                    <Select
                    labelId="demo-simple-select-label"
                    id="productCatDrop"
                    value={productWeight}
                    label="Category"
                    size='small'
                    onChange={handleProductWeight}
                    className='productCat'
                    sx={{ width: '100%' }}
                    >
                    <MenuItem value={""}>None</MenuItem>
                    <MenuItem value={10}>2KG</MenuItem>
                    <MenuItem value={20}>4kg</MenuItem>
                    <MenuItem value={30}>5KG</MenuItem>
                    <MenuItem value={40}>10kg</MenuItem>
                    </Select>
                </div>
                <div className='col'>
                    <h3>Product Size</h3>
                    <Select
                    labelId="demo-simple-select-label"
                    id="productCatDrop"
                    value={productSize}
                    label="Category"
                    size='small'
                    onChange={handleProductSize}
                    className='productCat'
                    sx={{ width: '100%' }}
                    >
                    <MenuItem value={""}>None</MenuItem>
                    <MenuItem value={'S'}>S</MenuItem>
                    <MenuItem value={'M'}>M</MenuItem>
                    <MenuItem value={'L'}>L</MenuItem>
                    <MenuItem value={'XL'}>XL</MenuItem>
                    <MenuItem value={'XXL'}>XXL</MenuItem>
                    </Select>
                </div>
                <div className='col'>
                    <h3>Rating</h3>
                    <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                </div>
            </div>

            <div className='upload col'>
                <h3>Media & Images</h3>
                <div className='upload-file'>
                    <div className='file'>
                        {/* <FaRegImages className='image'/> */}
                        <input type='file'className='file-upload'/>
                    </div>
                    <UploadBox multiple={true}/>
                </div>
            </div>
        </form>
    </section>
  )
}

export default AddProduct
