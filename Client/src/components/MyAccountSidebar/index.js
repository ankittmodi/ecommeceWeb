import React from 'react';
import './style.css';
import Button from '@mui/material/Button';
import { FaCloudUploadAlt } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { IoWalletOutline } from "react-icons/io5";
import { BsBagCheck } from "react-icons/bs";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { NavLink } from "react-router";
const MyAccountSidebar = () => {
  return (
    <div>
      <div className="card">
          <div className="card-item">
            <div className="img">
              <img src="https://up.yimg.com/ib/th/id/OIP.AlIScK6urTegkZ178dAAGgHaHa?pid=Api&rs=1&c=1&qlt=95&w=117&h=117" alt="" />
              {/* for image choosing from your choice */}
              <div className="overlay">
                <FaCloudUploadAlt/>
                <input type="file" className='file' />
              </div>
            </div>
            <h3>Ankit Kumar</h3>
            <p>ankitkumar@gmail.com</p>
          </div>

          <ul className="acc-list myAcctab">
            <li>
            <NavLink to='/myaccount' exact={true} activeClassName='isActive' className={({ isActive}) =>
            isActive ? "active navAc" : ""}>
            <Button><FaRegUser/> My Profile</Button></NavLink></li>
            <li>
            <NavLink to='/mylist' exact={true} activeClassName='isActive' className={({ isActive}) =>
            isActive ? "active navAc" : ""}>
            <Button><IoWalletOutline/> My List</Button></NavLink></li>
            <li>
            <NavLink to='/myorder' exact={true} activeClassName='isActive' className={({ isActive}) =>
            isActive ? "active navAc" : ""}>
            <Button><BsBagCheck/>My Orders</Button></NavLink></li>
            <li>
            <NavLink to='/logout' exact={true} activeClassName='isActive' className={({ isActive}) =>
            isActive ? "active navAc" : ""}>
            <Button><IoMdInformationCircleOutline/> Logout</Button></NavLink></li>
          </ul>
        </div>
    </div>
  )
}

export default MyAccountSidebar
