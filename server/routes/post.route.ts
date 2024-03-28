// create post
import express from "express";
import { verifyRoute } from "../middlewares/verify-route";
import {
  createPost,
  createThreads,
  getAllPosts,
  getPost,
} from "../controllers/post.controller";
import { getThread } from "../controllers/thread.controller";

const router = express.Router();
router.post("/create", verifyRoute, createPost);
router.post("/threads/create", verifyRoute, createThreads);
router.get("/threads/:threadId", verifyRoute, getThread);
router.get("/:postid", verifyRoute, getPost);
router.get("/all/:userid", verifyRoute, getAllPosts);
export default router;
