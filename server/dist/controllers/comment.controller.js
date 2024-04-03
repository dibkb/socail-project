"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommentsByUserId = exports.getCommentsUser = exports.getComments = exports.createComment = void 0;
const index_1 = require("../index");
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req;
    const { postid } = req.params;
    if (!user)
        throw new Error("No user provided");
    const { body } = req.body;
    try {
        if (!body || !postid) {
            throw new Error("No comment body or postid provided");
        }
        const createdComment = yield index_1.prisma.comment.create({
            data: {
                body,
                userId: user.id,
                postId: postid,
            },
            select: {
                id: true,
                body: true,
                userId: true,
                createdAt: true,
            },
        });
        return res.status(201).json(createdComment);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.createComment = createComment;
const getComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req;
    const { postid } = req.params;
    if (!user)
        throw new Error("No user provided");
    try {
        const allComments = yield index_1.prisma.comment.findMany({
            where: {
                postId: postid,
            },
            select: {
                id: true,
                body: true,
                userId: true,
                createdAt: true,
            },
        });
        return res.status(200).json(allComments);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getComments = getComments;
const getCommentsUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req;
    if (!user)
        throw new Error("No user provided");
    try {
        const allComments = yield index_1.prisma.comment.findMany({
            where: {
                userId: user.id,
            },
            include: {
                post: true,
            },
        });
        return res.status(200).json(allComments);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getCommentsUser = getCommentsUser;
const getCommentsByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req;
    const { userid } = req.params;
    if (!user)
        throw new Error("No user provided");
    try {
        const allComments = yield index_1.prisma.comment.findMany({
            where: {
                userId: userid,
            },
            include: {
                post: true,
            },
        });
        return res.status(200).json(allComments);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getCommentsByUserId = getCommentsByUserId;
