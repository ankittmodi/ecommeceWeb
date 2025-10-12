import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import connectDB from './config/connectDb.js';
import userRouter from './Route/user.route.js';
import categoryRouter from './Route/category.route.js';
import productRouter from './Route/product.route.js';
import cartRouter from './Route/cartroute.js';
import myListRouter from './Route/myList.route.js';
const app=express();
app.use(cors());
app.options('*',cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
/* Temporarily comment out helmet middleware to test for error source*/
app.use(helmet({
  crossOriginResourcePolicy:false
}))


app.get('/',(request,response)=>{
  response.json({
    message:"server is running on port " + process.env.PORT
  });
});

app.use('/api/user',userRouter);
app.use('/api/category',categoryRouter);
app.use('/api/product',productRouter);
app.use('/api/cart',cartRouter);
app.use('/api/myList',myListRouter);

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('server is running on port', process.env.PORT);
    });
  })
  .catch((err) => {
    console.error('DB connection failed:', err);
  });



