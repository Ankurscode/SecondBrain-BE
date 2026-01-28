"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.singIn = exports.singUp = void 0;
const validation_1 = require("../validation");
const userModel_1 = require("../models/userModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const singUp = async (req, res) => {
    try {
        const parse = validation_1.userValidation.safeParse(req.body);
        if (!parse.success) {
            res.status(400).json({
                msg: "Invalid inputs",
                errors: parse.error.format()
            });
            return;
        }
        const { username, userEmail, password } = parse.data;
        const existingUser = await userModel_1.userModel.findOne({ userEmail });
        if (existingUser) {
            res.status(409).json({
                msg: "Mail already exists"
            });
            return;
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 6);
        const user = await userModel_1.userModel.create({
            username: username,
            password: hashedPassword,
            userEmail: userEmail
        });
        res.status(200).json({
            msg: "User created successfully"
        });
    }
    catch (err) {
        if (err instanceof Error) {
            console.log("Something went worng while resiving the data", err.message);
        }
        else {
            console.log("Something went worng while resiving the data", err);
        }
        res.status(500).json({
            msg: "Something went worng while rechiving the data"
        });
    }
};
exports.singUp = singUp;
const singIn = async (req, res) => {
    try {
        const parsed = validation_1.logInValidation.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({
                msg: "Invalid input"
            });
        }
        const { userEmail, password } = parsed.data;
        const user1 = await userModel_1.userModel.findOne({
            userEmail: userEmail
        });
        if (!user1?.userEmail || !user1?.password) {
            res.status(400).json({
                msg: "User not found or password is mistake"
            });
            return;
        }
        const isMatch = await bcrypt_1.default.compare(password, user1?.password);
        if (!isMatch) {
            res.status(400).json({
                msg: "Invalide credentials"
            });
            return;
        }
        if (!process.env.SECRET_KEY) {
            throw new Error("Value not aviable");
        }
        const token = jsonwebtoken_1.default.sign({ userID: user1?._id }, process.env.SECRET_KEY);
        res.status(200).json({
            message: "User successfully logged in",
            token,
            userID: user1._id
        });
        return;
    }
    catch (err) {
        console.log("Something went worng", err);
        res.status(500).json({
            msg: "Error have occured while fetching the data"
        });
        return;
    }
};
exports.singIn = singIn;
