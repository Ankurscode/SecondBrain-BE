import { AuthRequest } from "../middleware/authMiddleware"
import { Response } from "express"
import { LinkModel } from "../models/linkModel";
import { hash } from "zod";
import { random } from "../utils";
import { contentModel } from "../models/contentModel";
import { userModel } from "../models/userModel";



export const share=async(req:AuthRequest,res:Response)=>{
    try{
          const userID=req.userID
         const share=req.body.share;
         if(share){
        const existingLink=await LinkModel.findOne({
            userId:userID
        })
        if(existingLink){
            res.json({
                hash:existingLink.hash
            })
            return
        }
        await LinkModel.create({
            userId:userID,
            hash:random(10)
        })
        console.log(hash)
        res.json("/share/"+hash)
    }
    else{
        await LinkModel.deleteOne({
            userId:userID
        })
        res.json({
            msg:"Removed linked"
        })
    }
    }catch(e){
        console.log("Error",e)
        res.status(500).json({
            msg:"Server error"
        })
    }
  
}   

export const shrelink=async(req:AuthRequest,res:Response)=>{
    try{
         const userID=req.userID;
    const hash=req.params.shareLink
    const link= await LinkModel.findOne({
        hash:hash
    })
    if(!link){
        res.status(400).json({
            msg:"Invalid link provided"
        })
        return
    }
    const content=await contentModel.find({
        userId:userID
    })
    const user=await userModel.find({
        userId:userID
    })
    res.status(200).json({
        content,
        user
    })

    }catch(e){
        console.log("error",e)
        res.status(500).json({
            msg:"Server error"
        })
    }
   }