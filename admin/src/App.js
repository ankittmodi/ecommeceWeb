import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React, { createContext, useEffect, useState } from 'react';
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
import toast, { Toaster } from 'react-hot-toast';
import Verify from './pages/Verify';
import ChangePassword from './pages/ChangePassword';
import { fetchDataFromApi } from './utils/Api';
import Profile from './pages/Profile';
import Address from './pages/Address';
import EditCategory from './pages/Category/editCategory';

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
    model:'',
    id:""
  });

  // user info states (persistent)
    const [userName, setUserName] = useState(localStorage.getItem("userName") || "");
    const [userEmail, setUserEmail] = useState(localStorage.getItem("userEmail") || "");
    const [userData, setUserData] = useState({
      name: localStorage.getItem("userName") || "",
      email: localStorage.getItem("userEmail") || "",
      avatar: localStorage.getItem("avatar") || ""
    });
    // for taking address from backend
    const[address,setAddress]=useState([]);
    const[catData,setCatData]=useState([]);

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
    // {
    //   path: '/forgot-password',
    //   element: <ForgotPassword />,
    // },
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
    {
      path: '/profile',
      element: (
        <section className="main">
          <Header />
          <div className="content-main">
            <div className={isSidebarOpen ? 'sidebar-wrapper' : 'sidebar-width'}>
              <Sidebar />
            </div>
            <div className={isSidebarOpen ? 'content-right' : 'content-left'}>
              <Profile/>
            </div>
          </div>
        </section>
      ),
    },
  ]);


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

  // for fetch data for category list
    useEffect(()=>{
      getCat();
    },[]);
    const getCat=()=>{
      fetchDataFromApi("/api/category").then((res)=>{
            // console.log(res);
            setCatData(res.data);
        })
    }
  const values = {
    isSidebarOpen,
    setIsSidebarOpen,
    isLogin,
    setIsLogin,
    isOpenFullScreen,
    setIsOpenFullScreen,
    openAlertBox,
    userData,
    setUserData,
    address,
    setAddress,
    catData,
    setCatData,
    getCat
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
        {
          isOpenFullScreen.model==="Add New Address" && <Address/>
        }
        {
          isOpenFullScreen.model==="Edit Category" && <EditCategory/>
        }
      </Dialog>

      <Toaster />
    </MyContext.Provider>
  );
}

export default App;
