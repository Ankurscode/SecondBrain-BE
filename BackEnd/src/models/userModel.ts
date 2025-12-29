import mongoose,{Types,model, mongo} from "mongoose";

const userSchema=new mongoose.Schema({
    username:{type:String,require:true,unique:true},
    password:{type:String,require:true},
    userEmail:{type:String,require:true,unique:true}
})

export const userModel=mongoose.model("User",userSchema)