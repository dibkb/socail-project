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
exports.findUserByUsername = exports.findUserById = void 0;
const index_1 = require("../index");
function findUserById(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield index_1.prisma.user.findUnique({
                where: {
                    id: userId,
                },
                select: {
                    id: true,
                    name: true,
                    username: true,
                    email: true,
                    password: false,
                    profilePic: true,
                    bio: true,
                    isFrozen: true,
                    createdAt: true,
                    updatedAt: true,
                },
            });
            return user;
        }
        catch (error) {
            console.error("Error finding user by userId:", error);
            throw error;
        }
    });
}
exports.findUserById = findUserById;
function findUserByUsername(username) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield index_1.prisma.user.findUnique({
                where: {
                    username: username,
                },
                select: {
                    id: true,
                    name: true,
                    username: true,
                    email: true,
                    password: false,
                    profilePic: true,
                    bio: true,
                    isFrozen: true,
                    followingIds: true,
                    followerIds: true,
                },
            });
            return user;
        }
        catch (error) {
            console.error("Error finding user by username:", error);
            throw error;
        }
    });
}
exports.findUserByUsername = findUserByUsername;
