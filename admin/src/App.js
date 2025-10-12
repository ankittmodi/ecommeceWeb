import './App.css';
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import Header from './Component/Header';
import Sidebar from './Component/Sidebar/Sidebar';
import Dashboard from './pages/Dashboard';
import { createContext, useState } from 'react';

export const MyContext = createContext();
function App() {
  const [isSidebarOpen,setIsSidebarOpen]=useState(true);
  const router=createBrowserRouter([
    {
      path:'/',
      exact:true,
      element:(<>
        <section className="main">
          <Header/>
          <div className="content-main">
            <div className={` ${isSidebarOpen===true?"sidebar-wrapper":"sidebar-width"}`}>
              <Sidebar/>
            </div>
            <div className={`content-right ${isSidebarOpen===true?"content-right":"content-left"}`}>
              <Dashboard/>
            </div>
          </div>
        </section>
      </>)
    }
  ]);

  const values={
    isSidebarOpen,
    setIsSidebarOpen
  };
  return (
    <MyContext.Provider value={values}>
      <RouterProvider router={router}/>
    </MyContext.Provider>
  );
}

export default App;

