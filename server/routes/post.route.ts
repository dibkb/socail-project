// create post
import express from "express";
import { verifyRoute } from "../middlewares/verify-route";
import {
  createPost,
  createThreads,
  getAllPosts,
  getPost,
  likePost,
  unlikePost,
} from "../controllers/post.controller";
import { getThread } from "../controllers/thread.controller";

const router = express.Router();
// ------------GET--------------
router.get("/threads/:threadId", verifyRoute, getThread);
router.get("/:postid", verifyRoute, getPost);
router.get("/all/:userid", verifyRoute, getAllPosts);
// ------------POST--------------
router.post("/like/:postid", verifyRoute, likePost);
router.post("/unlike/:postid", verifyRoute, unlikePost);
router.post("/create", verifyRoute, createPost);
router.post("/threads/create", verifyRoute, createThreads);
export default router;
