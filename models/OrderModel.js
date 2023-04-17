import mongoose from "mongoose";
const OrderSchema = new mongoose.Schema({
  products: [
    {
      type: mongoose.ObjectId,
      ref: "Products",
    },
  ],
  payment:{},
  buyers:{
    type:mongoose.ObjectId,
    ref:'users'
  },
  status:{
    type:String,
    default:'Not Process',
    enum:["Not process", "Processing","Shipped", "Delivered", "Cancel"],
  }
},{timestamps:true});

export default mongoose.model("Order", OrderSchema);
