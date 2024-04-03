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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.unFollowUser = exports.followUser = exports.logoutUser = exports.loginUser = exports.signupUser = exports.getSmallUser = exports.getuserProfile = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const index_1 = require("../index");
const cloudinary_1 = require("cloudinary");
const helpers_1 = require("../utils/helpers");
const get_user_1 = require("../utils/get-user");
const following_user_1 = require("../utils/following-user");
const update_user_1 = require("../utils/update-user");
const unfollowing_user_1 = require("../utils/unfollowing-user");
const getuserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.params;
    try {
        const user = yield (0, get_user_1.findUserByUsername)(username);
        return res.status(200).json(user);
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.getuserProfile = getuserProfile;
const getSmallUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userid } = req.params;
    try {
        const user = yield index_1.prisma.user.findUnique({
            where: {
                id: userid,
            },
            select: {
                id: true,
                username: true,
                profilePic: true,
            },
        });
        return res.status(200).json(user);
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
exports.getSmallUser = getSmallUser;
// signup user
const signupUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, username, password } = req.body;
        const user = yield index_1.prisma.user.findUnique({
            where: {
                username,
            },
        });
        if (user) {
            return res.status(400).json({
                error: "Username already in use ",
            });
        }
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        const newUser = yield index_1.prisma.user.create({
            data: {
                name,
                username,
                email,
                password: hashedPassword,
            },
        });
        if (newUser) {
            // lgoin user
            (0, helpers_1.generateAndSetCookie)({
                userid: newUser.id,
                res,
            });
            res.status(201).json({
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                username: newUser.username,
            });
        }
        else {
            res.status(400).json({
                error: "Invalid user data",
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});
exports.signupUser = signupUser;
// login user
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const user = yield index_1.prisma.user.findUnique({
            where: {
                username,
            },
        });
        const isPasswordCorrect = yield bcrypt_1.default.compare(password, (user === null || user === void 0 ? void 0 : user.password) || "");
        if (!user) {
            return res.status(400).json({ error: "Invalid User" });
        }
        if (!isPasswordCorrect) {
            return res.status(400).json({
                error: "Invalid Password",
            });
        }
        (0, helpers_1.generateAndSetCookie)({
            userid: user.id,
            res,
        });
        res.status(200).json({
            id: user.id,
            name: user.name,
            email: user.email,
            username: user.username,
            bio: user.bio,
            profilePic: user.profilePic,
            followingIds: user.followingIds,
            followerIds: user.followerIds,
        });
    }
    catch (error) {
        res.status(500).json({ error: error === null || error === void 0 ? void 0 : error.message });
    }
});
exports.loginUser = loginUser;
// logout user
const logoutUser = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 1 });
        res.status(200).json({ message: "User logged out successfully" });
    }
    catch (err) {
        res.status(500).json({ error: err === null || err === void 0 ? void 0 : err.message });
        console.log("Error in signupUser: ", err.message);
    }
};
exports.logoutUser = logoutUser;
// follow user
const followUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { userid } = req.params;
    try {
        const currUserId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id;
        const userToModify = yield (0, get_user_1.findUserById)(userid);
        //   throw errors
        if (currUserId === (userToModify === null || userToModify === void 0 ? void 0 : userToModify.id)) {
            throw new Error("Cannot follow self");
        }
        if (!userToModify || !currUserId)
            throw new Error("No userid provided");
        yield (0, following_user_1.updateUserFollowing)({
            userId: currUserId,
            followingIdToAdd: userToModify === null || userToModify === void 0 ? void 0 : userToModify.id,
        });
        yield (0, following_user_1.updateUserFollowers)({
            userId: userToModify === null || userToModify === void 0 ? void 0 : userToModify.id,
            followerToAdd: currUserId,
        });
        return res.status(200).json({
            message: `Following updated for ${currUserId}`,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.followUser = followUser;
// un-follow user
const unFollowUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { userid } = req.params;
    try {
        const currUserId = (_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b.id;
        const userToModify = yield (0, get_user_1.findUserById)(userid);
        //   throw errors
        if (currUserId === (userToModify === null || userToModify === void 0 ? void 0 : userToModify.id)) {
            throw new Error("Cannot un-follow self");
        }
        if (!userToModify || !currUserId)
            throw new Error("No userid provided");
        yield (0, unfollowing_user_1.removeUserFollowing)({
            userId: currUserId,
            followingIdToRemove: userToModify === null || userToModify === void 0 ? void 0 : userToModify.id,
        });
        yield (0, unfollowing_user_1.removeUserFollowers)({
            userId: userToModify === null || userToModify === void 0 ? void 0 : userToModify.id,
            followerToRemove: currUserId,
        });
        return res.status(200).json({
            message: `Following updated for ${currUserId}`,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.unFollowUser = unFollowUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req;
    if (!user)
        throw new Error("No user provided");
    const { name, username, bio, profilePic } = req.body;
    try {
        if (!(name || username || bio || profilePic)) {
            throw new Error("No fields provided");
        }
        let newprofileUrl = "";
        if (profilePic) {
            if (user.profilePic) {
                yield cloudinary_1.v2.uploader.destroy(user.profilePic);
            }
            const newprofile = yield cloudinary_1.v2.uploader.upload(profilePic);
            newprofileUrl = newprofile.secure_url;
        }
        const updatedUser = yield (0, update_user_1.updateUserFields)({
            id: user.id,
            name: name || user.name,
            username: username || user.username,
            bio: bio || user.bio,
            profilePic: newprofileUrl || user.profilePic,
        });
        return res.status(202).json(updatedUser);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.updateUser = updateUser;
