import React, { useContext, useEffect, useState } from 'react';
import './admin.css';
import Button from '@mui/material/Button';
import { FaCloudUploadAlt } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { IoWalletOutline } from "react-icons/io5";
import { BsBagCheck } from "react-icons/bs";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { MyContext} from '../../App';
import CircularProgress from '@mui/material/CircularProgress';
import { uploadImage } from '../../utils/Api';
const MyAccountSidebar = () => {
  const [previews,setPreviews]=useState([]);
  const [uploading,setUploading]=useState(false);
  const context=useContext(MyContext);
  // creating onchange for uploading avatar
  useEffect(() => {
    const userAvatar=[];
    if(context?.userData?.avatar!=="" && context?.userData?.avatar!==undefined){
      userAvatar.push(context.userData?.avatar);
      setPreviews(userAvatar);
    }
  }, [context?.userData]);
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
            formdata.append(`avatar`,file);

            // callin api data
            uploadImage("/api/user/user-avatar",formdata).then((res)=>{
              setUploading(false);
              let avatar=[];
              console.log(res?.data?.avatar);
              avatar.push(res?.data?.avatar);
              setPreviews(avatar);
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
    <div>
      <div className="card">
          <div className="card-item">
            <div className="img">
              {uploading===true?<CircularProgress color="inherit" size={40} />:<>
                {
                  previews.length!==0?previews.map((img,index)=>{
                    return (
                      <img src={img}
                      key={index} alt="" />
                    )
                  }):<img src="https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg"
                alt="" />
                }
              </>
              }
              {/* for image choosing from your choice */}
              <div className="overlay">
                <FaCloudUploadAlt/>
                <input type="file" className='file' accept='image/*' onChange={(e)=>onChangeFile(e,"/api/user/user-avatar")} name='avatar'/>
              </div>
            </div>
            {/* <h3>Ankit Kumar</h3> */}
            {/* after adding backend */}
            <h3>{context?.userData?.name}</h3>
            <p>{context?.userData?.email}</p>
          </div>
        </div>
    </div>
  )
}

export default MyAccountSidebar
