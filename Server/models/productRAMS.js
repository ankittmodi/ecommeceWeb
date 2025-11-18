import mongoose from "mongoose";

const productRamsSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    dateCreated:{
        type:Number,
        default:Date.now
    }
},{
    timestamps:true
});

const ProductRamModel=mongoose.model('ProductRam',productRamsSchema);
export default ProductRamModel;