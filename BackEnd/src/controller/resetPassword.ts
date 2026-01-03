import { Request,Response } from "express"
import { resetPasswordValidation} from "../validation"
import { optModel } from "../models/otpModel";
import bcrypt from "bcrypt"

import { userModel } from "../models/userModel";

export const resetPassword=async(req:Request,res:Response)=>{
    try{
        const resetParse=resetPasswordValidation.safeParse(req.body);
        console.log("Body:",resetParse);
        if(!resetParse.success){
            res.status(400).json({
                msg:"Their is Error in parsing the data "
            })
            return
        }

    const {userEmail,userOtp,newPassword}=resetParse.data
    const recordOtp=await optModel.findOne({userEmail})

    if(!recordOtp){
        res.status(400).json({
            msg:"The otp has been experied or not founder"
        })
        return
    }
    if(recordOtp.used){
        return res.status(402).json({
            msg:"OTP has been already used"
        })
    }
    if(recordOtp.attempts>=5){
        return res.status(400).json({
            msg:"Too many attempt"
        })
    }

    const isOtpValid=await bcrypt.compare(userOtp,recordOtp.otphash)
    if(!isOtpValid){
        recordOtp.attempts+=1
        await recordOtp.save()
        return res.status(400).json({
            msg:"Invalid otp"
        })
    }
    const hashedPassword=await bcrypt.hash(newPassword,10)
    await userModel.updateOne({userEmail},{password:hashedPassword})

    recordOtp.used=true;
    await recordOtp.save()

    return res.status(200).json({
        msg:"Password have been reset"
    })

    }catch(e){
        console.log("Something is worng ",e)
        res.status(500).json({
            msg:"Something is wonrg"
        })
    }
    

}