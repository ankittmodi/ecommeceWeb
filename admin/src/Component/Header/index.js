import React, { useState } from 'react'
import './style.css';
import Button from '@mui/material/Button';
import { RiMenu2Fill } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import { IoPersonOutline } from "react-icons/io5";
import { MdManageAccounts } from "react-icons/md";
import { FiActivity } from "react-icons/fi";
import { PiSignOut } from "react-icons/pi";

const Header = () => {
  const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: '0 4px',
  },
}));

const [myAcc, setmyAcc] =useState(null);
  const open = Boolean(myAcc);
  const handleClick = (event) => {
    setmyAcc(event.currentTarget);
  };
  const handleClose = () => {
    setmyAcc(null);
  };
  return (
    <header className='header'>
      <div className="part1">
        <Button className='menu-btn'><RiMenu2Fill/></Button>
      </div>
      <div className="part2">
        {/* <Button className='menu-btn'><RiMenu2Fill/></Button> */}
        <IconButton aria-label="cart">
          <StyledBadge badgeContent={4} color="secondary">
            <IoNotificationsOutline/>
          </StyledBadge>
        </IconButton>
        <div className="avatar">
          <img src="https://mui.com/static/images/avatar/2.jpg" alt="" onClick={handleClick}/>
        </div>

        <Menu
        myAcc={myAcc}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose} className='menu-item'>
          <div className="dropdown">
            <div className="avatar">
              <img src="https://mui.com/static/images/avatar/2.jpg" alt="" />
            </div>
            <div className="info">
              <h3>Ankit Kumar</h3>
              <p>Ankit20302@gmail.com</p>
            </div>
          </div>
        </MenuItem>
        <Divider/>
        <MenuItem onClick={handleClose} className='menu-item'>
          <span><IoPersonOutline/></span>
          <span>Profile</span>
        </MenuItem>
        <MenuItem onClick={handleClose} className='menu-item'>
          <span><MdManageAccounts/></span>
          <span>Account Setting</span>
        </MenuItem>
        <MenuItem onClick={handleClose} className='menu-item'>
          <span><FiActivity/></span>
          <span>Activity Log</span>
        </MenuItem>
        <Divider/>
        <MenuItem onClick={handleClose} className='menu-item'>
          <span><PiSignOut/></span>
          <span>Sign Out</span>
        </MenuItem>
      </Menu>
      </div>
    </header>
  )
}

export default Header
