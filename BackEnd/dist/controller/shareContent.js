"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shrelink = exports.share = void 0;
const linkModel_1 = require("../models/linkModel");
const zod_1 = require("zod");
const utils_1 = require("../utils");
const contentModel_1 = require("../models/contentModel");
const userModel_1 = require("../models/userModel");
const share = async (req, res) => {
    try {
        const userID = req.userID;
        const share = req.body.share;
        if (share) {
            const existingLink = await linkModel_1.LinkModel.findOne({
                userId: userID
            });
            if (existingLink) {
                res.json({
                    hash: existingLink.hash
                });
                return;
            }
            await linkModel_1.LinkModel.create({
                userId: userID,
                hash: (0, utils_1.random)(10)
            });
            console.log(zod_1.hash);
            res.json("/share/" + zod_1.hash);
        }
        else {
            await linkModel_1.LinkModel.deleteOne({
                userId: userID
            });
            res.json({
                msg: "Removed linked"
            });
        }
    }
    catch (e) {
        console.log("Error", e);
        res.status(500).json({
            msg: "Server error"
        });
    }
};
exports.share = share;
const shrelink = async (req, res) => {
    try {
        const userID = req.userID;
        const hash = req.params.shareLink;
        const link = await linkModel_1.LinkModel.findOne({
            hash: hash
        });
        if (!link) {
            res.status(400).json({
                msg: "Invalid link provided"
            });
            return;
        }
        const content = await contentModel_1.contentModel.find({
            userId: userID
        });
        const user = await userModel_1.userModel.find({
            userId: userID
        });
        res.status(200).json({
            content,
            user
        });
    }
    catch (e) {
        console.log("error", e);
        res.status(500).json({
            msg: "Server error"
        });
    }
};
exports.shrelink = shrelink;
