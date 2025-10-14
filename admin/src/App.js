import './App.css';
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import Header from './Component/Header';
import Sidebar from './Component/Sidebar/Sidebar';
import Dashboard from './pages/Dashboard';
import { createContext, useState } from 'react';
import Login from './pages/Login';

export const MyContext = createContext();
function App() {
  const [isSidebarOpen,setIsSidebarOpen]=useState(true);
  const[isLogin,setIsLogin]=useState(false);
  const router=createBrowserRouter([
    {
      path:'/login',
      exact:true,
      element:(<>
        <section className="main">
          {/* <Header/>
          <div className="content-main">
            <div className={` ${isSidebarOpen===true?"sidebar-wrapper":"sidebar-width"}`}>
              <Sidebar/>
            </div>
            <div className={`content-right ${isSidebarOpen===true?"content-right":"content-left"}`}>
              <Dashboard/>
            </div>
          </div> */}
          <Login/>
        </section>
      </>)
    }
  ]);

  const values={
    isSidebarOpen,
    setIsSidebarOpen,
    isLogin,
    setIsLogin
  };
  return (
    <MyContext.Provider value={values}>
      <RouterProvider router={router}/>
    </MyContext.Provider>
  );
}

export default App;

