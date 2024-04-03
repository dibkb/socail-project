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
exports.getThread = void 0;
const index_1 = require("../index");
const getThread = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req;
    const { threadId } = req.params;
    if (!user)
        throw new Error("No user provided");
    try {
        const threadWithPosts = yield index_1.prisma.thread.findUnique({
            where: { id: threadId },
            include: {
                posts: true, // Fetch all connected posts
            },
        });
        return res.status(201).json(threadWithPosts);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getThread = getThread;
