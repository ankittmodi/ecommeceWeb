import { Router } from "express";
import auth from "../middlewares/Auth.js";
import upload from '../middlewares/multer.js';
import {createCategory, deleteCategory, getCategory, getCategoryById, getCategoryCount, getSubCategoryCount, removeCategoryImage, updateCategory, uploadImages } from "../controllers/category.controller.js";

const categoryRouter=Router();
categoryRouter.put('/uploadImages',auth,upload.array('images'),uploadImages);
categoryRouter.post('/create',auth,createCategory);
categoryRouter.get('/',getCategory);
categoryRouter.get('/get/count',getCategoryCount);
categoryRouter.get('/get/count/subcat',getSubCategoryCount);
categoryRouter.get('/:id',getCategoryById);
categoryRouter.delete('/deleteImage',auth,removeCategoryImage);
categoryRouter.delete('/:id',auth,deleteCategory);
categoryRouter.put('/:id',auth,updateCategory);
export default categoryRouter;