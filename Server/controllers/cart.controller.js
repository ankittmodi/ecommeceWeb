import CartProductModel from "../models/cartproduct.model.js";
import userModel from "../models/user.model.js";

export const addToCartItemController = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId } = req.body;

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
      quantity: 1,
      userId,
      productId,
    });

    await cartItem.save();

    // ✅ Correct update call
    await userModel.findOneAndUpdate(
      { _id: userId },
      { $push: { shopping_cart: productId } },
      { new: true }
    );

    return res.status(200).json({
      data: true,
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

    const cartItem = await CartProductModel.find({ userId })
      .populate("productId");

    return res.status(200).json({
      data: cartItem,
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
        const {_id,qty}=req.body;

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
            quantity:qty
        });

        return res.status(500).json({
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
export const deleteCartItemController=async(req,res)=>{
    try{
        const userId=req.userId;
        const {_id,productId}=req.body;

        if(!_id){
            return res.status(500).json({
            message: "Provide id",
            err: true,
            success: false,
            });
        }

        const deleteCartItem=await CartProductModel.deleteOne({
            _id:_id,
            userId:userId
        })

        if(!deleteCartItem){
            return res.status(404).json({
            message: "The product in the cart is not found",
            err: true,
            success: false,
            });
        }

        const user=await userModel.findOne({
            _id:userId
        });

        const cartItems=user.shopping_cart;
        const updatedUserCart=[...cartItems.slice(0,cartItems.indexOf(productId)),
             ...cartItems.slice(cartItems.indexOf(productId)+1)];
        
        user.shopping_cart=updatedUserCart;
        await user.save();
        return res.status(200).json({
        message: "Item deleted",
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
