import React,{useState} from 'react'
import './style.css';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { IoBagCheckOutline } from "react-icons/io5";
import ItemSize from './MyListItem';
import MyListItem from './MyListItem';
import MyAccountSidebar from '../../components/MyAccountSidebar';
const MyList = () => {
  const [sizeanchorEl, setsizeAnchorEl] = useState(null);
  const open = Boolean(sizeanchorEl);
  const handleClick = (event) => {
    setsizeAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setsizeAnchorEl(null);
  };
  return (
    <section className='my-list-part'>
      <div className="container">
        <div className="right-part">
          <MyAccountSidebar/>
        </div>
        <div className="left-part">
          <div className="cart-box">
          <h2>My Product List</h2>
          <p>There are <span>4</span> products in your List</p>
            <MyListItem />
            <MyListItem/>
            <MyListItem />
            <MyListItem/>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MyList
