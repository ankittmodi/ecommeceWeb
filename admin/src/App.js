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
    // {
    //   path: '/products/upload',
    //   element: <AddProduct />, 
    // },
  ]);

  const values = {
    isSidebarOpen,
    setIsSidebarOpen,
    isLogin,
    setIsLogin,
    isOpenFullScreen,
    setIsOpenFullScreen
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
      </Dialog>
    </MyContext.Provider>
  );
}

export default App;
