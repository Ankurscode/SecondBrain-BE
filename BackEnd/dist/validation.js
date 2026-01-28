"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordValidation = exports.verifyOtpValidation = exports.forgotValidation = exports.logInValidation = exports.userValidation = void 0;
const zod_1 = __importDefault(require("zod"));
exports.userValidation = zod_1.default.object({
    username: zod_1.default.string().min(3),
    userEmail: zod_1.default.string().email(),
    password: zod_1.default.string().min(4)
});
exports.logInValidation = zod_1.default.object({
    userEmail: zod_1.default.string().email(),
    password: zod_1.default.string().min(4)
});
exports.forgotValidation = zod_1.default.object({
    userEmail: zod_1.default.string().email(),
});
exports.verifyOtpValidation = zod_1.default.object({
    useEmail: zod_1.default.string().email("Invalid email address"),
    otp: zod_1.default.string().length(6)
});
exports.resetPasswordValidation = zod_1.default.object({
    userEmail: zod_1.default.string().email(),
    userOtp: zod_1.default.string(),
    newPassword: zod_1.default.string().min(4)
});
