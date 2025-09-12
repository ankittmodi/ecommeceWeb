import React from 'react'
import './index.css';
import Button from '@mui/material/Button';
import { IoSearch } from "react-icons/io5";
const Search = () => {
  return (
    <div className="searchbox">
      <input type="text" name='search' placeholder='Search for products' />
      <Button><IoSearch/></Button>
    </div>
  )
}

export default Search;
