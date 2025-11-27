import CartProductModel from "../models/cart.model.js";
// import userModel from "../models/user.model.js";

export const addToCartItemController = async (req, res) => {
  try {
    const userId = req.userId;
    const { productTitle,productId,image,rating,price,
      quantity,subTotal,countInStock,oldPrice,discount,brand,size,weight,ram } = req.body;


    if (!productId) {
      return res.status(402).json({
        message: "Provide productId",
        err: true,
        success: false,
      });
    }

    // check if item is already in cart
    const checkItemCart = await CartProductModel.findOne({
      userId,
      productId,
    });

    if (checkItemCart) {
      return res.status(400).json({
        message: "Item is already in cart",
      });
    }

    const cartItem = new CartProductModel({
      productTitle:productTitle,
      image:image,
      rating:rating,
      price:price,
      oldPrice:oldPrice,
      discount:discount,
      quantity: quantity,
      userId:userId,
      productId:productId,
      countInStock:countInStock,
      subTotal:subTotal,
      brand:brand,
      size:size,
      weight:weight,
      ram:ram
    });

    const saveItem=await cartItem.save();

    return res.status(200).json({
      data: saveItem,
      message: "Item added successfully",
      err: false,
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || err,
      err: true,
      success: false,
    });
  }
};

export const getCartItemController = async (req, res) => {
  try {
    const userId = req.userId;

    const cartItems = await CartProductModel.find({ userId:userId })

    return res.status(200).json({
      data: cartItems,
      err: false,
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || err,
      err: true,
      success: false,
    });
  }
};


// update cart
export const updateCartItemQtyController=async (req,res)=>{
    try{
        const userId=req.userId;
        const {_id,qty,subTotal}=req.body;

        if(!_id || !qty){
            return res.status(400).json({
            message: "provide id, qty",
            err: true,
            success: false,
            });
        }

        const updateCartItem=await CartProductModel.updateOne({
            _id:_id,
            userId:userId
        },
        {
            quantity:qty,
            subTotal:subTotal
        },{
          new:true
        });

        return res.status(200).json({
            message:"Update cart",
            err: false,
            success: true,
            data:updateCartItem
        });
    }catch(err){
        return res.status(500).json({
        message: err.message || err,
        err: true,
        success: false,
        });
    }
}

// delete cart item
export const deleteCartItemController = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "Provide id",
        err: true,
        success: false,
      });
    }

    const result = await CartProductModel.deleteOne({
      _id: id,
      userId: userId
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "Item not found",
        err: true,
        success: false,
      });
    }

    return res.status(200).json({
      message: "Item deleted",
      err: false,
      success: true,
    });

  } catch (err) {
    return res.status(500).json({
      message: err.message,
      err: true,
      success: false,
    });
  }
};

