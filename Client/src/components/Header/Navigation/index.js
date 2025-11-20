import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './index.css';
import Button from '@mui/material/Button';
import { RiMenu2Fill } from "react-icons/ri";
import { TfiAngleDown } from "react-icons/tfi";
import { IoRocketOutline } from "react-icons/io5";
import CategoryPanel from './CategoryPanel';
import MobileNav from './MobileNav';
import { myContext } from '../../../App';
import { useContext } from 'react';
import { fetchDataFromApi } from '../../../utils/Api';
const Navigation = () => {
  const [isopen,setisopen]=useState(false);
  const openCategoryPanel=()=>{
    setisopen(true);
  }
  const { windoWidth } = useContext(myContext); // ✅ consume context
  const context=useContext(myContext);
  return (
    <>
      <nav className="navbar">
      <div className="container">
        <div className="col1">
          <Button onClick={openCategoryPanel}><RiMenu2Fill className='icon'/>Shop by Categories <TfiAngleDown className='icon1'/></Button>
        </div>
        <div className="col2">
          <ul className="list-style">
            <li className="link-color">
              <Link to='/'>Home</Link>
            </li>
            {
              context.catData?.length!==0 && context.catData?.map((catItem,index)=>{
                return(
                  <>
                    <li className="link-color" key={index}>
                      <Link to='/productlisting'>{catItem?.name}</Link>
                      {
                        catItem?.children.length!==0 && 
                        <div className="submenu">
                        <ul className='sub-list'>
                        {
                          catItem?.children?.map((subCat,index)=>{
                            return(
                              <li className='list-none' key={index}>
                                <Link to='/productlisting'><Button>{subCat?.name}</Button></Link>
                                {
                                  subCat?.children?.length!==0 && 
                                  <div className='submenu1'>
                                    <ul className='sub-list'>
                                      {
                                        subCat?.children?.map((thirdCat,index)=>{
                                          return(
                                            <li className='list-none' key={index}>
                                              <Link><Button>{thirdCat?.name}</Button></Link>
                                            </li>
                                          )
                                        })
                                      }
                                    </ul>
                                  </div>
                                }
                              </li>
                            )
                          })
                        }
                          {/* <li className='list-none'>
                            <Link to='/productlisting'><Button>Men</Button></Link>
                          </li>
                          <li className='list-none'>
                            <Link to='/productlisting'><Button>Women</Button></Link>
                          </li>
                          <li className='list-none'>
                          <Link to='/productlisting'><Button>Kids</Button></Link>
                          </li>
                          <li className='list-none'>
                          <Link to='/productlisting'><Button>Girls</Button></Link>
                          </li>
                          <li className='list-none'>
                          <Link to='/productlisting'><Button>Boys</Button></Link>
                          </li> */}
                        </ul>
                      </div>
                      }
                    </li>
                  </>
                )
              })
            }
            
            {/* <li className="link-color">
              <Link to='/home'>Electronics</Link>
            </li>
            <li className="link-color">
              <Link to='/home'>Bags</Link>
              <div className="submenu">
                <ul className='sub-list'>
                  <li className='list-none'>
                    <Link to='/'><Button>Men</Button></Link>
                  </li>
                  <li className='list-none'>
                    <Link to='/'><Button>Women</Button></Link>
                  </li>
                  <li className='list-none'>
                  <Link to='/'><Button>Kids</Button></Link>
                  </li>
                  <li className='list-none'>
                  <Link to='/'><Button>Girls</Button></Link>
                  </li>
                  <li className='list-none'>
                  <Link to='/'><Button>Boys</Button></Link>
                  </li>
                </ul>
              </div>
            </li>
            <li className="link-color">
              <Link to='/home'>Groceries</Link>
            </li>
            <li className="link-color">
              <Link to='/home'>Footwear</Link>
              <div className="submenu">
                <ul className='sub-list'>
                  <li className='list-none'>
                    <Link to='/'><Button>Men</Button></Link>
                  </li>
                  <li className='list-none'>
                    <Link to='/'><Button>Women</Button></Link>
                  </li>
                  <li className='list-none'>
                  <Link to='/'><Button>Kids</Button></Link>
                  </li>
                  <li className='list-none'>
                  <Link to='/'><Button>Girls</Button></Link>
                  </li>
                  <li className='list-none'>
                  <Link to='/'><Button>Boys</Button></Link>
                  </li>
                </ul>
              </div>
            </li>
            <li className="link-color">
              <Link to='/home'>Beauty</Link>
            </li>
            <li className="link-color">
              <Link to='/home'>Welness</Link>
            </li> */}
          </ul>
        </div>
        <div className="col3">
          <p><IoRocketOutline className='icon'/>Free Delivery</p>
        </div>
      </div>
    </nav>

    {/* category panel */}
    {
      context?.catData?.length!==0 && 
      <CategoryPanel isopen={isopen} setisopen={setisopen}
        data={context.catData}
      />
    }
    
    {windoWidth<992 &&<MobileNav/>}
    
    </>
  )
}

export default Navigation;
