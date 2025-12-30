import nodemailer from "nodemailer"
import dotenv from "dotenv"

dotenv.config


export function createTransport(){
    const transporter=nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.SMTP_EMAIL,
            pass:process.env.SMTP_PASSWORD
        }
    })
    return transporter
}