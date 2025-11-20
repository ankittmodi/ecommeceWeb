import { Router } from "express";
import auth from "../middlewares/Auth.js";
import upload from "../middlewares/multer.js";

import {
  uploadImages,
  addHomeSlider,
  deleteMultipleSlide,
  deleteSlide,
  getHomeSlide,
  getSlide,
  removeSlideImage,
  updateslide
} from "../controllers/homeSlider.controller.js";

const homeSliderRouter = Router();

// Upload images
homeSliderRouter.put('/uploadImages', auth, upload.array('images'), uploadImages);

// Add slide
homeSliderRouter.post('/add', auth, addHomeSlider);

// Get ALL slides
homeSliderRouter.get('/', getHomeSlide);

// Get single slide
homeSliderRouter.get('/:id', getSlide);

// Delete single slide
homeSliderRouter.delete('/delete/:id', auth, deleteSlide);

// Delete multiple slides
homeSliderRouter.delete('/delete-multiple', auth, deleteMultipleSlide);

// Delete image from cloudinary
homeSliderRouter.delete('/deleteImage', auth, removeSlideImage);

// Update slide
homeSliderRouter.put('/:id', auth, updateslide);

export default homeSliderRouter;
