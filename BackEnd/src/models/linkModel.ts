import mongoose from "mongoose"

const LinkSchema=new mongoose.Schema({
    hash:{type:String,require:true},
    userId:{type:mongoose.Types.ObjectId,ref:"User",require:true}
})

export const LinkModel=mongoose.model("Link",LinkSchema)