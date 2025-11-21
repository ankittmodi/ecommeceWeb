import { Router } from "express";
import auth from "../middlewares/Auth.js";
import upload from '../middlewares/multer.js';
import { createProduct, createProductRams, createProductSize, createProductWeight, deleteMultipleProduct, deleteProduct, deleteProductRams, deleteProductSize, deleteProductWeight, getAllFeaturedProducts, getAllProductCount, getAllProducts, getAllProductsByCatId, getAllProductsByCatName, getAllProductsByPrice, getAllProductsByRating, getAllProductsBySubCatId, getAllProductsBySubCatName, getAllProductsByThirdSubCatId, getAllProductsByThirdSubCatName, getProduct, getProductRams, getProductRamsById, getProductSizeById, getProductSizes, getProductWeightById, getProductWeights, productImage, updateProduct, updateProductRams, updateProductSize, updateProductWeight, uploadBannerImages, uploadImages } from "../controllers/product.controller.js";

const productRouter=Router();

productRouter.put('/uploadImages',auth,upload.array('images'),uploadImages);
productRouter.put('/uploadBannerImages',auth,upload.array('bannerImages'),uploadBannerImages);
productRouter.post('/create',auth,createProduct);
productRouter.get('/getAllProducts',getAllProducts);
productRouter.get('/getAllProductsByCatId/:id',getAllProductsByCatId);
productRouter.get('/getAllProductsByCatName',getAllProductsByCatName);
productRouter.get('/getAllProductsBySubCatId/:id',getAllProductsBySubCatId);
productRouter.get('/getAllProductsBySubCatName',getAllProductsBySubCatName);
productRouter.get('/getAllProductsBythirdSubCatId/:id',getAllProductsByThirdSubCatId);
productRouter.get('/getAllProductsByThirdSubCatName',getAllProductsByThirdSubCatName);
productRouter.get('/getAllProductsByPrice',getAllProductsByPrice);
productRouter.get('/getAllProductsByRating',getAllProductsByRating);
productRouter.get('/getAllProductsCount',getAllProductCount);
productRouter.get('/getAllFeaturedProducts',getAllFeaturedProducts);
productRouter.delete('/deleteMultiple',auth, deleteMultipleProduct);
productRouter.delete('/deleteImage',auth,productImage);
productRouter.delete('/:id',auth, deleteProduct);
productRouter.get('/:id',getProduct);
productRouter.put('/updateProduct/:id',auth,updateProduct);

productRouter.post('/productRams/create',auth,createProductRams);
productRouter.delete('/productRams/:id',auth, deleteProductRams);
productRouter.put('/productRams/:id',auth,updateProductRams);
productRouter.get('/productRams/get',getProductRams);
productRouter.get('/productRams/:id',getProductRamsById);

productRouter.post('/productSize/create', auth, createProductSize);
productRouter.delete('/productSize/:id', auth, deleteProductSize);
productRouter.put('/productSize/:id', auth, updateProductSize);
productRouter.get('/productSize/get', getProductSizes);
productRouter.get('/productSize/:id', getProductSizeById);


productRouter.post('/productWeight/create', auth, createProductWeight);
productRouter.delete('/productWeight/:id', auth, deleteProductWeight);
productRouter.put('/productWeight/:id', auth, updateProductWeight);
productRouter.get('/productWeight/get', getProductWeights);
productRouter.get('/productWeight/:id', getProductWeightById);

export default productRouter;