"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const forgotPassword = new mongoose_1.default.Schema({
    userEmail: { type: String, require: true, index: true },
    optHash: { type: String, require: true },
    expireAt: { type: Date, require: true, index: true },
});
exports.forgotModel = mongoose_1.default.model("forgot", forgotPassword);
