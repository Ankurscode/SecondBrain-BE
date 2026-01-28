"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = void 0;
const validation_1 = require("../validation");
const otpModel_1 = require("../models/otpModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userModel_1 = require("../models/userModel");
const resetPassword = async (req, res) => {
    try {
        const resetParse = validation_1.resetPasswordValidation.safeParse(req.body);
        console.log("Body:", resetParse);
        if (!resetParse.success) {
            res.status(400).json({
                msg: "Their is Error in parsing the data "
            });
            return;
        }
        const { userEmail, userOtp, newPassword } = resetParse.data;
        const recordOtp = await otpModel_1.optModel.findOne({ userEmail });
        if (!recordOtp) {
            res.status(400).json({
                msg: "The otp has been experied or not founder"
            });
            return;
        }
        if (recordOtp.used) {
            return res.status(402).json({
                msg: "OTP has been already used"
            });
        }
        if (recordOtp.attempts >= 5) {
            return res.status(400).json({
                msg: "Too many attempt"
            });
        }
        const isOtpValid = await bcrypt_1.default.compare(userOtp, recordOtp.otphash);
        if (!isOtpValid) {
            recordOtp.attempts += 1;
            await recordOtp.save();
            return res.status(400).json({
                msg: "Invalid otp"
            });
        }
        const hashedPassword = await bcrypt_1.default.hash(newPassword, 10);
        await userModel_1.userModel.updateOne({ userEmail }, { password: hashedPassword });
        recordOtp.used = true;
        await recordOtp.save();
        return res.status(200).json({
            msg: "Password have been reset"
        });
    }
    catch (e) {
        console.log("Something is worng ", e);
        res.status(500).json({
            msg: "Something is wonrg"
        });
    }
};
exports.resetPassword = resetPassword;
