"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAndSetCookie = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = process.env.JWT_SECRET;
const generateAndSetCookie = ({ userid, res, }) => {
    const token = jsonwebtoken_1.default.sign({ userId: userid }, secretKey, { expiresIn: "15d" });
    res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 15 * 24 * 60 * 60 * 1000,
        sameSite: true,
        secure: false,
    });
    return token;
};
exports.generateAndSetCookie = generateAndSetCookie;
