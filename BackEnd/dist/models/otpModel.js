"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.optModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const optSchema = new mongoose_1.default.Schema({
    userEmail: { type: String, require: true, index: true },
    otphash: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    attempts: { type: Number, default: 0, max: 5 },
    used: { type: Boolean, default: false },
}, { timestamps: true });
optSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
exports.optModel = mongoose_1.default.model("OTP", optSchema);
