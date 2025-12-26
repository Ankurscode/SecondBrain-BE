import express from "express"
import { userValidation } from "./validation.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import { contentModel, linkModel, userModel } from "./db.js";
import { JWT_Password } from "./config.js";
import { userMiddleware } from "./middleware.js";
import { random } from "./utils.js";
import { hash } from "zod";
import cors  from "cors"


const app=express();
app.use(cors())

const port=3000;





app.use(express.json());
enum ContentType{
        Youtube="youtube",
        Twitter="twitter"   
    }

app.post('/api/v1/signUp',async(req,res)=>{
    const validation=userValidation.parse(req.body);
    if(!validation.username||!validation.password){
        return res.status(441).json({
            msg:"Missing Input"
        })
    }
   try{
    const salt=await bcrypt.genSalt();
    const hashedPassword=await bcrypt.hash(validation.password,salt);

   await userModel.create({
        username:validation.username,
        password:hashedPassword
   })


      res.status(200).json({message:"User Created"})

   }catch(e){
    res.status(500).json({
        msg:"Something in worng",
        msgs:"Username have been used again"
        
    })
    console.log(e)
   } 
})

app.post('/api/v1/signIn',async(req,res)=>{
    const validation=userValidation.parse(req.body);
    if(!validation.username||!validation.password){
        return res.status(411).json({
            msg:"Worng input"
        })
    }
    const users=await userModel.findOne({username:validation.username})
    if(users){
        const token=jwt.sign({id:users._id},JWT_Password)
        res.json({
            token
        })
    }else{
        res.status(403).json({
            msg:"Invalid Inputs"
        })
    }

})

app.post('/api/v1/content',userMiddleware,async(req,res)=>{
   const types=req.body.type;
   const title=req.body.title
   const link=req.body.link;
   await contentModel.create({
    link:link,
    type:types,
    title:title,
    //@ts-ignore
    userId:req.userId,
    tags:[]
   })
   res.json({
    msg:"Content added "
   })

})

app.get('/api/v1/content',userMiddleware,async(req,res)=>{
    const userId=req.userId;
    const constent=await contentModel.find({
        userId:userId,
    }).populate("userId","username")

    res.json({
        constent
    })

})

app.delete('/api/v1/contentDelete',async(req,res)=>{
    const content=req.body.contentId;
    const userId=req.userId;
    await contentModel.deleteMany({
        content:content,
        userId:userId
    })
    res.status(200).json({
        msg:"content deleted"
    })
})

app.post('/api/v1/brain/share',userMiddleware,async(req,res)=>{
    const share=req.body.share;
    if(share){
        const existingLink=await linkModel.findOne({
            userId:req.userId
        })
        if(existingLink){
            res.json({
                hash:existingLink.hash
            })
            return
        }

       await linkModel.create({
            userId:req.userId,
            hash:random(10)
        })
        res.json("/share/"+hash)
    }else{
        await linkModel.deleteOne({
            userId:req.userId
        })
          res.json({
        
        msg:"Remove link"
    })
    }

  

})



app.get('/api/v1/brain/:shareLink',async(req,res)=>{
    const hash=req.params.shareLink;
  const link=await linkModel.findOne({
        hash:hash
    });
    if(!link){
        res.status(411).json({
            msg:"Worng link or inputs"
        })
        return;
    }
    const content=await contentModel.findOne({
        userId:link.userId
    })
    const user=await userModel.findOne({
        userId:link.userId
    })

    res.json({
        username:user?.username,
        content:content
    })
})

app.listen(port);