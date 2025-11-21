import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import BannerV1Model from "../models/bannerV1.model.js";

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

// create banner
export async function addBanner(req,res){
  try{
    let banner=new BannerV1Model({
      bannerTitle:req.body.bannerTitle,
      images:imagesArr,
      catId:req.body.catId,
      subCatId:req.body.subCatId,
      thirdSubCatId:req.body.thirdSubCatId,
      price:req.body.price,
      align:req.body.align,
    });
    if(!banner){
      res.status(500).json({
        message:"banner not created",
        error:true,
        success:false
      })
    }
    banner=await banner.save();

    imagesArr=[];
    return res.status(200).json({
        message:"banner created successfully",
        error:false,
        success:true,
        banner:banner
      })
  }catch(err){
    return res.status(400).json({
      message: err.message,
      error: true,
      success: false,
    });
  }
}

export async function getBanner(req,res){
  try{
    const banner=await BannerV1Model.find();
    if(!banner){
        return res.status(500).json({
        message: err.message,
        error: true,
        success: false,
        });
    }
    return res.status(200).json({
      error: false,
      success: true,
      data:banner
    });
  }catch(err){
    return res.status(500).json({
      message: err.message,
      error: true,
      success: false,
    });
  }
}

export async function getBannerById(req, res) {
  try {
    const id = req.params.id;
    const banner = await BannerV1Model.findById(id);

    if (!banner) {
      return res.status(404).json({
        message: "Banner not found",
        error: true,
        success: false
      });
    }

    return res.status(200).json({
      error: false,
      success: true,
      banner
    });

  } catch (err) {
    return res.status(500).json({
      message: err.message,
      error: true,
      success: false
    });
  }
}



export async function deleteBanner(req, res) {
  const banner = await BannerV1Model.findById(req.params.id);

  if (!banner) {
    return res.status(404).json({
      message: "Banner not found",
      err: true,
      success: false
    });
  }

  // delete images from cloudinary
  const images = banner.images;
  for (let img of images) {
    const imageName = img.split("/").pop().split(".")[0];
    if (imageName) {
      cloudinary.uploader.destroy(imageName, (err, result) => {});
    }
  }

  const deletebanner = await BannerV1Model.findByIdAndDelete(req.params.id);

  if (!deletebanner) {
    return res.status(404).json({
      message: "Banner not deleted",
      err: true,
      success: false,
    });
  }

  return res.status(200).json({
    success: true,
    err: false,
    message: "Banner deleted!",
  });
}


// update banner 
export async function updateBanner(req,res){
  try{
    // console.log(imagesArr);
    let banner=await BannerV1Model.findByIdAndUpdate(
      req.params.id,
      {
        bannerTitle:req.body.bannerTitle,
        images:imagesArr,
        catId:req.body.catId,
        subCatId:req.body.subCatId,
        thirdSubCatId:req.body.thirdSubCatId,
        price:req.body.price,
        align:req.body.align,
        images:imagesArr.length>0?imagesArr:req.body.images,
    },{new:true});
    if(!banner){
      return res.status(200).json({
        message:"banner can not be updated !",
        error:true,
        success:false
      })
    }
    imagesArr=[];
    // res.send(banner);
    res.status(200).json({
      message: "banner updated successfully!",
      success: true,
      banner:banner
    });
  }catch(err){
    return res.status(500).json({
      message:err.message,
      err:true,
      success:false
    })
  }
}

export async function removeBannerImage(req,res){
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

export async function deleteMultipleBanner(req, res) {
  const { ids } = req.body;

  if (!ids || ids.length === 0) {
    return res.status(400).json({
      success: false,
      err: true,
      message: "No banner IDs provided"
    });
  }

  try {
    const banners = await BannerV1Model.find({ _id: { $in: ids } });

    if (!banners || banners.length === 0) {
      return res.status(404).json({
        success: false,
        err: true,
        message: "No banners found"
      });
    }

    // delete images from cloudinary
    for (const banner of banners) {
      for (const img of banner.images) {
        const imageName = img.split("/").pop().split(".")[0];
        if (imageName) {
          cloudinary.uploader.destroy(imageName, (err, result) => {});
        }
      }
    }

    // Delete banners from DB
    await BannerV1Model.deleteMany({ _id: { $in: ids } });

    return res.status(200).json({
      success: true,
      err: false,
      message: "Selected banners deleted successfully"
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      err: true,
      message: "Error deleting multiple banners"
    });
  }
}




