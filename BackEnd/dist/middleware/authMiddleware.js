"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isAuthenticated = (req, res, next) => {
    // try{
    // //     const token = typeof req.headers.token === "string" ? req.headers.token : undefined;
    //     console.log(token)
    //     if(!token){
    //         res.status(400).json({
    //             msg:"Bad Token request"
    //         })
    //         return
    //     }
    //     if(!process.env.SECRET_KEY){
    //         res.status(500).json({
    //             msg:"server internal problem"
    //         })
    //         return
    //     }
    //     const decode=jwt.verify(token,process.env.SECRET_KEY)as unknown as{userID:Types.ObjectId};
    //     req.userID=decode.userID;
    //     next()
    // }catch(e){
    //     res.status(400).json({
    //         msg:`Invalid or expaled token${e}`
    //     })
    //     return
    // }
    try {
        const token = req.headers.authorization;
        if (!process.env.SECRET_KEY) {
            res.status(400).json({
                msg: "Token key is not found"
            });
            return;
        }
        if (!token) {
            res.status(400).json({
                msg: "Token not found"
            });
            return;
        }
        const decode = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
        req.userID = decode.userID;
        next();
    }
    catch (e) {
        res.status(500).json({
            msg: "This error is occuring in server"
        });
        console.log("Error:", e);
    }
};
exports.isAuthenticated = isAuthenticated;
