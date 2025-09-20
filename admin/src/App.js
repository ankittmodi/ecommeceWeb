import './App.css';
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import Header from './Component/Header';
import Sidebar from './Component/Sidebar/Sidebar';
import Dashboard from './pages/Dashboard';
function App() {
  const router=createBrowserRouter([
    {
      path:'/',
      exact:true,
      element:(<>
        <section className="main">
          <Header/>
          <div className="content-main">
            <div className="sidebar-wrapper">
              <Sidebar/>
            </div>
            <div className="content-right">
              <Dashboard/>
            </div>
          </div>
        </section>
      </>)
    }
  ])
  return (
    <RouterProvider router={router}>
      
    </RouterProvider>
  );
}

export default App;
