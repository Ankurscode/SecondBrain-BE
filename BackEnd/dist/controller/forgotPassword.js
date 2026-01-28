"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotPassword = void 0;
const validation_1 = require("../validation");
const bcrypt_1 = __importDefault(require("bcrypt"));
const otpModel_1 = require("../models/otpModel");
const transporter_1 = require("../config/transporter");
const forgotPassword = async (req, res) => {
    try {
        const parser = validation_1.forgotValidation.safeParse(req.body);
        if (!parser.success) {
            res.status(401).json({
                msg: "Their is error in Parsing"
            });
            return;
        }
        const { userEmail } = parser.data;
        const otp = generateOtp();
        const otphash = await bcrypt_1.default.hash(otp, 10);
        //deleting the old opts from this email
        await otpModel_1.optModel.deleteMany({ userEmail });
        await otpModel_1.optModel.create({
            userEmail: userEmail,
            otphash: otphash,
            expiresAt: new Date(Date.now() + 10 * 60 * 1000),
        });
        const transporter = (0, transporter_1.createTransport)();
        await transporter.sendMail({
            from: `"nepalBrain"<${process.env.SMTP_EMAIL}>`,
            to: userEmail,
            subject: "Password Resert OTP",
            html: `
      <h2>Password Reser</h2>
      <p>Your OTP is:</p>
      <h1>${otp}</h1>
      <p>This OTP is valid for 10 minutes</p>
      <p>If you didn't request this, ignore this email.</p>
    `,
        });
        return res.status(200).json({
            msg: "If this email exists, an OTP has been sent",
        });
    }
    catch (e) {
        console.error("Forgot password error:", e);
        return res.status(500).json({
            msg: "Internal server error",
        });
    }
};
exports.forgotPassword = forgotPassword;
const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};
