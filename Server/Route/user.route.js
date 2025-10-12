import {Router} from 'express';
import userAvatarController, { forgotPasswordController, forgotPasswordOtp, loginUserController, logoutController, refreshToken, registerUserController, removeImageFromCloudinary, resetPassword, updateUserDetails, userDetails, verifyEmailController } from '../controllers/user.controller.js';
import auth from '../middlewares/Auth.js';
import upload from '../middlewares/multer.js';
const userRouter=Router();
userRouter.post('/register',registerUserController);
userRouter.post('/verifyEmail',verifyEmailController);
userRouter.post('/login',loginUserController);
userRouter.get('/logout',auth,logoutController);
userRouter.put('/user-avatar',auth,upload.array('avatar'),userAvatarController);
userRouter.delete('/deleteImage',auth,removeImageFromCloudinary);
userRouter.put('/:id',auth,updateUserDetails);

userRouter.post('/forgot-password',forgotPasswordController);
userRouter.post('/verify-forgot-password-otp',forgotPasswordOtp);

userRouter.post('/reset-password',resetPassword);
userRouter.post('/refresh-token',refreshToken);
userRouter.get('/user-details',auth,userDetails);
export default userRouter;