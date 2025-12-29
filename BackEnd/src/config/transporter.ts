import nodemailer from "nodemailer"
import dotenv from "dotenv"
import { success } from "zod"
dotenv.config

console.log("SMTP_EMAIL in mail.ts:", process.env.SMTP_EMAIL);
console.log(
  "SMTP_PASSWORD in mail.ts:",
  process.env.SMTP_PASSWORD ? "LOADED" : "MISSING"
);

export const transporter=nodemailer.createTransport({
    service:"gamil",
    auth:{
        user:process.env.SMTP_EMAIL,
        pass:process.env.SMTP_PASSWORD
    }
})


transporter.verify((error,success)=>{
    if(error){
        console.log("SMTP error ",error)

    }else{
        console.log("SMTP server is ready")
    }
})