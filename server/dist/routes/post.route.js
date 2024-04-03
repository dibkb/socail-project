"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// create post
const express_1 = __importDefault(require("express"));
const verify_route_1 = require("../middlewares/verify-route");
const post_controller_1 = require("../controllers/post.controller");
const thread_controller_1 = require("../controllers/thread.controller");
const router = express_1.default.Router();
// ------------GET--------------
router.get("/threads/:threadId", verify_route_1.verifyRoute, thread_controller_1.getThread);
router.get("/all", verify_route_1.verifyRoute, post_controller_1.getEveryPost);
router.get("/:postid", verify_route_1.verifyRoute, post_controller_1.getPost);
router.get("/all/:userid", verify_route_1.verifyRoute, post_controller_1.getAllPosts);
router.get("/all/username/:username", verify_route_1.verifyRoute, post_controller_1.getAllPostsByUsername);
// ------------POST--------------
router.post("/like/:postid", verify_route_1.verifyRoute, post_controller_1.likePost);
router.post("/unlike/:postid", verify_route_1.verifyRoute, post_controller_1.unlikePost);
router.post("/create", verify_route_1.verifyRoute, post_controller_1.createPost);
router.post("/threads/create", verify_route_1.verifyRoute, post_controller_1.createThreads);
// -------------PUT----------------
router.put("/:postid", verify_route_1.verifyRoute, post_controller_1.updatePost);
exports.default = router;
