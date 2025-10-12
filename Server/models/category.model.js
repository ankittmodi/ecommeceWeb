import mongoose  from "mongoose";
const categorySchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        tim:true
    },
    images:[
        {
            type:String
        }
    ],
    color:{
        type:String
    },
    productCatname:{
        type:String
    },
    parentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        default:null
    }
},{timestamps:true});

const CategoryModel=mongoose.model('Category',categorySchema);
export default CategoryModel;
