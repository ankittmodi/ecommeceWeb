import React, { useContext, useState } from 'react'
import './style.css';
import { FaRegImages } from "react-icons/fa";
import { MyContext } from '../../App';
import { uploadImage } from '../../utils/Api';
import CircularProgress from '@mui/material/CircularProgress';
const UploadBox = (props) => {
  const[previews,setPreviews]=useState([]);
  const[uploading,setUploading]=useState([]);
  const[isLoading,setIsLoading]=useState(false);
  const context=useContext(MyContext);
  let selectedImages=[];
    const formdata = new FormData();
    const onChangeFile = async (e, apiEndPoint) => {
  try {
    setUploading(true);
    const files = e.target.files;

    const formdata = new FormData();       // <-- move inside function

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (
        file.type === "image/jpeg" ||
        file.type === "image/jpg" ||
        file.type === "image/png" ||
        file.type === "image/webp"
      ) {
        formdata.append(props?.name, file);
      } else {
        context.openAlertBox("error", "Please select a valid image format");
        setUploading(false);
        return;
      }
    }

    // 🚀 Upload once
    const res = await uploadImage(apiEndPoint, formdata);
    props.setPreviewsFun(res?.data?.images);
    setUploading(false);

  } catch (error) {
    console.log(error);
    setUploading(false);
  }
};

  return (
    <div className='file'>
      {
        uploading===true?<CircularProgress color="inherit" size={20} />:<>
          <FaRegImages className='image'/>
          <h4>Image Upload</h4>
          <input type='file' accept='image/*' multiple={props.multiple!==undefined?props.multiple:false} className='file-upload'
            onChange={(e)=>onChangeFile(e,props?.url)} 
            name="images"
          />
        </>
      }
        
    </div>
  )
}

export default UploadBox
