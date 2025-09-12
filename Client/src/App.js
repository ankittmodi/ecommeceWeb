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

const myContext=createContext();
function App() {
  const [openProductDetailsModel, setOpenProductDetailsModel] = useState(false);
  const[fullWidth,setFullWidth]=useState(true);
  const[maxWidth,setMaxWidth]=useState('lg');
  const [openCart, setOpenCart] =useState(false); //cart panel
  const[isLogin,setIsLogin]=useState(true); //for checking if user logged in then account show user 

  const[windoWidth,setWindoWidth]=useState(window.innerWidth);


  const handleCloseProductDetailsModel = () => {
    setOpenProductDetailsModel(false);
  }; 

  // cart panel
  const toggleCartPanel = (newOpen) => () => {
    setOpenCart(newOpen);
  };

  useEffect(()=>{
    const handleResize=()=>{
      setWindoWidth(window.innerWidth);
    };
    window.addEventListener("resize",handleResize);
    return()=>{
      window.removeEventListener("resize",handleResize);
    };
  },[]);
  const values={
    setOpenProductDetailsModel,
    setOpenCart,
    toggleCartPanel,
    openCart,
    isLogin,
    setIsLogin,
    windoWidth,
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
        <Route path={'/cart'} exact={true} element={<CartPage/> }/>
        <Route path={'/checkout'} exact={true} element={<Checkout/> }/>
        <Route path={'/myaccount'} exact={true} element={<MyAccount/> }/>
        <Route path={'/mylist'} exact={true} element={<MyList/> }/>
        <Route path={'/myorder'} exact={true} element={<Orders/> }/>
      </Routes>
      <Footer/>
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