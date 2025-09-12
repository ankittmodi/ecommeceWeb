import React, { useState } from 'react'
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
const Sidebar = () => {
  const[isOpenCollapse,setIsOpenCollapse]=useState(true);
  const[isOpenAvailabity,setIsOpenAvailabity]=useState(true);
  const[isOpenSize,setIsOpenSize]=useState(true);
  return (
    <div className='sidebar'>
      <div className="sidebar-box">
        <h3 className='sidebar-heading'>Shop By Category <Button className='btn-icon' onClick={()=>setIsOpenCollapse(!isOpenCollapse)}>{
          isOpenCollapse===true?<IoIosArrowDown />:<IoIosArrowUp/>
        }</Button></h3>
        <Collapse isOpened={isOpenCollapse}>
        <div className="scroll">
            <FormControlLabel control={<Checkbox  />} label="Fashion" size="small" className='check'/>
            <FormControlLabel control={<Checkbox  />} label="Electronics" className='check' size="small"/>
            <FormControlLabel control={<Checkbox  />} label="Bags" className='check' size="small"/>
            <FormControlLabel control={<Checkbox  />} label="Footwear" className='check' size="small"/>
            <FormControlLabel control={<Checkbox  />} label="Beauty" className='check' size="small"/>
            <FormControlLabel control={<Checkbox  />} label="Groceries" className='check' size="small"/>
            <FormControlLabel control={<Checkbox  />} label="Jewellery" className='check' size="small"/>
            <FormControlLabel control={<Checkbox  />} label="Wellness" className='check' size="small"/>
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
        <RangeSlider />
        <div className="price-range">
          <h5 className='text-size'>From: <strong>Rs:100</strong></h5>
          <h5 className='text-size'>From: <strong>Rs:5000</strong></h5>
        </div>
      </div>
      <div className="sidebar-box">
        <h3 className='sidebar-heading title'>Filter by Rating</h3>
        <div className="rating">
          <Rating name="size-small" defaultValue={5} size='small' readOnly className='rate'/>
          <Rating name="size-small" defaultValue={4} size='small' readOnly className='rate'/>
          <Rating name="size-small" defaultValue={3} size='small' readOnly className='rate'/>
          <Rating name="size-small" defaultValue={2} size='small' readOnly className='rate'/>
          <Rating name="size-small" defaultValue={1} size='small' readOnly className='rate'/>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
