import AddressModel from "../models/address.model.js";
import userModel from "../models/user.model.js";

export const addAddressController = async (req, res) => {
  try {
    const { address_line1, city, state, pincode, country, mobile, status,selected } = req.body;
    const userId = req.userId;

    // ✅ Check if address already exists for this user
    const existingAddress = await AddressModel.findOne({
      userId,
      address_line1,
      city,
      state,
      pincode,
      country,
      mobile
    });

    if (existingAddress) {
      return res.status(400).json({
        message: "This address already exists!",
        err: true,
        success: false
      });
    }

    const address = new AddressModel({
      address_line1,
      city,
      state,
      pincode,
      country,
      mobile,
      status,
      selected,
      userId
    });

    const saveAddress = await address.save();

    await userModel.updateOne(
      { _id: userId },
      {
        $push: {
          address_details: saveAddress?._id
        }
      }
    );

    return res.status(200).json({
      message: "Address added successfully!",
      err: false,
      success: true
    });

  } catch (err) {
    return res.status(400).json({
      message: err.message,
      err: true,
      success: false
    });
  }
};

export const getAddressController=async (req,res)=>{
    try{
        const address=await AddressModel.find({userId:req?.query?.userId});
        if(!address){
            return res.status(400).json({
            message: "Address not found",
            err: true,
            success: false
            });
        }
        else{
            const userAddress=await userModel.updateOne({_id:req?.query?.userId},{
                $push:{
                    address:address?._id
                }
            })
            return res.status(200).json({
                err:false,
                success:true,
                data:address
            })
        }
        return res.status(400).json({
            err: false,
            success: true,
            address:address
        });
    }catch(err){
        return res.status(400).json({
        message: err.message,
        err: true,
        success: false
    });
    }
}
