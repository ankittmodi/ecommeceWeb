import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import { FaRegPlusSquare } from "react-icons/fa";
import { FaRegSquareMinus } from "react-icons/fa6";
// import Button from '@mui/material/Button';
const CategoryList = (props) => {
  const[submenuindex,setsubmenuindex]=useState(null);
    const[submenuindex1,setsubmenuindex1]=useState(null);
  
    const openSubmenu=(index)=>{
      if(submenuindex===index){
        setsubmenuindex(null);
      }
      else{
        setsubmenuindex(index);
      }
    }
  
    const openSubmenu1=(index)=>{
      if(submenuindex1===index){
        setsubmenuindex1(null);
      }
      else{
        setsubmenuindex1(index);
      }
    }
  return (
    <>
      <div className="scroll">
      <ul className="list-style list1">
        <li>
          <Link to='/'>Fashion</Link>
          {/* <FaRegPlusSquare className='icon' onClick={()=>openSubmenu(0)}/> */}
          {
            submenuindex===0?(
              <FaRegSquareMinus className='icon' onClick={()=>{
            openSubmenu(0);
            }}/>
            ):(<FaRegPlusSquare className='icon' onClick={()=>{
            openSubmenu(0);
          }}/>
          )}
        {
          submenuindex===0 &&(
          <ul className="submenu">
          <li >
          <Link to='/'>Apparel</Link>
          {/* <FaRegPlusSquare className='icon' onClick={()=>{
            openSubmenu1(0);
          }}/> */}
          {
            submenuindex1===0?(
              <FaRegSquareMinus className='icon' onClick={()=>{
            openSubmenu1(0);
            }}/>
            ):(<FaRegPlusSquare className='icon' onClick={()=>{
            openSubmenu1(0);
          }}/>
          )}
            {
              submenuindex1===0 &&(
                <ul className="submenu1">
              <li >
              <Link to='/'>Smart tablet</Link>
              </li>
              <li >
              <Link to='/'>Crepe T-Shirt</Link>
              </li>
              <li >
              <Link to='/'>Leather Watch</Link>
              </li>
            </ul>
              )
            }
          </li>
        </ul>
        )}
        </li>
        <li>
          <Link to='/'>Fashion</Link>
          {/* <FaRegPlusSquare className='icon' onClick={()=>openSubmenu(0)}/> */}
          {
            submenuindex===1?(
              <FaRegSquareMinus className='icon' onClick={()=>{
            openSubmenu(1);
            }}/>
            ):(<FaRegPlusSquare className='icon' onClick={()=>{
            openSubmenu(1);
          }}/>
          )}
        {
          submenuindex===1 &&(
          <ul className="submenu">
          <li >
          <Link to='/'>Apparel</Link>
          {/* <FaRegPlusSquare className='icon' onClick={()=>{
            openSubmenu1(0);
          }}/> */}
          {
            submenuindex1===1?(
              <FaRegSquareMinus className='icon' onClick={()=>{
            openSubmenu1(1);
            }}/>
            ):(<FaRegPlusSquare className='icon' onClick={()=>{
            openSubmenu1(1);
          }}/>
          )}
            {
              submenuindex1===1 &&(
                <ul className="submenu1">
              <li >
              <Link to='/'>Smart tablet</Link>
              </li>
              <li >
              <Link to='/'>Crepe T-Shirt</Link>
              </li>
              <li >
              <Link to='/'>Leather Watch</Link>
              </li>
            </ul>
              )
            }
          </li>
        </ul>
        )}
        </li>
      </ul>
    </div>
    </>
  )
}

export default CategoryList
