"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shareContent = exports.deleteContent = exports.content = exports.newContents = void 0;
const contentModel_1 = require("../models/contentModel");
const newContents = async (req, res) => {
    try {
        const { link, contentType, title, tag } = req.body;
        const userid = req.userID;
        //checking whether user given all the field or not
        if (!link || !contentType || !title || !userid) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }
        const contentCreated = new contentModel_1.contentModel({
            link: link,
            contentType: contentType,
            title: title,
            tag: tag,
            userId: userid
        });
        await contentCreated.save();
        console.log(contentCreated);
        res.status(200).json({
            message: "Content saved Successfully"
        });
        return;
    }
    catch (e) {
        console.log("Somethi is worng:", e);
        res.status(500).json({
            msg: "Server problem"
        });
    }
};
exports.newContents = newContents;
const content = async (req, res) => {
    try {
        const userID = req.userID;
        if (!userID) {
            return res.status(400).json({ msg: "UserId is needed" });
        }
        const userContents = await contentModel_1.contentModel.find({ userId: userID });
        res.status(200).json(userContents);
    }
    catch (e) {
        console.log("Error occurred in serverSide", e);
        res.status(500).json({ msg: "Server is not working" });
    }
};
exports.content = content;
const deleteContent = async (req, res) => {
    try {
        const userId = req.userID;
        const contentId = req.params.contentId;
        if (!userId || !contentId) {
            return res.status(400).json({ msg: "user not found" });
        }
        const content = await contentModel_1.contentModel.findOne({ userId, _id: contentId });
        if (!content) {
            return res.status(400).json({ msg: "Content not found or unauthorized" });
        }
        await contentModel_1.contentModel.findByIdAndDelete(contentId);
        res.status(200).json({ msg: "Content Deleted" });
    }
    catch (e) {
        console.log("Error occurred", e);
        res.status(500).json({ msg: "Server error" });
    }
};
exports.deleteContent = deleteContent;
const shareContent = async (req, res) => {
    const { userId } = req.params;
    try {
        const documents = await contentModel_1.contentModel.find({ userId: userId });
        res.status(200).json({ data: documents });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.shareContent = shareContent;
