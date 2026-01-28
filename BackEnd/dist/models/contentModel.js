"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const contentSchema = new mongoose_1.default.Schema({
    link: {
        type: String,
        required: true
    },
    contentType: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    tag: {
        type: String
    },
    userId: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "User",
        required: true
    }
});
exports.contentModel = mongoose_1.default.model("Content", contentSchema);
