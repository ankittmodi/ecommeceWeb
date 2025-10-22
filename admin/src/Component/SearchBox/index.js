import React from 'react'
import './style.css';
import { CiSearch } from "react-icons/ci";
const SearchBox = () => {
  return (
    <div className='searchbar'>
        <CiSearch className='search-icon'/>
        <input type='text' className='search' placeholder='Search here ........'/>
    </div>
  )
}

export default SearchBox
