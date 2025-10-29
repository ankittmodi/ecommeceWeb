import React, { useContext, useState } from 'react';
import './style.css';
import Button from '@mui/material/Button';
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { AiOutlineMenuFold } from "react-icons/ai";
import { IoNotificationsOutline, IoPersonOutline } from "react-icons/io5";
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import { MdManageAccounts } from "react-icons/md";
import { FiActivity } from "react-icons/fi";
import { PiSignOut } from "react-icons/pi";
import { MyContext } from '../../App';
import {Link, useNavigate} from 'react-router-dom';
import { fetchDataFromApi } from '../../utils/Api';

const Header = () => {
  // 🔹 Styled MUI badge
  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
      padding: '0 4px',
    },
  }));

  // 🔹 Menu state
  const [myAcc, setMyAcc] = useState(null);
  const open = Boolean(myAcc);
  const history=useNavigate();
  const context=useContext(MyContext);

  const handleClick = (event) => {
    setMyAcc(event.currentTarget);
  };

  const handleClose = () => {
    setMyAcc(null);
  };

  
  const logout = async () => {
    try {
      const res = await fetchDataFromApi("/api/user/logout", { withCredentials: true });
      if (res.success) {
        context.openAlertBox("success", res.message); // show success toast
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userName");
        localStorage.removeItem("userEmail");
        context.setIsLogin(false);
        history("/");
      } else {
        context.openAlertBox("error", res.message || "Logout failed");
      }
    } catch (error) {
      console.error("Logout failed", error);
      const msg = error.response?.data?.message || "Something went wrong";
      context.openAlertBox("error", msg); // show error toast
    }
  };
  return (
    <header className={`${context.isSidebarOpen===true?"header":"header-width"}`}>
      {/* LEFT SECTION */}
      <div className="part1">
        <Button className='menu-btn' onClick={() => context.setIsSidebarOpen(!context.isSidebarOpen)}>{context.isSidebarOpen===true?<AiOutlineMenuFold/>:<AiOutlineMenuUnfold/>}</Button>
      </div>

      {/* RIGHT SECTION */}
      <div className="part2 profile-part">
        <IconButton aria-label="notifications">
          <StyledBadge badgeContent={4} color="secondary">
            <IoNotificationsOutline />
          </StyledBadge>
        </IconButton>

        {
          context.isLogin===true ?<>
          <div className="avatar" onClick={handleClick}>
          <img src={localStorage.getItem("avatar")} alt="user" />
        </div>
        {/* Account Dropdown Menu */}
        <Menu
          anchorEl={myAcc}
          id="account-menu"
          open={open}
          onClose={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.2, // ✅ Slight spacing below avatar
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
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={handleClose} className='menu-item'>
            <div className="dropdown">
              <div className="avatar">
                <img src={localStorage.getItem("avatar")} alt="profile" />
              </div>
              <div className="info">
                <h3>{localStorage.getItem("userName")}</h3>
                <p>{localStorage.getItem("userEmail")}</p>
              </div>
            </div>
          </MenuItem>
          <Divider />
          <Link to='/profile'>
          <MenuItem onClick={handleClose} className='menu-item'>
            <span><IoPersonOutline /></span>
            <span>Profile</span>
          </MenuItem>
          </Link>
          {/* <MenuItem onClick={handleClose} className='menu-item'>
            <span><MdManageAccounts /></span>
            <span>Account Setting</span>
          </MenuItem>
          <MenuItem onClick={handleClose} className='menu-item'>
            <span><FiActivity /></span>
            <span>Activity Log</span>
          </MenuItem>
          <Divider /> */}
          
          <MenuItem onClick={handleClose} className='menu-item'>
            <span><PiSignOut /></span>
            <span onClick={logout}>Sign Out</span>
          </MenuItem>
        </Menu>
        </>
        :
        <Link to='/login'><Button className='admin-login'>Sign In</Button></Link>
        }
        
      </div>
    </header>
  );
};

export default Header;
