import MyListModel from "../models/myList.model.js";

export const addToMyListController=async(req,res)=>{
    try{
        const userId=req.userId;
        const{productId,
            productTitle,
            image,
            rating,
            price,
            oldPrice,
            brand,
            discount}=req.body;
        
        const item=await MyListModel.findOne({
            userId:userId,
            productId:productId
        });

        if(item){
            return res.status(400).json({
                message:"Item already in my list"
            })
        }

        const myList=new MyListModel({
            productId,
            productTitle,
            image,
            rating,
            price,
            oldPrice,
            brand,
            discount,
            userId
        });

        const save=await myList.save();

        return res.status(200).json({
            message:"The product added in the my list",
            err:false,
            success:true
        })
    }catch(err){
        return res.status(500).json({
        message: err.message || err,
        err: true,
        success: false,
        });
    }
}


// delete mylist
export async function deleteMyListController(req,res){
    try{
        const myListItem=await MyListModel.findById(req.params.id);
        if(!myListItem){
            return res.status(404).json({
            message: "The item with this given id was not found",
            err: true,
            success: false,
        });
        }

        const deleteItem=await MyListModel.findByIdAndDelete(req.params.id);

        if(!deleteItem){
            return res.status(404).json({
            message: "Item is not deleted",
            err: true,
            success: false,
        });
        }

        return res.status(200).json({
        message: "Item removed from MyList",
        err: false,
        success: true,
        });
    }catch(err){
        return res.status(500).json({
        message: err.message || err,
        err: true,
        success: false,
        });
    }
}


// get mylist controller
export async function getMyListController(req,res){
    try{
        const userId=req.userId;
        const myListItem=await MyListModel.find({
            userId:userId
        })

        return res.status(200).json({
        data:myListItem,
        err: false,
        success: true,
        });
    }catch(err){
        return res.status(500).json({
        message: err.message || err,
        err: true,
        success: false,
        });
    }
}