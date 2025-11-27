import {Router} from 'express';

import { addToCartItemController, deleteCartItemController, getCartItemController, updateCartItemQtyController } from '../controllers/cart.controller.js';
import auth from '../middlewares/Auth.js';

const cartRouter=Router();

cartRouter.post('/add',auth,addToCartItemController);
cartRouter.get('/get',auth,getCartItemController);
cartRouter.put('/update-qty',auth,updateCartItemQtyController);
cartRouter.delete('/delete-cart-item/:id',auth,deleteCartItemController);

export default cartRouter;
