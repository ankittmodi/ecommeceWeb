
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import HomeSliderModel from "../models/homeSlider.model.js";

cloudinary.config({
  cloud_name: process.env.cloudinary_Config_cloud_name,
  api_key: process.env.cloudinary_Config_cloud_api_key,
  api_secret: process.env.cloudinary_Config_cloud_api_secret,
  secure: true,
});

var imagesArr = [];
export async function uploadImages(req, res) {
  try {
    imagesArr = [];
    const image = req.files;

    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: false,
    };

    for (let i = 0; i < image?.length; i++) {
      const result = await cloudinary.uploader.upload(image[i].path, options);

      imagesArr.push(result.secure_url);

      // Delete local file immediately after upload
      fs.unlinkSync(`uploads/${req.files[i].filename}`);
    }

    return res.status(200).json({
      images: imagesArr,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      error: true,
      success: false,
    });
  }
}

export default uploadImages;

export async function addHomeSlider(req,res){
  try{
    let slide=new HomeSliderModel({
      images:imagesArr,
    });
    if(!slide){
      res.status(500).json({
        message:"slide not added",
        error:true,
        success:false
      })
    }
    slide=await slide.save();

    imagesArr=[];
    return res.status(200).json({
        message:"Slide created successfully",
        error:false,
        success:true,
        slide:slide
      })
  }catch(err){
    return res.status(400).json({
      message: err.message,
      error: true,
      success: false,
    });
  }
}

export async function getHomeSlide(req,res){
  try{
    const slides=await HomeSliderModel.findd();

    if(!slides){
        return res.status(404).json({
      message:"Slides not found",
      error: true,
      success: false,
    });
    }
    return res.status(200).json({
      error: false,
      success: true,
      data:slides
    });
  }catch(err){
    return res.status(500).json({
      message: err.message,
      error: true,
      success: false,
    });
  }
}

export async function getSlide(req,res){
  try{
    const slide=await HomeSliderModel.findById(req.params.id);
    if(!slide){
      res.status(404).json({
        message:"The Slide with the given Id was not found.",
        error:true,
        success:false
      });
    }

    return res.status(200).json({
      error:false,
      success:true,
      slide:slide
    })
  }catch(err){
    return res.status(500).json({
      message:err.message,
      err:true,
      success:false
    })
  }
}

export async function removeSlideImage(req,res){
  const imgUrl=req.query.img;
  // "https://res.cloudinary.com/dtlhmmcer/image/upload/v1758021182/1758021178101_ankitphoto.jpg"  ye is tarah se lega urlArr
  const urlArr=imgUrl.split("/");
  // ["https:","res.cloudinary.com","dtlhmmcer","image","upload","v1758021182","1758021178101_ankitphoto.jpg"] ye neeche wala array is tarah se lega
  const image=urlArr[urlArr.length-1];
  const imageName=image.split(".")[0];
  if(imageName){
    const result=await cloudinary.uploader.destroy(
    imageName,
    (error,result)=>{

    }
  );
  if(result){
    return res.status(200).json({
      err:false,
      success:true,
      message:"Image deleted successfully "
    });
  }
  }
}

export async function deleteSlide(req, res) {
  try {
    const slide = await HomeSliderModel.findById(req.params.id);
    if (!slide) {
      return res.status(404).json({
        message: "slide not found!",
        error: true,
        success: false
      });
    }

    // 🖼️ Delete images from Cloudinary
      const imageName = img.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(imageName);

    // Delete main slide
    await slideModel.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      error: false,
      message: "slide deleted successfully!"
    });
  } catch (err) {
    // console.error("Delete slide error:", err);
    return res.status(500).json({
      success: false,
      error: true,
      message: "Internal server error",
      details: err.message
    });
  }
}


export async function updateslide(req,res){
  try{
    // console.log(imagesArr);
    let slide=await HomeSliderModel.findByIdAndUpdate(
      req.params.id,
      {
      images:imagesArr.length>0?imagesArr:req.body.images,
    },{new:true});
    if(!slide){
      return res.status(200).json({
        message:"slide can not be updated !",
        error:true,
        success:false
      })
    }
    imagesArr=[];
    // res.send(slide);
    res.status(200).json({
      message: "slide updated successfully!",
      success: true,
      slide:slide
    });
  }catch(err){
    return res.status(500).json({
      message:err.message,
      err:true,
      success:false
    })
  }
}

export async function deleteMultipleSlide(req,res){
    const {ids}=req.body;
    if(!ids || !Array.isArray(ids)){
      res.status(400).json({
      message:"Invalid Input",
      err:true,
      success:false
    })
    }
    for(let i=0;i<ids.length;i++){
      const slide=await HomeSliderModel.findById(ids[i]);
      const images=slide.images;
      let img="";
      for(img of images){
        const imgUrl=img;
        const urlArr=imgUrl.split("/");
        const image=urlArr[urlArr.length-1];
        const imageName=image.split(".")[0];
        if(imageName){
          cloudinary.uploader.destroy(imageName,(err,result)=>{

          })
        }
      }
    }
    try{
      await HomeSliderModel.deleteMany({_id:{$in:ids}});
      return res.status(200).json({
      message:"slides deleted successfully",
      err:false,
      success:true
    })
  }catch(err){
    res.status(500).json({
      message:err.message,
      err:true,
      success:false
    })
  }
}