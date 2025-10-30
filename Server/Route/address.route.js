import { Router } from "express";
import auth from "../middlewares/auth.js";
import { addAddressController, deleteAddressController, getAddressController} from "../controllers/address.controller.js";
const addressRouter=Router();
addressRouter.post("/add",auth,addAddressController);
addressRouter.get("/get",auth,getAddressController);
addressRouter.delete("/:id",auth,deleteAddressController);
// addressRouter.put("/selectAddress/:id",auth,selectAddressController);
export default addressRouter;