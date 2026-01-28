"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dbConnect = () => {
    mongoose_1.default.connect(`${process.env.DBUrl}secondBrain12`).then(() => {
        console.log("Connected Successfully");
    }).catch((err) => {
        console.log("Something Wrong", err);
    });
};
exports.default = dbConnect;
