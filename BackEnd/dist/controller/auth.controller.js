"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleAuth = void 0;
const firebase_admin_1 = __importDefault(require("../config/firebase-admin"));
const googleAuth = async (req, res) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ meg: "Token missing" });
        }
        const decode = await firebase_admin_1.default.auth().verifyIdToken(token);
        return res.json({
            msg: "Login successfully",
            user: {
                uid: decode.uid,
                email: decode.email,
                name: decode.name
            },
        });
    }
    catch (e) {
        return res.status(500).json({ msg: "Invalid token" });
        console.log("Something is worng", e);
    }
};
exports.googleAuth = googleAuth;
