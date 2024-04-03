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
exports.updateUserFields = void 0;
const index_1 = require("../index");
function updateUserFields({ name, username, bio, id, profilePic, }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updateUser = yield index_1.prisma.user.update({
                where: {
                    id: id,
                },
                data: {
                    name: name,
                    username: username,
                    bio: bio,
                    profilePic: profilePic,
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
            return updateUser;
        }
        catch (error) {
            console.error("Error updating user", error);
            throw error;
        }
    });
}
exports.updateUserFields = updateUserFields;
