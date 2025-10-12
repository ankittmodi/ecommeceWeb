import ProductModel from "../models/product.model.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { totalmem } from "os";

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

// create product
export async function createProduct(req,res){
    try{
        let product=new ProductModel({
            name:req.body.name,
            description:req.body.description,
            images:imagesArr,
            brand:req.body.brand,
            price:req.body.price,
            oldPrice:req.body.oldPrice,
            catName:req.body.catName,
            catId:req.body.catId,
            subCatId:req.body.subCatId,
            subCat:req.body.subCat,
            thirdsubCat:req.body.thirdsubCat,
            thirdsubCatId:req.body.thirdsubCatId,
            countInStock:req.body.countInStock,
            rating:req.body.rating,
            isFeatured:req.body.isFeatured,
            discount:req.body.discount,
            productRam:req.body.productRam,
            size:req.body.size,
            productWeight:req.body.productWeight,
            
        });
        product=await product.save();
        if(!product){
            res.status(500).json({
                error:true,
                success:false,
                message:"Product not created !"
            })
        }
        imagesArr=[];

        return res.status(200).json({
            message:"Product created Successfully",
            err:false,
            success:true,
            product:product
        })
    }catch (err) {
    return res.status(500).json({
      message: err.message,
      error: true,
      success: false,
    });
  }
}


// get all products
export async function getAllProducts(req,res){
  try{
    // for pagination
    const page=parseInt(req.query.page) ||1;
    const perPage=parseInt(req.query.perPage);
    const totalPosts=await ProductModel.countDocuments();
    const totalPages=Math.ceil(totalPosts/perPage);
    if(page>totalPages){
      return res.status(404).json({
        message:"Page not found",
        success:false,
        err:true
      })
    }


    const products=await ProductModel.find().populate("category")
    .skip((page-1)*perPage)
    .limit(perPage)
    .exec();
    if(!products){
      res.status(500).json({
        err:true,
        success:false,
      })
    }

    return res.status(200).json({
      err:false,
      success:true,
      products:products,
      totalPages:totalPages,
      page:page
    })
  }catch(err){
    return res.status(500).json({
      message:err.message||err,
      err:true,
      success:false
    })
  }
}

// get all products by category id
export async function getAllProductsByCatId(req,res){
  try{
    // for pagination
    const page=parseInt(req.query.page) ||1;
    const perPage=parseInt(req.query.perPage) || 10000;
    const totalPosts=await ProductModel.countDocuments();
    const totalPages=Math.ceil(totalPosts/perPage);
    if(page>totalPages){
      return res.status(404).json({
        message:"Page not found",
        success:false,
        err:true
      })
    }


    const products=await ProductModel.find({
      catId:req.params.id
    }).populate("category")
    .skip((page-1)*perPage)
    .limit(perPage)
    .exec();
    if(!products){
      res.status(500).json({
        err:true,
        success:false,
      })
    }

    return res.status(200).json({
      err:false,
      success:true,
      products:products,
      totalPages:totalPages,
      page:page
    })
  }catch(err){
    return res.status(500).json({
      message:err.message||err,
      err:true,
      success:false
    })
  }
}

// get all products by category name
export async function getAllProductsByCatName(req,res){
  try{
    // for pagination
    const page=parseInt(req.query.page) ||1;
    const perPage=parseInt(req.query.perPage) || 10000;
    const totalPosts=await ProductModel.countDocuments();
    const totalPages=Math.ceil(totalPosts/perPage);
    if(page>totalPages){
      return res.status(404).json({
        message:"Page not found",
        success:false,
        err:true
      })
    }

    
    const products=await ProductModel.find({
      catName:req.query.catName
    }).populate("category")
    .skip((page-1)*perPage)
    .limit(perPage)
    .exec();
    console.log(req.query.catName);
    if(!products){
      res.status(500).json({
        err:true,
        success:false,
      })
    }

    return res.status(200).json({
      err:false,
      success:true,
      products:products,
      totalPages:totalPages,
      page:page
    })
  }catch(err){
    return res.status(500).json({
      message:err.message||err,
      err:true,
      success:false
    })
  }
}

// get all products by subcategory id
export async function getAllProductsBySubCatId(req,res){
  try{
    // for pagination
    const page=parseInt(req.query.page) ||1;
    const perPage=parseInt(req.query.perPage) || 10000;
    const totalPosts=await ProductModel.countDocuments();
    const totalPages=Math.ceil(totalPosts/perPage);
    if(page>totalPages){
      return res.status(404).json({
        message:"Page not found",
        success:false,
        err:true
      })
    }


    const products=await ProductModel.find({
      subCatId:req.params.id
    }).populate("category")
    .skip((page-1)*perPage)
    .limit(perPage)
    .exec();
    if(!products){
      res.status(500).json({
        err:true,
        success:false,
      })
    }

    return res.status(200).json({
      err:false,
      success:true,
      products:products,
      totalPages:totalPages,
      page:page
    })
  }catch(err){
    return res.status(500).json({
      message:err.message||err,
      err:true,
      success:false
    })
  }
}

