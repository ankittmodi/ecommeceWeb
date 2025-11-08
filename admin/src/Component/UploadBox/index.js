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
    const onChangeFile=async(e,apiEndPoint)=>{
      try{
        setPreviews([]);
        const files=e.target.files;
        setUploading(true);
        console.log(files);
        
        for(var i=0;i<files.length;i++){
          if(files[i] && (files[i].type==="image/jpeg" 
            ||files[i].type==="image/jpg" 
            ||files[i].type==="image/png" 
            ||files[i].type==="image/webp")){
              const file=files[i];
              selectedImages.push(file);
              formdata.append(props?.name,file);
  
              // callin api data
              uploadImage(apiEndPoint,formdata).then((res)=>{
                setUploading(false);
                props.setPreviewsFun(res?.data?.images);
                // console.log(res);
              })
          }
          else{
            context.openAlertBox("error","Please select a valid JPG,JPEG, or PNG image file. ");
            setUploading(false);
            return false;
          }
        }
      }catch(error){
        console.log(error);
      }
    }
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
