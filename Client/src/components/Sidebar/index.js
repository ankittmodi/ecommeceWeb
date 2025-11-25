import React, { useContext, useEffect, useState } from 'react'
import './style.css';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {Collapse} from 'react-collapse';
import Button from '@mui/material/Button';
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import Rating from '@mui/material/Rating';
import { myContext } from '../../App';
import { useLocation } from 'react-router-dom';
import { postData } from '../../utils/Api';
const Sidebar = (props) => {
  const[isOpenCollapse,setIsOpenCollapse]=useState(true);
  const[isOpenAvailabity,setIsOpenAvailabity]=useState(true);
  const[isOpenSize,setIsOpenSize]=useState(true);

  const[filters,setFilters]=useState({
    catId:[],
    subCatId:[],
    thirdsubCatId:[],
    minPrice:"",
    maxPrice:"",
    rating:"",
    page:1,
    limit:25
  })
  const[price,setPrice]=useState([0,90000]);
  const context=useContext(myContext);
  const location=useLocation();

  const handleCheckboxChange=(feild,value)=>{
    const currentValues=filters[feild] || [];
    const updatedValues=currentValues?.includes(value)?
    currentValues.filter((item)=>item!==value):[...currentValues,value];

    setFilters((prev)=>({
      ...prev,
      [feild]:updatedValues
    }))
    // console.log(filters)
    if(feild==="catId"){
      setFilters((prev)=>({
        ...prev,
        subCatId:[],
        thirdsubCatId:[]
      }))
    }
  }

  useEffect(()=>{
    const url=window.location.href;
    const queryParameter=new URLSearchParams(location.search);
    if(url.includes("catId")){
      const categoryId=queryParameter.get("catId");
      const catArr=[];
      catArr.push(categoryId);
      setFilters(prev=>({
        ...prev,
        catId: catArr,
        subCatId: [],
        thirdsubCatId: [],
        rating: []
      }))
    }
    if(url.includes("subCatId")){
      const subCategoryId=queryParameter.get("subCatId");
      const subCatArr=[];
      subCatArr.push(subCategoryId);
      filters.subCatId=subCatArr;
      filters.catId=[];
      filters.thirdsubCatId=[];
      filters.rating=[];
    }
    if(url.includes("thirdsubCatId")){
      const thirdCategoryId=queryParameter.get("thirdsubCatId");
      const thirdCatArr=[];
      thirdCatArr.push(thirdCategoryId);
      filters.thirdsubCatId=thirdCatArr;
      filters.catId=[];
      filters.subCatId=[];
      filters.rating=[];
    }

    setFilters((prev)=>({
      ...prev,
      page:1
    }))
    setTimeout(()=>{
      filtersData();
    },200)
  },[location]);

  const filtersData=()=>{
    props?.setIsLoading(true);
    postData('/api/product/filters',filters).then((res)=>{
      console.log(res);
      props.setProductData(res);
      props?.setIsLoading(false);
      props?.setTotalPages(res?.totalPages);
      window.scrollTo(0,0);
    })
  }

  useEffect(()=>{
    setFilters(prev=>({
      ...prev,
      page: props?.page
    }))
  },[props?.page]);

  useEffect(()=>{
    filtersData();
  },[filters]);

  useEffect(()=>{
    setFilters((prev)=>({
        ...prev,
        minPrice:price[0],
        maxPrice:price[1]
    }))
  },[price])
  return (
    <div className='sidebar ' style={{position:"sticky",top:"200px",zindex:'50'}}>
      <div className="sidebar-box">
        <h3 className='sidebar-heading'>Shop By Category <Button className='btn-icon' onClick={()=>setIsOpenCollapse(!isOpenCollapse)}>{
          isOpenCollapse===true?<IoIosArrowDown />:<IoIosArrowUp/>
        }</Button></h3>
        <Collapse isOpened={isOpenCollapse}>
        <div className="scroll">
        {
          context?.catData?.length!==0 && context?.catData?.map((cat,index)=>{
            return(
              <FormControlLabel key={index} 
              control={<Checkbox  />} 
              value={cat?._id} 
              label={cat?.name} 
              checked={filters?.catId?.includes(cat?._id)}
              onChange={()=>handleCheckboxChange('catId',cat?._id)}
              size="small" 
              className='check'/>
            )
          })
        }
            
            {/* <FormControlLabel control={<Checkbox  />} label="Electronics" className='check' size="small"/>
            <FormControlLabel control={<Checkbox  />} label="Bags" className='check' size="small"/>
            <FormControlLabel control={<Checkbox  />} label="Footwear" className='check' size="small"/>
            <FormControlLabel control={<Checkbox  />} label="Beauty" className='check' size="small"/>
            <FormControlLabel control={<Checkbox  />} label="Groceries" className='check' size="small"/>
            <FormControlLabel control={<Checkbox  />} label="Jewellery" className='check' size="small"/>
            <FormControlLabel control={<Checkbox  />} label="Wellness" className='check' size="small"/> */}
        </div>
        </Collapse>
      </div>
      <div className="sidebar-box">
        <h3 className='sidebar-heading'>Availability <Button className='btn-icon' onClick={()=>setIsOpenSize(!isOpenSize)}>{
          isOpenCollapse===true?<IoIosArrowDown />:<IoIosArrowUp/>
        }</Button></h3>
        <Collapse isOpened={isOpenSize}>
        <div className="scroll">
            <FormControlLabel control={<Checkbox  />} label="Available (17)" size="small" className='check'/>
            <FormControlLabel control={<Checkbox  />} label="In Stock (10)" size="small" className='check'/>
            <FormControlLabel control={<Checkbox  />} label="Not Available (1)" size="small" className='check'/>
        </div>
        </Collapse>
      </div>
      <div className="sidebar-box">
        <h3 className='sidebar-heading'>Size <Button className='btn-icon' onClick={()=>setIsOpenAvailabity(!isOpenAvailabity)}>{
          isOpenCollapse===true?<IoIosArrowDown />:<IoIosArrowUp/>
        }</Button></h3>
        <Collapse isOpened={isOpenAvailabity}>
        <div className="scroll">
            <FormControlLabel control={<Checkbox  />} label="Small (6)" size="small" className='check'/>
            <FormControlLabel control={<Checkbox  />} label="Medium (10)" size="small" className='check'/>
            <FormControlLabel control={<Checkbox  />} label="Large (8)" size="small" className='check'/>
            <FormControlLabel control={<Checkbox  />} label="XL (1)" size="small" className='check'/>
            <FormControlLabel control={<Checkbox  />} label="XXL (3)" size="small" className='check'/>

        </div>
        </Collapse>
      </div>
      <div className="sidebar-box">
        <h3 className='sidebar-heading title'>Filter by Price</h3>
        <RangeSlider value={price} 
          onInput={setPrice}
          min={100}
          max={90000}
          step={5}
        />
        <div className="price-range">
          <h5 className='text-size'>From: <strong>Rs:{price[0]}</strong></h5>
          <h5 className='text-size'>From: <strong>Rs:{price[1]}</strong></h5>
        </div>
      </div>
      <div className="sidebar-box">
        <h3 className='sidebar-heading title'>Filter by Rating</h3>
        <div className="rating">
          <FormControlLabel 
              control={<Checkbox  />} 
              value={5} 
              checked={filters?.rating?.includes(5)}
              onChange={()=>handleCheckboxChange('rating',5)}
              size="small" 
              sx={{
                "& .MuiRating-iconFilled": { color: "#ffeb3b" },
                "& .MuiRating-iconHover": { color: "#ffeb3b" }
              }}
          className='check'/>
          <Rating name="rating" 
          value={5} 
          size='small' 
          readOnly 
          className='rate'/>
          {/* <Rating name="size-small" defaultValue={4} size='small' readOnly className='rate'/>
          <Rating name="size-small" defaultValue={3} size='small' readOnly className='rate'/>
          <Rating name="size-small" defaultValue={2} size='small' readOnly className='rate'/>
          <Rating name="size-small" defaultValue={1} size='small' readOnly className='rate'/>*/}
        </div> 
        <div className="rating">
          <FormControlLabel 
              control={<Checkbox  />} 
              value={4} 
              checked={filters?.rating?.includes(4)}
              onChange={()=>handleCheckboxChange('rating',4)}
              size="small" 
          className='check'/>
          <Rating name="rating" 
          value={4} 
          size='small' 
          readOnly 
          className='rate'/>
        </div> 
        <div className="rating">
          <FormControlLabel 
              control={<Checkbox  />} 
              value={3} 
              checked={filters?.rating?.includes(3)}
              onChange={()=>handleCheckboxChange('rating',3)}
              size="small" 
          className='check'/>
          <Rating name="rating" 
          value={3} 
          size='small' 
          readOnly 
          className='rate'/>
        </div>
        <div className="rating">
          <FormControlLabel 
              control={<Checkbox  />} 
              value={2} 
              checked={filters?.rating?.includes(2)}
              onChange={()=>handleCheckboxChange('rating',2)}
              size="small" 
          className='check'/>
          <Rating name="rating" 
          value={2} 
          size='small' 
          readOnly 
          className='rate'/>
        </div>
        <div className="rating">
          <FormControlLabel 
              control={<Checkbox  />} 
              value={1} 
              checked={filters?.rating?.includes(1)}
              onChange={()=>handleCheckboxChange('rating',1)}
              size="small" 
          className='check'/>
          <Rating name="rating" 
          value={1} 
          size='small' 
          readOnly 
          className='rate'/>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
