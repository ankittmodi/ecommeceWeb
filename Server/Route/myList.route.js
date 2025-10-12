import {Router} from 'express';
import { addToMyListController, deleteMyListController, getMyListController } from '../controllers/myList.controller.js';
import auth from '../middlewares/auth.js'
const myListRouter=Router();

myListRouter.post('/add',auth,addToMyListController);
myListRouter.delete('/remove/:id',auth,deleteMyListController);
myListRouter.get('/get',auth,getMyListController);
export default myListRouter;