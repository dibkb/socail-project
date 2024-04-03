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
exports.removeUserFollowers = exports.removeUserFollowing = void 0;
const index_1 = require("../index");
function removeUserFollowing({ userId, followingIdToRemove, }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield index_1.prisma.user.findUnique({
                where: {
                    id: userId,
                },
                select: {
                    followingIds: true,
                },
            });
            if (!user) {
                throw new Error("User not found");
            }
            if (user.followingIds.includes(followingIdToRemove)) {
                const updatedUser = yield index_1.prisma.user.update({
                    where: {
                        id: userId,
                    },
                    data: {
                        followingIds: {
                            set: user.followingIds.filter((id) => id !== followingIdToRemove),
                        },
                    },
                });
                return updatedUser;
            }
            else {
                throw new Error("FollowingId already exists");
            }
        }
        catch (error) {
            throw error;
        }
    });
}
exports.removeUserFollowing = removeUserFollowing;
function removeUserFollowers({ userId, followerToRemove, }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield index_1.prisma.user.findUnique({
                where: {
                    id: userId,
                },
                select: {
                    followerIds: true,
                },
            });
            if (!user) {
                throw new Error("User not found");
            }
            if (user.followerIds.includes(followerToRemove)) {
                const updatedUser = yield index_1.prisma.user.update({
                    where: {
                        id: userId,
                    },
                    data: {
                        followerIds: {
                            set: user.followerIds.filter((id) => id !== followerToRemove),
                        },
                    },
                });
                return updatedUser;
            }
            else {
                throw new Error("FollowerId already exists");
            }
        }
        catch (error) {
            throw error;
        }
    });
}
exports.removeUserFollowers = removeUserFollowers;
