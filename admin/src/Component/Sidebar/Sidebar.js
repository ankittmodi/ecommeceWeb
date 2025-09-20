import React, { useState } from 'react'
import './sidebar.css';
import logo from '../../assests/logo.png';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { RiDashboardHorizontalLine } from "react-icons/ri";
import { FaImages } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { RiProductHuntLine } from "react-icons/ri";
import { TbCategory } from "react-icons/tb";
import { BsBagCheck } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { FaAngleDown } from "react-icons/fa6";
import {Collapse} from 'react-collapse';
const Sidebar = () => {
  const [submenu,setSubmenu]=useState(null);
  const isOpenSubMenu=(index)=>{
    if(submenu===index){
      setSubmenu(null);
    }
    else{
      setSubmenu(index);
    }
  }
  return (
    <div className='sidebar'>
      <div className="logo">
        <Link><img src={logo} alt="" className='logo-img'/></Link>
      </div>
      <ul className='sidebar-list'>
        <li><Link to=''><Button className='side-btn'  ><RiDashboardHorizontalLine/>Dashboard </Button></Link></li>
        <li><Link to='/users'><Button className='side-btn'><FiUsers/>Users </Button></Link></li>
        <li><Link to=''><Button className='side-btn'  onClick={()=>isOpenSubMenu(1)}><FaImages/>Home Slides <span className='angle'><FaAngleDown className={`angle-down ${submenu===1?'active':''}`}/></span></Button></Link>
        {/* submenu */}
        <Collapse isOpened={submenu===1?true:false}>
          <ul className='submenu'>
            <li className='sub-list'><Button className='sub-btn'><span className='sub-item'></span>Home Banner List</Button></li>
            <li className='sub-list'><Button className='sub-btn'><span className='sub-item'></span>Add Home Banner Slide</Button></li>
          </ul>
        </Collapse>
        </li>
        <li><Button className='side-btn'  onClick={()=>isOpenSubMenu(2)}><RiProductHuntLine/>Products<span className='angle'><FaAngleDown className={`angle-down ${submenu===2?'active':''}`}/></span></Button>
        {/* submenu */}
        <Collapse isOpened={submenu===2?true:false}>
          <ul className='submenu'>
            <li className='sub-list'><Link to='/products'><Button className='sub-btn'><span className='sub-item'></span>Product List</Button></Link></li>
            <li className='sub-list'><Link to='/product/upload'><Button className='sub-btn'><span className='sub-item'></span>Product Upload</Button></Link></li>
          </ul>
        </Collapse>
        </li>
        <li><Link to='/category'><Button className='side-btn'  onClick={()=>isOpenSubMenu(3)}><TbCategory/>Category <span className='angle'><FaAngleDown className={`angle-down ${submenu===3?'active':''}`}/></span></Button></Link>
        {/* submenu */}
        <Collapse isOpened={submenu===3?true:false}>
          <ul className='submenu'>
            <li className='sub-list'><Link to='categories'><Button className='sub-btn'><span className='sub-item'></span>Category List</Button></Link></li>
            <li className='sub-list'><Link to='category/add'><Button className='sub-btn'><span className='sub-item'></span>Add a Category</Button></Link></li>
            <li className='sub-list'><Link to='/category/subCat'><Button className='sub-btn'><span className='sub-item'></span>Sub Category List</Button></Link></li>
            <li className='sub-list'><Link to='/category/subCat/add'><Button className='sub-btn'><span className='sub-item'></span>Add a Sub Category</Button></Link></li>
          </ul>
        </Collapse>
        </li>
        <li><Button className='side-btn'><BsBagCheck/>Orders </Button></li>
        <li><Button className='side-btn'><FiLogOut/>Logout</Button></li>
      </ul>
    </div>
  )
}

export default Sidebar
