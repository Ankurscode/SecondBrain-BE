import mongoose ,{Model, Types} from "mongoose";


const contentSchema=new mongoose.Schema({
    link:{type:String,requrie:true},
    constentType:{type:String,require:true},
    title:{type:String,requrie:true},
    tag:[{type:mongoose.Types.ObjectId,ref:"Tag"}],
    userId:[{type:mongoose.Types.ObjectId,ref:"User",require:true}]
})

export const contentModel= mongoose.model("Content",contentSchema)