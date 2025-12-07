import { Router } from 'express';

import auth from '../middlewares/Auth.js';
// 1. Add createOrderPaypalController to the imports 👇
import { 
    captureOrderPaypalController, 
    createOrderController, 
    getOrderDetailsController,
    createOrderPaypalController, 
} from '../controllers/order.controller.js';

const orderRouter = Router();

orderRouter.post('/add', auth, createOrderController);
orderRouter.get('/order-list', auth, getOrderDetailsController);
orderRouter.post('/create-order-paypal', auth, createOrderPaypalController);

orderRouter.post('/capture-order-paypal', auth, captureOrderPaypalController);

export default orderRouter;