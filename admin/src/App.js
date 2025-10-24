import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React, { createContext, useState } from 'react';
import Header from './Component/Header';
import Sidebar from './Component/Sidebar/Sidebar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import Products from './pages/Products';
import AddProduct from './pages/Products/AddProduct';
import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import HomeSliderBanners from './pages/HomeSliderBanners';
import AddHomeSlide from './pages/HomeSliderBanners/AddHomeSlide';
import CategoryList from './pages/Category';
import AddCategorySlide from './pages/Category/AddCategorySlide';
import SubCatList from './pages/Category/SubCatList';
import AddSubCategory from './pages/Category/AddSubCategory';
import Users from './pages/Users';
import Order from './pages/Orders';
import ForgotPassword from './pages/ForgotPassword';
import toast, { Toaster } from 'react-hot-toast';
import Verify from './pages/Verify';
import ChangePassword from './pages/ChangePassword';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// Create Context
export const MyContext = createContext();

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const[isOpenFullScreen,setIsOpenFullScreen]=useState({
    open:false,
    model:''
  });
  // toast alert
  const openAlertBox = (status, msg) => {
    if (status === "success") toast.success(msg);
    if (status === "error") toast.error(msg);
  };

  // ✅ Define router properly
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <section className="main">
          <Header />
          <div className="content-main">
            <div className={isSidebarOpen ? 'sidebar-wrapper' : 'sidebar-width'}>
              <Sidebar />
            </div>
            <div className={isSidebarOpen ? 'content-right' : 'content-left'}>
              <Dashboard />
            </div>
          </div>
        </section>
      ),
    },
    {
      path: '/login',
      element: <Login />, // ✅ Login page only (no sidebar/header)
    },
    {
      path: '/signup',
      element: <SignUp />, // ✅ Signup page only (no sidebar/header)
    },
    {
      path: '/forgot-password',
      element: <ForgotPassword />,
    },
    {
      path: '/verify',
      element: <Verify />,
    },
    {
      path: '/change-password',
      element: <ChangePassword />,
    },
    {
      path: '/products',
      element: (
        <section className="main">
          <Header />
          <div className="content-main">
            <div className={isSidebarOpen ? 'sidebar-wrapper' : 'sidebar-width'}>
              <Sidebar />
            </div>
            <div className={isSidebarOpen ? 'content-right' : 'content-left'}>
              <Products />
            </div>
          </div>
        </section>
      ),
    },
    {
      path: '/homeSlider/list',
      element: (
        <section className="main">
          <Header />
          <div className="content-main">
            <div className={isSidebarOpen ? 'sidebar-wrapper' : 'sidebar-width'}>
              <Sidebar />
            </div>
            <div className={isSidebarOpen ? 'content-right' : 'content-left'}>
              <HomeSliderBanners/>
            </div>
          </div>
        </section>
      ),
    },
    {
      path: '/category/list',
      element: (
        <section className="main">
          <Header />
          <div className="content-main">
            <div className={isSidebarOpen ? 'sidebar-wrapper' : 'sidebar-width'}>
              <Sidebar />
            </div>
            <div className={isSidebarOpen ? 'content-right' : 'content-left'}>
              <CategoryList/>
            </div>
          </div>
        </section>
      ),
    },
    {
      path: '/subCategory/list',
      element: (
        <section className="main">
          <Header />
          <div className="content-main">
            <div className={isSidebarOpen ? 'sidebar-wrapper' : 'sidebar-width'}>
              <Sidebar />
            </div>
            <div className={isSidebarOpen ? 'content-right' : 'content-left'}>
              <SubCatList/>
            </div>
          </div>
        </section>
      ),
    },
    {
      path: '/users',
      element: (
        <section className="main">
          <Header />
          <div className="content-main">
            <div className={isSidebarOpen ? 'sidebar-wrapper' : 'sidebar-width'}>
              <Sidebar />
            </div>
            <div className={isSidebarOpen ? 'content-right' : 'content-left'}>
              <Users/>
            </div>
          </div>
        </section>
      ),
    },
    {
      path: '/order',
      element: (
        <section className="main">
          <Header />
          <div className="content-main">
            <div className={isSidebarOpen ? 'sidebar-wrapper' : 'sidebar-width'}>
              <Sidebar />
            </div>
            <div className={isSidebarOpen ? 'content-right' : 'content-left'}>
              <Order/>
            </div>
          </div>
        </section>
      ),
    },
    
  ]);

  const values = {
    isSidebarOpen,
    setIsSidebarOpen,
    isLogin,
    setIsLogin,
    isOpenFullScreen,
    setIsOpenFullScreen,
    openAlertBox
  };

  return (
    <MyContext.Provider value={values}>
      <RouterProvider router={router} />

      <Dialog
        fullScreen
        open={isOpenFullScreen.open}
        onClose={()=>setIsOpenFullScreen({open:false})}
        slots={{
          transition: Transition,
        }}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={()=>setIsOpenFullScreen({open:false})}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {/* Sound */}
              <sapn className="dailog-header">{isOpenFullScreen.model}</sapn>
            </Typography>
          </Toolbar>
        </AppBar>
        
        {
          isOpenFullScreen.model==="Add Product" && <AddProduct/>
        }
        {
          isOpenFullScreen.model==="Add Home Slide" && <AddHomeSlide/>
        }
        {
          isOpenFullScreen.model==="Add New Category" && <AddCategorySlide/>
        }
        {
          isOpenFullScreen.model==="Add New Sub Category" && <AddSubCategory/>
        }
      </Dialog>
    </MyContext.Provider>
  );
}

export default App;
