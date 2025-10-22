import React from 'react'
import './style.css';
import { FaRegImages } from "react-icons/fa";
const UploadBox = (props) => {
  return (
    <div className='file'>
        <FaRegImages className='image'/>
        <h4>Image Upload</h4>
        <input type='file' multiple={props.multiple!==undefined?props.multiple:false} className='file-upload'/>
    </div>
  )
}

export default UploadBox