// get all products by sub category name
export async function getAllProductsBySubCatName(req,res){
  try{
    // for pagination
    const page=parseInt(req.query.page) ||1;
    const perPage=parseInt(req.query.perPage) || 10000;
    const totalPosts=await ProductModel.countDocuments();
    const totalPages=Math.ceil(totalPosts/perPage);
    if(page>totalPages){
      return res.status(404).json({
        message:"Page not found",
        success:false,
        err:true
      })
    }

    
    const products=await ProductModel.find({
      subCat:req.query.subCat
    }).populate("category")
    .skip((page-1)*perPage)
    .limit(perPage)
    .exec();
    console.log(req.query.catName);
    if(!products){
      res.status(500).json({
        err:true,
        success:false,
      })
    }

    return res.status(200).json({
      err:false,
      success:true,
      products:products,
      totalPages:totalPages,
      page:page
    })
  }catch(err){
    return res.status(500).json({
      message:err.message||err,
      err:true,
      success:false
    })
  }
}

// get all products by subcategory id
export async function getAllProductsByThirdSubCatId(req,res){
  try{
    // for pagination
    const page=parseInt(req.query.page) ||1;
    const perPage=parseInt(req.query.perPage) || 10000;
    const totalPosts=await ProductModel.countDocuments();
    const totalPages=Math.ceil(totalPosts/perPage);
    if(page>totalPages){
      return res.status(404).json({
        message:"Page not found",
        success:false,
        err:true
      })
    }


    const products=await ProductModel.find({
      thirdsubCatId:req.params.id
    }).populate("category")
    .skip((page-1)*perPage)
    .limit(perPage)
    .exec();
    if(!products){
      res.status(500).json({
        err:true,
        success:false,
      })
    }

    return res.status(200).json({
      err:false,
      success:true,
      products:products,
      totalPages:totalPages,
      page:page
    })
  }catch(err){
    return res.status(500).json({
      message:err.message||err,
      err:true,
      success:false
    })
  }
}

// get all products by sub category name
export async function getAllProductsByThirdSubCatName(req,res){
  try{
    // for pagination
    const page=parseInt(req.query.page) ||1;
    const perPage=parseInt(req.query.perPage) || 10000;
    const totalPosts=await ProductModel.countDocuments();
    const totalPages=Math.ceil(totalPosts/perPage);
    if(page>totalPages){
      return res.status(404).json({
        message:"Page not found",
        success:false,
        err:true
      })
    }

    
    const products=await ProductModel.find({
      thirdsubCat:req.query.thirdsubCat
    }).populate("category")
    .skip((page-1)*perPage)
    .limit(perPage)
    .exec();
    console.log(req.query.catName);
    if(!products){
      res.status(500).json({
        err:true,
        success:false,
      })
    }

    return res.status(200).json({
      err:false,
      success:true,
      products:products,
      totalPages:totalPages,
      page:page
    })
  }catch(err){
    return res.status(500).json({
      message:err.message||err,
      err:true,
      success:false
    })
  }
}

// get all products by price
export async function getAllProductsByPrice(req,res){
  try{
    let productList=[];
    if(req.query.catId!=='' && req.query.catId!==undefined){
      const productListArr=await ProductModel.find({
        catId:req.query.catId,
      }).populate("category");
      productList=productListArr;
    }
    if(req.query.subCatId!=='' && req.query.subCatId!==undefined){
      const productListArr=await ProductModel.find({
        subCatId:req.query.subCatId,
      }).populate("category");
      productList=productListArr;
    }
    if(req.query.thirdsubCatId!=='' && req.query.thirdsubCatId!==undefined){
      const productListArr=await ProductModel.find({
        thirdsubCatId:req.query.thirdsubCatId,
      }).populate("category");
      productList=productListArr;
    }

    const filteredProducts=productList.filter((product)=>{
      if(req.query.minPrice && product.price<parseInt(+req.query.minPrice)){
        return false;
      }
      if(req.query.maxPrice && product.price<parseInt(+req.query.maxPrice)){
        return true;
      }
    });

    return res.status(200).json({
      products:filteredProducts,
      totalPages:0,
      page:0,
      err:false,
      success:true
    });

  }catch(err){
    return res.status(500).json({
      message:err.message||err,
      err:true,
      success:false
    })
  }
}

