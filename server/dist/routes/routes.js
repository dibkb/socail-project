"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = __importDefault(require("./user.route"));
const post_route_1 = __importDefault(require("./post.route"));
const comment_route_1 = __importDefault(require("./comment.route"));
const router = express_1.default.Router();
const baseURL = "api/v1";
router.use(`/${baseURL}/users`, user_route_1.default);
router.use(`/${baseURL}/posts`, post_route_1.default);
router.use(`/${baseURL}/comment`, comment_route_1.default);
exports.default = router;
