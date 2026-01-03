import { Request,Response } from "express"
import { logInValidation, userValidation } from "../validation"
import { userModel } from "../models/userModel";
import bcrypt from "bcrypt"
import jwt  from "jsonwebtoken";
import dotenv from "dotenv"


export const singUp=async(req:Request,res:Response)=>{
    try{
        const parse= userValidation.safeParse(req.body);
        

        if(!parse.success){
            res.status(400).json({
                msg:"Invalid inputs",
                errors:parse.error.format()
            })
            return
        }
        

        const {username,userEmail,password}=parse.data
        
        const existingUser=await userModel.findOne({userEmail})

        if(existingUser){
            res.status(409).json({
                msg:"Mail already exists"
            })
            return;
        }
        const hashedPassword=await bcrypt.hash(password,6)
        const user=await userModel.create({
            username:username,
            password:hashedPassword,
            userEmail:userEmail
        })
        res.status(200).json({
            msg:"User created successfully"
        })
    }catch(err:unknown){
        if(err instanceof Error){
            console.log("Something went worng while resiving the data",err.message)
        }else{
            console.log("Something went worng while resiving the data",err)
        }
        res.status(500).json({
            msg:"Something went worng while rechiving the data"
        })
    }
}

export const singIn=async(req:Request,res:Response)=>{
    try{
        const parsed=logInValidation.safeParse(req.body);
        if(!parsed.success){
            return res.status(400).json({
                msg:"Invalid input"
            })
        }
        const {userEmail,password}=parsed.data
        
        
        const user1=await userModel.findOne({
            userEmail:userEmail
        })


       if(!user1?.userEmail||!user1?.password){
        res.status(400).json({
            msg:"User not found or password is mistake"
        })
        return
       }

       const isMatch=await bcrypt.compare(password,user1?.password)
       if(!isMatch){
        res.status(400).json({
            msg:"Invalide credentials"
        })
        return
       }
       if(!process.env.SECRET_KEY){
        throw new Error("Value not aviable")
        
       }

       const token=jwt.sign({userID:user1?._id},process.env.SECRET_KEY)

       res.status(200).json({
        message:"User successfully logged in",
        token,
        userID:user1._id
       })
       
       return
    }catch(err){
          console.log("Something went worng",err)
        res.status(500).json({
            msg:"Error have occured while fetching the data"
        })
        return
    }
}
