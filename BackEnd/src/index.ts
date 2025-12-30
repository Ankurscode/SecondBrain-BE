import express, { Router } from "express"

import dotenv from "dotenv"
dotenv.config()
import dbConnect from "./config/db";
import cors  from "cors"
import cookieParser from "cookie-parser"
import { routes } from "./routes/PagesRoutes";
import "./config/transporter"

import "dotenv/config";

console.log("ENV TEST:", {
  SMTP_EMAIL: process.env.SMTP_EMAIL,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
});




const app=express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(cookieParser())

dbConnect()

app.use("/api/v1",routes)
app.listen(process.env.PORT,()=>{
    msg:"Server is runnning and providing services"
}
)
// enum ContentType{
//         Youtube="youtube",
//         Twitter="twitter"   
//     }

// app.post('/api/v1/signUp',async(req,res)=>{
//     const validation=userValidation.parse(req.body);
//     if(!validation.username||!validation.password){
//         return res.status(441).json({
//             msg:"Missing Input"
//         })
//     }
//    try{
//     const salt=await bcrypt.genSalt();
//     const hashedPassword=await bcrypt.hash(validation.password,salt);

//    await userModel.create({
//         username:validation.username,
//         password:hashedPassword
//    })


//       res.status(200).json({message:"User Created"})

//    }catch(e){
//     res.status(500).json({
//         msg:"Something in worng",
//         msgs:"Username have been used again"
        
//     })
//     console.log(e)
//    } 
// })

// app.post('/api/v1/signIn',async(req,res)=>{
//     const validation=userValidation.parse(req.body);
//     if(!validation.username||!validation.password){
//         return res.status(411).json({
//             msg:"Worng input"
//         })
//     }
//     const users=await userModel.findOne({username:validation.username})
//     if(users){
//         const token=jwt.sign({id:users._id},JWT_Password)
//         res.json({
//             token
//         })
//     }else{
//         res.status(403).json({
//             msg:"Invalid Inputs"
//         })
//     }

// })

// app.post('/api/v1/content',userMiddleware,async(req,res)=>{
//    const types=req.body.type;
//    const title=req.body.title
//    const link=req.body.link;
//    await contentModel.create({
//     link:link,
//     type:types,
//     title:title,
//     //@ts-ignore
//     userId:req.userId,
//     tags:[]
//    })
//    res.json({
//     msg:"Content added "
//    })

// })

// app.get('/api/v1/content',userMiddleware,async(req,res)=>{
//     const userId=req.userId;
//     const constent=await contentModel.find({
//         userId:userId,
//     }).populate("userId","username")

//     res.json({
//         constent
//     })

// })

// app.delete('/api/v1/contentDelete',async(req,res)=>{
//     const content=req.body.contentId;
//     const userId=req.userId;
//     await contentModel.deleteMany({
//         content:content,
//         userId:userId
//     })
//     res.status(200).json({
//         msg:"content deleted"
//     })
// })

// app.post('/api/v1/brain/share',userMiddleware,async(req,res)=>{
//     const share=req.body.share;
//     if(share){
//         const existingLink=await LinkModel.findOne({
//             userId:req.userId
//         })
//         if(existingLink){
//             res.json({
//                 hash:existingLink.hash
//             })
//             return
//         }

//        await LinkModel.create({
//             userId:req.userId,
//             hash:random(10)
//         })
//         res.json("/share/"+hash)
//     }else{
//         await LinkModel.deleteOne({
//             userId:req.userId
//         })
//           res.json({
        
//         msg:"Remove link"
//     })
//     }

  

// })



// app.get('/api/v1/brain/:shareLink',async(req,res)=>{
//     const hash=req.params.shareLink;
//   const link=await LinkModel.findOne({
//         hash:hash
//     });
//     if(!link){
//         res.status(411).json({
//             msg:"Worng link or inputs"
//         })
//         return;
//     }
//     const content=await contentModel.findOne({
//         userId:link.userId
//     })
//     const user=await userModel.findOne({
//         userId:link.userId
//     })

//     res.json({
//         username:user?.username,
//         content:content
//     })
// })

// app.listen(port);