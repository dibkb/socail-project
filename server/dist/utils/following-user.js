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
exports.updateUserFollowers = exports.updateUserFollowing = void 0;
const index_1 = require("../index");
function updateUserFollowing({ userId, followingIdToAdd, }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield index_1.prisma.user.findUnique({
                where: {
                    id: userId,
                },
            });
            if (!user) {
                throw new Error("User not found");
            }
            if (user.followingIds.includes(followingIdToAdd)) {
                throw new Error("FollowingId already exists");
            }
            const updatedUser = yield index_1.prisma.user.update({
                where: {
                    id: userId,
                },
                data: {
                    followingIds: {
                        push: followingIdToAdd,
                    },
                },
            });
            return updatedUser;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.updateUserFollowing = updateUserFollowing;
function updateUserFollowers({ userId, followerToAdd, }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield index_1.prisma.user.findUnique({
                where: {
                    id: userId,
                },
            });
            if (!user) {
                throw new Error("User not found");
            }
            if (user.followerIds.includes(followerToAdd)) {
                throw new Error("FollowerId already exists");
            }
            const updatedUser = yield index_1.prisma.user.update({
                where: {
                    id: userId,
                },
                data: {
                    followerIds: {
                        push: followerToAdd,
                    },
                },
            });
            return updatedUser;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.updateUserFollowers = updateUserFollowers;
