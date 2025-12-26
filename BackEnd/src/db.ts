import mongoose ,{Schema,model} from "mongoose"



mongoose.connect('mongodb+srv://Ankurs:l80u0wZzl8JQSH7W@cluster0.pgife.mongodb.net/secondBrain12')
.then(()=>console.log("db connected"));

const userSchema=new Schema({
    username:{type:String,unique:true},
    password:{type:String,require:true}
})

export const userMode1l=mongoose.model("User",userSchema)  

const tagsSchema=new Schema({
    title:String
})

export const tagModel=mongoose.model("Tag",tagsSchema);


const contentSchema=new Schema({
    title:String,
    type:String,
    link:String,
    tags:[{type:mongoose.Types.ObjectId,ref:"Tag"}],
    userId:{type:mongoose.Types.ObjectId,ref:"User",require:true}
})

export const contentModel1=mongoose.model("Content",contentSchema)

const LinkSchema=new Schema({
    hash:String,
    userId:{type:mongoose.Types.ObjectId,ref:"User",require:true,unique:true}
})
export const linkModel=mongoose.model("Link",LinkSchema)
