import React, { useState, useEffect, createContext } from 'react';
import './App.css';
import './index.css';
import './responsive.css';
import Header from './components/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Footer from './components/Footer';
import ProductListing from './Pages/ProductListing';
import ProductDetails from './Pages/ProductDetails';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import ZoomProduct from './components/ZoomProduct';
import Button from '@mui/material/Button';
import { RxCross2 } from "react-icons/rx";
import ProductDetail from './components/ProductDetail';
import CartPage from './Pages/CartPage';
import Checkout from './Pages/Checkout';
import MyAccount from './Pages/MyAccount';
import MyList from './Pages/MyList';
import Orders from './Pages/Orders';
import toast, { Toaster } from 'react-hot-toast';
import Verify from './Pages/Verify';
import ForgotPassword from './Pages/ForgotPassword';
import { fetchDataFromApi } from './utils/Api';

export const myContext = createContext();

function App() {
  const [openProductDetailsModel, setOpenProductDetailsModel] = useState(false);
  const [fullWidth] = useState(true);
  const [maxWidth] = useState('lg');
  const [openCart, setOpenCart] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  
  // user info states (persistent)
  const [userName, setUserName] = useState(localStorage.getItem("userName") || "");
  const [userEmail, setUserEmail] = useState(localStorage.getItem("userEmail") || "");
  const [userData, setUserData] = useState({
    name: localStorage.getItem("userName") || "",
    email: localStorage.getItem("userEmail") || ""
  });

  const [windoWidth, setWindoWidth] = useState(window.innerWidth);

  // close model
  const handleCloseProductDetailsModel = () => {
    setOpenProductDetailsModel(false);
  };

  // toggle cart panel
  const toggleCartPanel = (newOpen) => () => {
    setOpenCart(newOpen);
  };

  // toast alert
  const openAlertBox = (status, msg) => {
    if (status === "success") toast.success(msg);
    if (status === "error") toast.error(msg);
  };

  // handle window resize
  useEffect(() => {
    const handleResize = () => setWindoWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // fetch user details if token exists
 // App.js
useEffect(() => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    setIsLogin(true);

    // 💡 Fetch without the redundant ?token query parameter
    fetchDataFromApi(`/api/user/user-details`).then((res) => {
      // Handle success
      if (res.success) {
        setUserData(res.data);
        // console.log(res);
        setUserName(res.data.name);
        setUserEmail(res.data.email);
        localStorage.setItem("userName", res.data.name);
        localStorage.setItem("userEmail", res.data.email);
      } else {
        setIsLogin(false);
        localStorage.removeItem("accessToken");
      }
    }).catch(() => {
      // General error handling (e.g., network issues)
    });
  } else {
    setIsLogin(false);
    setUserData({ name: "", email: "" });
  }
}, []);

  // context values for global access
  const values = {
    setOpenProductDetailsModel,
    setOpenCart,
    toggleCartPanel,
    openCart,
    isLogin,
    setIsLogin,
    windoWidth,
    openAlertBox,
    userName,
    setUserName,
    userEmail,
    setUserEmail,
    userData,
    setUserData,
  };

  return (
    <>
      <BrowserRouter>
        <myContext.Provider value={values}>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/productlisting' element={<ProductListing />} />
            <Route path='/product/:id' element={<ProductDetails />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/verify' element={<Verify />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/cart' element={<CartPage />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/myaccount' element={<MyAccount />} />
            <Route path='/mylist' element={<MyList />} />
            <Route path='/myorder' element={<Orders />} />
          </Routes>
          <Footer />
          <Toaster />
        </myContext.Provider>
      </BrowserRouter>

      {/* Product details dialog */}
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={openProductDetailsModel}
        onClose={handleCloseProductDetailsModel}
        className='productDetailModel'
      >
        <DialogContent>
          <div className="model-box">
            <Button className='model-btn' onClick={handleCloseProductDetailsModel}><RxCross2 /></Button>
            <div className="col1"><ZoomProduct /></div>
            <div className="col2">
              <div className="col2-desc"><ProductDetail /></div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default App;
