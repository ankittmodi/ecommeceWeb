import React, { useState } from 'react'
import './style.css'
import 'react-lazy-load-image-component/src/effects/blur.css';
import {Button} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
const AddSubCategory = () => {
    const [productCat, setproductCat] =useState('');
    const handleChange = (event) => {
        setproductCat(event.target.value);
    };
  return (
    <section className='add-product'>
        <form className='form'>
            <div className='scroll-form'>
                <div className='products sub-category'>
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
                        <h3>Sub Category Name</h3>
                        <input type='text' className='search'/>
                    </div>
                </div>
            </div>
            <br/>
            <Button type="button" className='header-btn'>Publish and View</Button>
        </form>

    </section>
  )
}

export default AddSubCategory
