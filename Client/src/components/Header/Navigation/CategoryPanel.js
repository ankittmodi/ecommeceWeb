import React, { useState } from 'react';
import './category.css';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { IoMdClose } from "react-icons/io";
import CategoryCollapse from '../../CategoryCollapse/CategoryCollapse';

const CategoryPanel = (props) => {

  const [submenuindex, setsubmenuindex] = useState(null);
  const [submenuindex1, setsubmenuindex1] = useState(null);

  const toggleDrawer = (newOpen) => () => {
    props.setisopen(newOpen);
  };

  const openSubmenu = (index) => {
    setsubmenuindex(submenuindex === index ? null : index);
    setsubmenuindex1(null);    // FIX: reset sub-submenu when switching
  };

  const openSubmenu1 = (index) => {
    setsubmenuindex1(submenuindex1 === index ? null : index);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" className='box'>
      <h3 className='heading'>
        Shop By Categories 
        <IoMdClose onClick={toggleDrawer(false)} className='cross'/>
      </h3>
      {
        props?.data?.length!==0 && <CategoryCollapse data={props?.data}/>
      }
      
    </Box>
  );

  return (
    <div>
      <Drawer open={props.isopen} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
};

export default CategoryPanel;