// get all products by rating
export async function getAllProductsByRating(req,res){
  try{
    // for pagination
    const page=parseInt(req.query.page) ||1;
    const perPage=parseInt(req.query.perPage) || 10000;
    const totalPosts=await ProductModel.countDocuments();
    const totalPages=Math.ceil(totalPosts/perPage);
    if(page>totalPages){
      return res.status(404).json({
        message:"Page not found",
        success:false,
        err:true
      })
    }

    let products=[];
    if(req.query.catId!==undefined){
      products=await ProductModel.find({
      rating:req.query.rating,
      catId:req.query.catId,
    }).populate("category")
    .skip((page-1)*perPage)
    .limit(perPage)
    .exec();
    }
    if(req.query.subCatId!==undefined){
      products=await ProductModel.find({
      rating:req.query.rating,
      subCatId:req.query.subCatId,
    }).populate("category")
    .skip((page-1)*perPage)
    .limit(perPage)
    .exec();
    }
    if(req.query.thirdsubCatId!==undefined){
      products=await ProductModel.find({
      rating:req.query.rating,
      thirdsubCatId:req.query.thirdsubCatId,
    }).populate("category")
    .skip((page-1)*perPage)
    .limit(perPage)
    .exec();
    }
    // console.log(req.query.catName);
    if(!products){
      res.status(500).json({
        err:true,
        success:false,
      })
    }

    return res.status(200).json({
      err:false,
      success:true,
      products:products,
      totalPages:totalPages,
      page:page
    })
  }catch(err){
    return res.status(500).json({
      message:err.message||err,
      err:true,
      success:false
    })
  }
}

// get all products count
export async function getAllProductCount(req,res){
  try{
    const productsCount=await ProductModel.countDocuments();
    if(!productsCount){
      res.status(500).json({
        err:true,
        success:false
      })
    }

    return res.status(200).json({
      err:false,
      success:true,
      productsCount:productsCount
    })
  }catch(err){
    return res.status(500).json({
      message:err.message||err,
      err:true,
      success:false
    })
  }
}


// get all featured products
export async function getAllFeaturedProducts(req,res){
  try{
    
    const products=await ProductModel.find({
      isFeatured:true
    }).populate("category");
    
    if(!products){
      res.status(500).json({
        err:true,
        success:false,
      })
    }

    return res.status(200).json({
      err:false,
      success:true,
      products:products,
    })
  }catch(err){
    return res.status(500).json({
      message:err.message||err,
      err:true,
      success:false
    })
  }
}

// get products
export async function getProduct(req,res){
  try{
    const product=await ProductModel.findById(req.params.id).populate("category");
    if(!product){
      return res.status(404).json({
      message:"Product Not found",
      err:true,
      success:true
    });
    }
    return res.status(200).json({
    success:true,
    err:false,
    product:product
  })
  }catch(err){
    return res.status(200).json({
    success:true,
    err:false,
    message:err.message
  })
  }
}

// get products
export async function deleteProduct(req,res){
  const product=await ProductModel.findById(req.params.id).populate("category");
  if(!product){
    return res.status(404).json({
      message:"Product Not found",
      err:true,
      success:true
    })
  }
  const images=product.images;
  for(let img of images){
    const imgUrl=img;
    const urlArr=imgUrl.split("/");
    const image=urlArr[urlArr.length-1];

    const imageName=image.split(".")[0];

    if(imageName){
      cloudinary.uploader.destroy(imageName,(err,result)=>{

      })
    }
  }

  const deleteProduct=await ProductModel.findByIdAndDelete(req.params.id);
  if(!deleteProduct){
    res.status(404).json({
      message:"Product not deleted",
      err:true,
      success:false
    })
  }

  return res.status(200).json({
    success:true,
    err:false,
    message:"Product deleted !"
  })
}

// delete upload image of product
export async function productImage(req,res){
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
    res.status(200).send(result);
  }
  }
}

// update product

export async function updateProduct(req,res){
  try{
    const product=new ProductModel.findByIdAndUpdate(
      req.params.id,
      {
            name:req.body.name,
            description:req.body.description,
            images:req.body.images,
            brand:req.body.brand,
            price:req.body.price,
            oldPrice:req.body.oldPrice,
            catId:req.body.catId,
            catName:req.body.catName,
            subCatId:req.body.subCatId,
            subCat:req.body.subCat,
            thirdsubCatId:req.body.thirdsubCatId,
            thirdsubCat:req.body.thirdsubCat,
            countInStock:req.body.countInStock,
            rating:req.body.rating,
            isFeatured:req.body.isFeatured,
            discount:req.body.discount,
            productRam:req.body.productRam,
            size:req.body.size,
            productWeight:req.body.productWeight,
            
        },{new:true});
    if(!product){
      return res.status(404).json({
      message:"The product can not be updated",
      err:true,
      success:true
    })
    }

    imagesArr=[];
    return res.status(200).json({
      message:"The product is updated",
      err:false,
      success:false
    })
  }catch(err){
    return res.status(200).json({
      success:true,
      err:false,
      message:err.message
    })
  }
}