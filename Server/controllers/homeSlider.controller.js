import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import HomeSliderModel from "../models/homeSlider.model.js";

cloudinary.config({
  cloud_name: process.env.cloudinary_Config_cloud_name,
  api_key: process.env.cloudinary_Config_cloud_api_key,
  api_secret: process.env.cloudinary_Config_cloud_api_secret,
  secure: true,
});

let imagesArr = [];

// **************************
// UPLOAD IMAGES
// **************************
export async function uploadImages(req, res) {
  try {
    imagesArr = [];
    const images = req.files;

    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: false
    };

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.uploader.upload(images[i].path, options);
      imagesArr.push(result.secure_url);

      fs.unlinkSync(`uploads/${images[i].filename}`);
    }

    return res.status(200).json({
      success: true,
      images: imagesArr
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: true,
      message: err.message
    });
  }
}


// **************************
// ADD SLIDE
// **************************
export async function addHomeSlider(req, res) {
  try {
    const slide = new HomeSliderModel({
      images: imagesArr,
    });

    await slide.save();
    imagesArr = [];

    return res.status(200).json({
      success: true,
      message: "Slide created successfully",
      slide
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: true,
      message: err.message
    });
  }
}


// **************************
// GET ALL SLIDES
// **************************
export async function getHomeSlide(req, res) {
  try {
    const slides = await HomeSliderModel.find();

    return res.status(200).json({
      success: true,
      error: false,
      data: slides
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: true,
      message: err.message
    });
  }
}


// **************************
// GET SINGLE SLIDE
// **************************
export async function getSlide(req, res) {
  try {
    const slide = await HomeSliderModel.findById(req.params.id);

    if (!slide) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Slide not found"
      });
    }

    return res.status(200).json({
      success: true,
      slide
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: true,
      message: err.message
    });
  }
}


// **************************
// REMOVE IMAGE FROM CLOUDINARY
// **************************
export async function removeSlideImage(req, res) {
  try {
    const imgUrl = req.query.img;
    const fileName = imgUrl.split("/").pop().split(".")[0];

    await cloudinary.uploader.destroy(fileName);

    return res.status(200).json({
      success: true,
      message: "Image deleted successfully"
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: true,
      message: err.message
    });
  }
}


// **************************
// DELETE ONE SLIDE
// **************************
export async function deleteSlide(req, res) {
  try {
    const slide = await HomeSliderModel.findById(req.params.id);

    if (!slide) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Slide not found"
      });
    }

    for (let img of slide.images) {
      const fileName = img.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(fileName);
    }

    await HomeSliderModel.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Slide deleted successfully"
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: true,
      message: err.message
    });
  }
}


// **************************
// UPDATE SLIDE
// **************************
export async function updateslide(req, res) {
  try {
    const updatedSlide = await HomeSliderModel.findByIdAndUpdate(
      req.params.id,
      { images: imagesArr.length > 0 ? imagesArr : req.body.images },
      { new: true }
    );

    imagesArr = [];

    return res.status(200).json({
      success: true,
      message: "Slide updated successfully",
      slide: updatedSlide
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: true,
      message: err.message
    });
  }
}


// **************************
// DELETE MULTIPLE SLIDES
// **************************
export async function deleteMultipleSlide(req, res) {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids)) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid Input"
      });
    }

    for (let id of ids) {
      const slide = await HomeSliderModel.findById(id);

      for (let img of slide.images) {
        const fileName = img.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(fileName);
      }
    }

    await HomeSliderModel.deleteMany({ _id: { $in: ids } });

    return res.status(200).json({
      success: true,
      message: "Slides deleted successfully"
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: true,
      message: err.message
    });
  }
}
