import express from "express"
import { userValidation } from "./validation.js";
import jwt from "jsonwebtoken"
const app=express();


const port=3000;
app.listen(port);

app.use(express.json());


app.post('/api/v1/signUp',async(req,res)=>{
    
})

app.post('/api/v1/signIn',async(req,res)=>{

})

app.post('/api/v1/content',async(req,res)=>{

})

app.get('/api/v1/content',async(req,res)=>{

})

app.delete('/api/v1/content',async(req,res)=>{

})

app.post('/api/v1/brain/share',(req,res)=>{

})

app.get('/api/v1/brain/:shareLink',(req,res)=>{
    
})