import mongoose,{Schema} from "mongoose"

const forgotPassword=new mongoose.Schema({
    userEmail:{type:String, require:true,index:true},
    optHash:{type:String,require:true},
    expireAt:{type:Date,require:true,index:true},
    
});

export const  forgotModel=mongoose.model("forgot",forgotPassword)