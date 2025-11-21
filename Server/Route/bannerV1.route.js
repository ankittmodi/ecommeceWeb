import { Router } from "express";
import auth from "../middlewares/auth.js";
import upload from '../middlewares/multer.js';
import uploadImages, { addBanner, deleteBanner, deleteMultipleBanner, getBanner, getBannerById, removeBannerImage, updateBanner } from '../controllers/bannerv1.controller.js';

export const bannerV1Router=Router();
bannerV1Router.put('/uploadImages',auth,upload.array('images'),uploadImages);
bannerV1Router.post('/add',auth,addBanner);
bannerV1Router.get('/',getBanner);
bannerV1Router.get('/:id', getBannerById);
bannerV1Router.delete('/deleteImage',auth,removeBannerImage);
bannerV1Router.delete('/delete/:id',auth,deleteBanner);
bannerV1Router.post("/delete-multiple", auth, deleteMultipleBanner);
bannerV1Router.put('/:id',auth,updateBanner);