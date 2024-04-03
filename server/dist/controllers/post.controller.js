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
exports.updatePost = exports.getEveryPost = exports.getAllPostsByUsername = exports.getAllPosts = exports.unlikePost = exports.likePost = exports.getPost = exports.createThreads = exports.createPost = void 0;
const cloudinary_1 = require("cloudinary");
const index_1 = require("../index");
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req;
    const { body, image } = req.body;
    try {
        if (!user)
            throw new Error("No user provided");
        if (!(body || image)) {
            throw new Error("No fields provided");
        }
        let imgurl = "";
        if (image) {
            const uploadedResponse = yield cloudinary_1.v2.uploader.upload(image);
            imgurl = uploadedResponse.secure_url;
        }
        const post = yield index_1.prisma.post.create({
            data: {
                body,
                userId: user.id,
                image: imgurl,
            },
        });
        return res.status(201).json(post);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.createPost = createPost;
const createThreads = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req;
    try {
        if (!user)
            throw new Error("No user provided");
        const { title, image, posts } = req.body;
        let imgurl = "";
        if (image) {
            const uploadedResponse = yield cloudinary_1.v2.uploader.upload(image);
            imgurl = uploadedResponse.secure_url;
        }
        const createFirstPost = yield index_1.prisma.post.create({
            data: {
                body: title,
                userId: user.id,
                image: imgurl,
            },
        });
        const updatedPosts = yield createPosts(posts, user.id);
        const createdThread = yield index_1.prisma.thread.create({
            data: {
                posts: {
                    connect: [createFirstPost, ...updatedPosts].map((post) => ({
                        id: post.id,
                    })),
                },
            },
            include: {
                posts: true,
            },
        });
        return res.status(201).json(createdThread);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.createThreads = createThreads;
const getPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req;
    const { postid } = req.params;
    try {
        if (!user)
            throw new Error("No user provided");
        const post = yield index_1.prisma.post.findUnique({
            where: { id: postid },
        });
        return res.status(201).json(post);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getPost = getPost;
const likePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req;
    const { postid } = req.params;
    try {
        if (!user)
            throw new Error("No user provided");
        const post = yield index_1.prisma.post.findUnique({
            where: { id: postid },
        });
        if (!post)
            throw new Error("Post id not valid");
        if (post === null || post === void 0 ? void 0 : post.likedIds.includes(user.id)) {
            throw new Error("User already liked the post");
        }
        const updatedUser = yield index_1.prisma.post.update({
            where: {
                id: postid,
            },
            data: {
                likedIds: {
                    push: user.id,
                },
            },
        });
        return res.status(201).json(updatedUser);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.likePost = likePost;
const unlikePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req;
    const { postid } = req.params;
    try {
        if (!user)
            throw new Error("No user provided");
        const post = yield index_1.prisma.post.findUnique({
            where: { id: postid },
        });
        if (!post)
            throw new Error("Post id not valid");
        if (!(post === null || post === void 0 ? void 0 : post.likedIds.includes(user.id))) {
            throw new Error("User not liked the post");
        }
        const updatedPost = yield index_1.prisma.post.update({
            where: {
                id: postid,
            },
            data: {
                likedIds: {
                    set: post.likedIds.filter((id) => id !== user.id),
                },
            },
        });
        return res.status(201).json(updatedPost);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.unlikePost = unlikePost;
const getAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req;
    const { userid } = req.params;
    try {
        if (!user)
            throw new Error("No user provided");
        const posts = yield index_1.prisma.post.findMany({
            where: {
                userId: userid,
            },
        });
        const threads = yield index_1.prisma.thread.findMany({
            where: {
                posts: {
                    some: {
                        userId: userid,
                    },
                },
            },
        });
        return res.status(201).json({
            posts: posts,
            threads: threads,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getAllPosts = getAllPosts;
const getAllPostsByUsername = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req;
    const { username } = req.params;
    try {
        if (!user)
            throw new Error("No user provided");
        const foundUser = yield index_1.prisma.user.findUnique({
            where: {
                username: username,
            },
            select: {
                id: true,
            },
        });
        if (!foundUser) {
            throw new Error("User not found");
        }
        const posts = yield index_1.prisma.post.findMany({
            where: {
                userId: foundUser.id,
            },
        });
        const threads = yield index_1.prisma.thread.findMany({
            where: {
                posts: {
                    some: {
                        userId: foundUser.id,
                    },
                },
            },
        });
        return res.status(200).json({
            posts: posts,
            threads: threads,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getAllPostsByUsername = getAllPostsByUsername;
const createPosts = (posts, userid) => __awaiter(void 0, void 0, void 0, function* () {
    const createdPosts = [];
    for (const post of posts) {
        let imgurl = "";
        if (post === null || post === void 0 ? void 0 : post.image) {
            const uploadedResponse = yield cloudinary_1.v2.uploader.upload(post.image);
            imgurl = uploadedResponse.secure_url;
        }
        const createdPost = yield index_1.prisma.post.create({
            data: {
                body: post.body,
                userId: userid,
                image: imgurl,
            },
        });
        createdPosts.push(createdPost);
    }
    return createdPosts;
});
const getEveryPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req;
    const { per_page, page } = req.query;
    try {
        if (!user)
            throw new Error("No user provided");
        const offset = (Number(page) - 1) * Number(per_page);
        // console.log("per_page", per_page);
        // console.log("page", page);
        // console.log("offset", offset);
        const posts = yield index_1.prisma.post.findMany({
            take: Number(per_page),
            skip: offset,
            orderBy: {
                createdAt: "desc",
            },
        });
        const threads = yield index_1.prisma.thread.findMany({
            take: Number(per_page),
            skip: offset,
            orderBy: {
                createdAt: "desc",
            },
        });
        return res.status(200).json({
            posts: posts,
            threads: threads,
        });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getEveryPost = getEveryPost;
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req;
    const { postid } = req.params;
    const { body, image } = req.body;
    try {
        if (!user)
            throw new Error("No user provided");
        if (!postid)
            throw new Error("No postid provided");
        if (!(body || image)) {
            throw new Error("No fields provided");
        }
        const post = yield index_1.prisma.post.findUnique({
            where: {
                id: postid,
            },
        });
        if ((post === null || post === void 0 ? void 0 : post.userId) !== user.id) {
            throw new Error("Not authorized");
        }
        // delete cloudinary image if available
        if (image && post.image) {
            yield cloudinary_1.v2.uploader.destroy(post === null || post === void 0 ? void 0 : post.image);
        }
        let newimage = "";
        if (image) {
            const newprofile = yield cloudinary_1.v2.uploader.upload(image);
            newimage = newprofile.secure_url;
        }
        const updatedPost = yield index_1.prisma.post.update({
            where: {
                id: postid,
            },
            data: {
                body: body || post.body,
                image: newimage.length ? newimage : post.image,
            },
        });
        return res.status(200).json(updatedPost);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.updatePost = updatePost;
