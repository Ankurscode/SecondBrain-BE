import { Response } from "express"
import { AuthRequest } from "../middleware/authMiddleware"
import { userModel } from "../models/userModel";
import { contentModel } from "../models/contentModel";
export const newContents=async(req:AuthRequest,res:Response)=>{
    try{
    const {link,constentType,title,tag} = req.body;
    const userid = req.userID;

    //checking whether user given all the field or not
    if (!link || !constentType || !title || !userid) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const contentCreated = new contentModel({
      link:link,
      constentType:constentType,
      title:title,
      tag:tag,
      userId:userid
    })

    await contentCreated.save();
    console.log(contentCreated)
    res.status(200).json({
      message: "Content saved Successfully"
    })
    return;
    }catch(e){
        console.log("Somethi is worng:",e)
        res.status(500).json({
            msg:"Server problem"
        })
    }
}

export const content=async(req:AuthRequest,res:Response)=>{
    try{
        const userID=req.userID
        console.log(userID)
    if(!userID){
        res.status(400).json({
            msg:"UserId is need "
        })
        return
    }
    const Usercontents=await contentModel.find({userId:userID})
    
    res.status(200).json({
        msg:"User contents",
        data:Usercontents,
    })
    
    }catch(e){
        console.log("Error occured in serverSide",e)
        res.status(500).json({
            msg:"Server is not working"
        })
        return
    }
    
}

export const deleteContent=async(req:AuthRequest,res:Response)=>{
    try{
        const userId=req.userID;
    const contentId=req.params.contentId;
    
    if(!userId||!contentId){
        res.status(400).json({
            msg:"user not found"
        })
    }
    const userDel=await contentModel.findOne({userId:userId,_id:contentId})
    
    if(!userDel){
        res.status(400).json({
            msg:"Content not found or unothorized"
        })
        return
    }
    await contentModel.findByIdAndDelete(userDel)
    res.status(200).json({
        msg:"Content Deleted"
    })
    return

    }catch(e){  
        console.log("Error occured",e)
        res.status(500).json({
            msg:"Server error"
        })

    }
}

export const shareContent = async(req: AuthRequest, res: Response)=>{
  const { userId } = req.params;
  try {
    const documents = await contentModel.find({ userId:userId });
    res.status(200).json({ data: documents });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}