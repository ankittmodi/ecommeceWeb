import mongoose from "mongoose";
const cartProductSchema=mongoose.Schema({
    productTitle:{
        type:String,
        required:true,
    },
    quantity:{
        type:Number,
        default:1
    },
    image:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        // required:true
    },
    price:{
        type:Number,
        // required:true
    },
    oldPrice:{
        type:Number,
        // required:true
    },
    size:{
        type:String
    },
    weight:{
        type:String
    },
    ram:{
        type:String
    },
    discount:{
        type:Number,
        // required:true
    },
    subTotal:{
        type:Number,
        // required:true
    },
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"user"
    },
    productId:{
        type:String,
        required:true,
    },
    countInStock:{
        type:Number,
        required:true
    },
    brand:{
        type:String,
    }
},
{timestamps:true
});

const CartProductModel=mongoose.model('cartModel',cartProductSchema);
export default CartProductModel;