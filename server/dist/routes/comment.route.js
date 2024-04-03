"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verify_route_1 = require("../middlewares/verify-route");
const comment_controller_1 = require("../controllers/comment.controller");
const router = express_1.default.Router();
router.post("/:postid", verify_route_1.verifyRoute, comment_controller_1.createComment);
router.get("/:postid", verify_route_1.verifyRoute, comment_controller_1.getComments);
router.get("/user/all", verify_route_1.verifyRoute, comment_controller_1.getCommentsUser);
router.get("/user/:userid/all", verify_route_1.verifyRoute, comment_controller_1.getCommentsByUserId);
exports.default = router;
