import mongoose from "mongoose";


const optSchema=new mongoose.Schema({
    userEmail:{type:String,require:true,index:true},
    otphash:{type:String,required:true},
    expiresAt:{type:Date,required:true},
    attempts:{type:Number,default:0,max:5},
    used:{type:Boolean,default:false},

},{timestamps:true})


optSchema.index({expiresAt:1},{expireAfterSeconds:0})

export const optModel=mongoose.model("OTP",optSchema)