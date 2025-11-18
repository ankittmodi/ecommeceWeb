import { Router } from "express";
import auth from "../middlewares/Auth.js";
import upload from '../middlewares/multer.js';
import uploadImages, { addHomeSlider, deleteMultipleSlide, deleteSlide, getHomeSlide, getSlide, removeSlideImage, updateslide } from "../controllers/homeSlider.controller.js";


const homeSliderRouter=Router();
homeSliderRouter.put('/uploadImages',auth,upload.array('images'),uploadImages);
homeSliderRouter.post('/create',auth,addHomeSlider);
homeSliderRouter.get('/',getSlide);
homeSliderRouter.get('/:id',getHomeSlide);
homeSliderRouter.delete('/deleteImage',auth,removeSlideImage);
homeSliderRouter.delete('/:id',auth,deleteMultipleSlide);
homeSliderRouter.put('/:id',auth,updateslide);
export default homeSliderRouter;