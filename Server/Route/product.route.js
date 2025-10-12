import { Router } from "express";
import auth from "../middlewares/Auth.js";
import upload from '../middlewares/multer.js';
import { createProduct, deleteProduct, getAllFeaturedProducts, getAllProductCount, getAllProducts, getAllProductsByCatId, getAllProductsByCatName, getAllProductsByPrice, getAllProductsByRating, getAllProductsBySubCatId, getAllProductsBySubCatName, getAllProductsByThirdSubCatId, getAllProductsByThirdSubCatName, getProduct, productImage, updateProduct, uploadImages } from "../controllers/product.controller.js";

const productRouter=Router();

productRouter.post('/uploadImages',auth,upload.array('images'),uploadImages);
productRouter.post('/create',auth,createProduct);
productRouter.get('/getAllProducts',getAllProducts);
productRouter.get('/getAllProductsByCatId/:id',getAllProductsByCatId);
productRouter.get('/getAllProductsByCatName',getAllProductsByCatName);
productRouter.get('/getAllProductsByCatId/:id',getAllProductsBySubCatId);
productRouter.get('/getAllProductsBySubCatName',getAllProductsBySubCatName);
productRouter.get('/getAllProductsBythirdSubCatId/:id',getAllProductsByThirdSubCatId);
productRouter.get('/getAllProductsByThirdSubCatName',getAllProductsByThirdSubCatName);
productRouter.get('/getAllProductsByPrice',getAllProductsByPrice);
productRouter.get('/getAllProductsByRating',getAllProductsByRating);
productRouter.get('/getAllProductsCount',getAllProductCount);
productRouter.get('/getAllFeaturedProducts',getAllFeaturedProducts);
productRouter.delete('/:id',deleteProduct);
productRouter.get('/:id',getProduct);
productRouter.delete('/deleteImage',auth,productImage);
productRouter.put('/updateProduct/:id',auth,updateProduct);
export default productRouter;