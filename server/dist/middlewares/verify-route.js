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
exports.verifyRoute = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const get_user_1 = require("../utils/get-user");
const jwtsecret = process.env.JWT_SECRET || "";
const verifyRoute = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.jwt;
        if (!token)
            return res.status(401).json({ message: "Unauthorized, jwt missing" });
        const decoded = jsonwebtoken_1.default.verify(token, jwtsecret);
        const user = yield (0, get_user_1.findUserById)(decoded === null || decoded === void 0 ? void 0 : decoded.userId);
        if (user) {
            req.user = user;
        }
        next();
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.verifyRoute = verifyRoute;
