import AddressModel from "../models/address.model.js";
import userModel from "../models/user.model.js";

export const addAddressController = async (req, res) => {
  try {
    const { address_line1, city, state, pincode, country, mobile, landmark, addressType, userId } = req.body;

    // ✅ Check duplicates using body
    const existingAddress = await AddressModel.findOne({
      userId,
      address_line1,
      city,
      state,
      pincode,
      country,
      mobile,
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
      landmark,
      addressType,
      userId
    });

    const saveAddress = await address.save();

    await userModel.updateOne(
      { _id: userId },
      {
        $push: {
          address_details: saveAddress._id
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


// export const getAddressController=async (req,res)=>{
//     try{
//         const address=await AddressModel.find({userId:req?.query?.userId});
//         if(!address){
//             return res.status(400).json({
//             message: "Address not found",
//             err: true,
//             success: false
//             });
//         }
//         else{
//             const userAddress=await userModel.updateOne({_id:req?.query?.userId},{
//                 $push:{
//                     address:address?._id
//                 }
//             })
//             return res.status(200).json({
//                 err:false,
//                 success:true,
//                 data:address
//             })
//         }
//     }catch(err){
//         return res.status(400).json({
//         message: err.message,
//         err: true,
//         success: false
//     });
//     }
// }


// export const selectAddressController=async(req,res)=>{
//   try{
//     const userId=req.userId;
//     const address=await AddressModel.find({
//       _id:req.params.id,
//       userId:userId
//     })

//     if(!address){
//       return res.status(500).json({
//         message: err.message,
//         err: true,
//         success: false
//     });
//     }
//     else{
//       const updateAddress=await AddressModel.find(
//         {
//           userId:userId
//         }
//       )
//       return res.json({
//         err:false,
//         success:true,
//         address:updateAddress
//       })
//     }
//   }catch(err){
//     return res.status(400).json({
//         message: err.message,
//         err: true,
//         success: false
//     });
//   }
// }
export const getAddressController = async (req, res) => {
  try {
    const address = await AddressModel.find({ userId: req?.query?.userId });

    return res.status(200).json({
      err: false,
      success: true,
      data: address
    });

  } catch (err) {
    return res.status(400).json({
      message: err.message,
      err: true,
      success: false
    });
  }
}



export const deleteAddressController=async(req,res)=>{
    try{
        const userId=req.userId;
        const id=req.params.id;

        if(!id){
            return res.status(500).json({
            message: "Provide id",
            err: true,
            success: false,
            });
        }

        const deleteItem=await AddressModel.deleteOne({
            _id:id,
            userId:userId
        })

        if(!deleteItem){
            return res.status(404).json({
            message: "The product in the database is not found",
            err: true,
            success: false,
            });
        }

        // const address=await AddressModel.findOne({
        //     _id:userId
        // });

        
        // await address.save();
        return res.status(200).json({
        message: "Address deleted",
        err: false,
        success: true,
        data:deleteItem
        });
    }catch(err){
        return res.status(500).json({
        message: err.message || err,
        err: true,
        success: false,
        });
    }
}
