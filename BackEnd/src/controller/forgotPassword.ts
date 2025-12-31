import { userModel } from "../models/userModel"
import { Request,Response } from "express";
import { forgotValidation } from "../validation"
import bcrypt from "bcrypt"
import { optModel } from "../models/otpModel";
import {createTransport} from "../config/transporter"


export const forgotPassword=async(req:Request,res:Response)=>{
  try{
     const parser=forgotValidation.safeParse(req.body)
  if(!parser.success){
    res.status(401).json({
      msg:"Their is error in Parsing"
    })
    return
  }
  const {userEmail}=parser.data

  const otp=generateOtp()
  const otphash=await bcrypt.hash(otp,10)
 

  //deleting the old opts from this email
  await optModel.deleteMany({userEmail})
  
  await optModel.create({
      userEmail: userEmail,
      otphash: otphash,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
  })
  
  const transporter=createTransport()
  await transporter.sendMail({
    from:`"nepalBrain"<${process.env.SMTP_EMAIL}>`,
    to:userEmail,
    subject:"Password Resert OTP",
    html:`
      <h2>Password Reser</h2>
      <p>Your OTP is:</p>
      <h1>${otp}</h1>
      <p>This OTP is valid for 10 minutes</p>
      <p>If you didn't request this, ignore this email.</p>
    `,
  })

  return res.status(200).json({
        msg: "If this email exists, an OTP has been sent",
        
  })

  }catch(e){
  console.error("Forgot password error:", e);
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
 


  
}


const generateOtp=():string=>{
  return Math.floor(100000+Math.random()*900000).toString();
}

