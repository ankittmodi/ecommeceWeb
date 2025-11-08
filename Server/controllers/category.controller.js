import CategoryModel from "../models/category.model.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

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


// create category
export async function createCategory(req,res){
  try{
    let category=new CategoryModel({
      name:req.body.name,
      images:imagesArr,
      parentId:req.body.parentId,
      parentCatName:req.body.parentCatName
    });
    if(!category){
      res.status(500).json({
        message:"Category not created",
        error:true,
        success:false
      })
    }
    category=await category.save();

    imagesArr=[];
    return res.status(200).json({
        message:"Category created successfully",
        error:false,
        success:true,
        category:category
      })
  }catch(err){
    return res.status(400).json({
      message: err.message,
      error: true,
      success: false,
    });
  }
}

// get category

export async function getCategory(req,res){
  try{
    const categories=await CategoryModel.find();
    const categoryMap={};

    // {
    //   "_id":"828573797482",
    //   "name":"fashion",
    //    "parentId":null
    // }

    // {
    //   "_id":"878498",
    //   "name":"Male",
    //    "parentId":"828573797482"
    // }
    categories.forEach(cat=>{
      categoryMap[cat._id]={...cat._doc,children:[]};
    });

    const rootCategories=[];
    categories.forEach(cat=>{
      if(cat.parentId){
        categoryMap[cat.parentId].children.push(categoryMap[cat._id]);
      }
      else{
        rootCategories.push(categoryMap[cat._id]);
      }
    });
    return res.status(200).json({
      error: false,
      success: true,
      data:rootCategories
    });
  }catch(err){
    return res.status(500).json({
      message: err.message,
      error: true,
      success: false,
    });
  }
}

// get  category count
export async function getSubCategoryCount(req,res){
  try{
    const categoryCount=await CategoryModel.countDocuments({parentId:undefined});
    if(!categoryCount){
      res.status(500).json({success:false,err:true});
    }
    else{
      res.send({
        categoryCount:categoryCount,
      });
    }
  }catch(err){
    return res.status(500).json({
      message:err.message,
      err:true,
      success:false
    })
  }
}

// get Sub category count
export async function getCategoryCount(req,res){
  try{
    const categories=await CategoryModel.find();
    if(!categories){
      res.status(500).json({success:false,err:true});
    }
    else{
      const subCatList=[];
      for(let cat of categories){
        if(cat.parentId!==undefined){
          subCatList.push(cat);
        }
      }
      res.send({
        subCategoryCount:subCatList.length
      })
    }
  }catch(err){
    return res.status(500).json({
      message:err.message,
      err:true,
      success:false
    })
  }
}


// get single category
export async function getCategoryById(req,res){
  try{
    const category=await CategoryModel.findById(req.params.id);
    if(!category){
      res.status(500).json({
        message:"The category with the given Id was not found.",
        error:true,
        success:false
      });
    }

    return res.status(200).json({
      error:false,
      success:true,
      category:category
    })
  }catch(err){
    return res.status(500).json({
      message:err.message,
      err:true,
      success:false
    })
  }
}

// delete upload image of category
export async function removeCategoryImage(req,res){
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


// delete category
export async function deleteCategory(req, res) {
  try {
    const category = await CategoryModel.findById(req.params.id);
    if (!category) {
      return res.status(404).json({
        message: "Category not found!",
        error: true,
        success: false
      });
    }

    // 🖼️ Delete images from Cloudinary
    for (let img of category.images) {
      const imageName = img.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(imageName);
    }

    // 🧩 Find and delete subcategories recursively
    const subCategories = await CategoryModel.find({ parentId: req.params.id });

    for (const subCat of subCategories) {
      // Find and delete third-level subcategories
      const thirdSubCats = await CategoryModel.find({ parentId: subCat._id });

      for (const third of thirdSubCats) {
        await CategoryModel.findByIdAndDelete(third._id);
      }

      await CategoryModel.findByIdAndDelete(subCat._id);
    }

    // Delete main category
    await CategoryModel.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      error: false,
      message: "Category deleted successfully!"
    });
  } catch (err) {
    console.error("Delete category error:", err);
    res.status(500).json({
      success: false,
      error: true,
      message: "Internal server error",
      details: err.message
    });
  }
}


// update category 
export async function updateCategory(req,res){
  try{
    // console.log(imagesArr);
    let category=await CategoryModel.findByIdAndUpdate(
      req.params.id,
      {
      name:req.body.name,
      images:imagesArr.length>0?imagesArr:req.body.images,
      parentId:req.body.parentId,
      parentCatName:req.body.parentCatName
    },{new:true});
    if(!category){
      return res.status(200).json({
        message:"Category can not be updated !",
        error:true,
        success:false
      })
    }
    imagesArr=[];
    // res.send(category);
    res.status(200).json({
      message: "Category updated successfully!",
      success: true,
      category:category
    });
  }catch(err){
    return res.status(500).json({
      message:err.message,
      err:true,
      success:false
    })
  }
}