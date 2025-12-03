import React, { useContext } from "react";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.jpg";
import Search from "../Search";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { LuGitCompareArrows } from "react-icons/lu";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { IoCartOutline, IoBagHandleOutline } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import Tooltip from "@mui/material/Tooltip";
import Navigation from "./Navigation";
import { myContext } from "../../App";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { fetchDataFromApi } from "../../utils/Api";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: "0 4px",
  },
}));

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const context = useContext(myContext);
  const { windoWidth, userData, isLogin } = context;
  const history=useNavigate();

  window.scrollTo(0,0);
const logout = async () => {
  setAnchorEl(null);

  try {
    const res = await fetchDataFromApi("/api/user/logout", { withCredentials: true });
    if (res.success) {
      context.openAlertBox("success", res.message); // show success toast
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userName");
      localStorage.removeItem("userEmail");
      context.setIsLogin(false);
      context.setUserData(null);
      context.setCartData([]);
      context.setMyListData([]);
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
    <header className="header1">
      <div className="top-strip">
        <div className="container">
          <div className="top-item">
            <div className="col1">
              <p className="text-size">
                Get up to 50% off new season styles, limited time offer
              </p>
            </div>
            <div className="col2">
              <ul className="list-style">
                <li className="link-color">
                  <Link to="/help-center">Help Center</Link>
                </li>
                <li>
                  <Link to="/order-tracking">Order tracking</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="header">
        <div className="container">
          <div className="col1">
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </div>

          <div className="col2">
            <Search />
          </div>

          <div className="col3">
            <ul className="list-style">
              {isLogin === false ? (
                <li>
                  <Link to="/login" className="link-color">
                    Login
                  </Link>{" "}
                  |{" "}
                  <Link to="/register" className="link-color">
                    Register
                  </Link>
                </li>
              ) : (
                <>
                  <Button className="myAccount" onClick={handleClick}>
                    <Button>
                      <FaRegUser />
                    </Button>
                    {windoWidth > 992 && (
                      <div className="info">
                        <h4>{userData?.name}</h4>
                        <span>{userData?.email}</span>
                      </div>
                    )}
                  </Button>

                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    slotProps={{
                      paper: {
                        elevation: 0,
                        sx: {
                          overflow: "visible",
                          filter:
                            "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                          mt: 1.5,
                          "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                          },
                          "&::before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                          },
                        },
                      },
                    }}
                    transformOrigin={{
                      horizontal: "right",
                      vertical: "top",
                    }}
                    anchorOrigin={{
                      horizontal: "right",
                      vertical: "bottom",
                    }}
                  >
                    <MenuItem className="menu-item">
                      <Link to="/myaccount">
                        <FaRegUser /> My account
                      </Link>
                    </MenuItem>
                    <MenuItem className="menu-item">
                      <Link to="/myorder">
                        <IoBagHandleOutline /> Orders
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={logout} className="menu-item">
                      <IoIosLogOut /> Logout
                    </MenuItem>
                  </Menu>
                </>
              )}

              {windoWidth > 992 && (
                <li>
                  <Tooltip title="Compare">
                    <IconButton aria-label="cart">
                      <StyledBadge badgeContent={4} color="secondary">
                        <LuGitCompareArrows className="header-icon" />
                      </StyledBadge>
                    </IconButton>
                  </Tooltip>
                </li>
              )}

              {windoWidth > 992 && (
                <li>
                  <Tooltip title="Wishlist">
                    <Link to='/mylist'>
                      <IconButton aria-label="cart">
                      <StyledBadge badgeContent={context?.myListData?.length} color="secondary">
                        <FaRegHeart className="header-icon" />
                      </StyledBadge>
                    </IconButton>
                    </Link>
                  </Tooltip>
                </li>
              )}

              <li>
                <Tooltip title="Cart">
                  <IconButton
                    aria-label="cart"
                    onClick={() => context.setOpenCart(true)}
                  >
                    <StyledBadge badgeContent={context?.cartData?.length} color="secondary">
                      <IoCartOutline className="header-icon" />
                    </StyledBadge>
                  </IconButton>
                </Tooltip>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* navigation bar */}
      <Navigation />
    </header>
  );
};

export default Header;
