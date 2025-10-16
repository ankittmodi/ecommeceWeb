import React,{ useState } from 'react';
import './App.css';
import './index.css'
import './responsive.css';
import Header from './components/Header';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import Home from './Pages/Home'
import Footer from './components/Footer';
import ProductListing from './Pages/ProductListing';
import ProductDetails from './Pages/ProductDetails';
import Login from './Pages/Login';
import Register from './Pages/Register';
import { createContext } from 'react';
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
import { useEffect } from 'react';
// from react hot toast
import toast, { Toaster } from 'react-hot-toast';
import Verify from './Pages/Verify';
import ForgotPassword from './Pages/ForgotPassword';
import { fetchDataFromApi } from './utils/Api';


const myContext=createContext();
function App() {
  const [openProductDetailsModel, setOpenProductDetailsModel] = useState(false);
  const[fullWidth,setFullWidth]=useState(true);
  const[maxWidth,setMaxWidth]=useState('lg');
  const [openCart, setOpenCart] =useState(false); //cart panel
  const[isLogin,setIsLogin]=useState(false); //for checking if user logged in then account show user 
  // for adding username and email to home page by using backend
  // const [userName, setUserName] = useState(localStorage.getItem("userName") || "");
  // const [userEmail, setUserEmail] = useState(localStorage.getItem("userEmail") || "");
  const[userData,setUserData]=useState({});

  const[windoWidth,setWindoWidth]=useState(window.innerWidth);


  const handleCloseProductDetailsModel = () => {
    setOpenProductDetailsModel(false);
  }; 

  // cart panel
  const toggleCartPanel = (newOpen) => () => {
    setOpenCart(newOpen);
  };

  const openAlertBox=(status,msg)=>{
    if(status==="success"){
      toast.success(msg);
    }
    if(status==="error"){
      toast.error(msg);
    }
  }

  useEffect(()=>{
    const handleResize=()=>{
      setWindoWidth(window.innerWidth);
    };
    window.addEventListener("resize",handleResize);
    return()=>{
      window.removeEventListener("resize",handleResize);
    };
  },[]);
  useEffect(()=>{
    const token=localStorage.getItem('accessToken');
    if(token!==undefined && token!==null && token!==""){
      setIsLogin(true);

      fetchDataFromApi(`/api/user/user-details?token=${token}`).then((res)=>{
        console.log(res);
        setUserData(res.data);
      })
    }
    else{
      setIsLogin(false);
    }
  },[isLogin]);
  const values={
    setOpenProductDetailsModel,
    setOpenCart,
    toggleCartPanel,
    openCart,
    isLogin,
    setIsLogin,
    windoWidth,
    openAlertBox,
    // userName,
    // setUserName,
    // userEmail,
    // setUserEmail,
    userData,
    setUserData
  }
  return (
    <>
      <BrowserRouter>
    <myContext.Provider value={values}>
      <Header/>
      <Routes>
        <Route path={'/'} exact={true} element={<Home/> }/>
        <Route path={'/productlisting'} exact={true} element={<ProductListing/> }/>
        <Route path={'/product/:id'} exact={true} element={<ProductDetails/> }/>
        <Route path={'/login'} exact={true} element={<Login/> }/>
        <Route path={'/register'} exact={true} element={<Register/> }/>
        <Route path={'/verify'} exact={true} element={<Verify/>}/>
        <Route path={'/forgot-password'} exact={true} element={<ForgotPassword/>}/>
        <Route path={'/cart'} exact={true} element={<CartPage/> }/>
        <Route path={'/checkout'} exact={true} element={<Checkout/> }/>
        <Route path={'/myaccount'} exact={true} element={<MyAccount/> }/>
        <Route path={'/mylist'} exact={true} element={<MyList/> }/>
        <Route path={'/myorder'} exact={true} element={<Orders/> }/>
      </Routes>
      <Footer/>
          {/* toaster */}
          <Toaster/>
    </myContext.Provider>
    </BrowserRouter>

    <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={openProductDetailsModel}
        onClose={handleCloseProductDetailsModel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className='productDetailModel'
      >
        <DialogContent>
          <div className="model-box">
            <Button className='model-btn' onClick={handleCloseProductDetailsModel}><RxCross2/></Button>
            <div className="col1">
              <ZoomProduct/>
            </div>
            <div className="col2">
              <div className="col2-desc">
                <ProductDetail/>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default App;
export {myContext};