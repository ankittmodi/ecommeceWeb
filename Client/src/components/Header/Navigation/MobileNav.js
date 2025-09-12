import React from 'react'
import './index.css';
import Button from '@mui/material/Button';
import { IoHomeOutline } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaRegUser } from "react-icons/fa6";
import { IoBagHandleOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
const MobileNav = () => {
  return (
    <div className='mobile-nav'>
      <NavLink to='/' exact={true} activeClassName="isActive">
      <Button className='mobile-btn'><IoHomeOutline/><span>Home</span></Button></NavLink>
      <Button className='mobile-btn'><IoSearchOutline/><span>Search</span></Button>
      <NavLink to='/mylist' exact={true} activeClassName="isActive">
      <Button className='mobile-btn'>< IoMdHeartEmpty/><span>Wishlist</span></Button></NavLink>
      <NavLink to='/myorder' exact={true} activeClassName="isActive">
      <Button className='mobile-btn'><IoBagHandleOutline/><span>Orders</span></Button></NavLink>
      
      <NavLink to='/myaccount' exact={true} activeClassName="isActive"><Button className='mobile-btn'><FaRegUser/><span>Account</span></Button></NavLink>
    </div>
  )
}

export default MobileNav
