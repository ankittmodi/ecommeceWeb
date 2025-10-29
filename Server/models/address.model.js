import mongoose from 'mongoose';
const addressSchema=new mongoose.Schema({
  address_line1:{
    type:String,
    default:""
  },
  city:{
    type:String,
    default:""
  },
  state:{
    type:String,
    default:""
  },
  pincode:{
    type:String,
  },
  country:{
    type:String,
  },
  mobile:{
    type:Number,
    default:null
  },
  userId: {
  type: mongoose.Schema.Types.ObjectId,
  required: true
  },
  status: {
    type: Boolean,
    default: true
  },
  selected: {
    type: Boolean,
    default: true
  }

},
{timestamps:true})
const AddressModel=mongoose.model('address',addressSchema);
export default AddressModel;