// create post
import express from "express";
import { verifyRoute } from "../middlewares/verify-route";
import {
  createPost,
  createThreads,
  getAllPosts,
  getAllPostsByUsername,
  getEveryPost,
  getPost,
  likePost,
  unlikePost,
  updatePost,
  deletePost,
} from "../controllers/post.controller";
import { getThread } from "../controllers/thread.controller";

const router = express.Router();
// ------------GET--------------
router.get("/threads/:threadId", verifyRoute as any, getThread as any);
router.get("/all", verifyRoute as any, getEveryPost as any);
router.get("/:postid", verifyRoute as any, getPost as any);
router.get("/all/:userid", verifyRoute as any, getAllPosts as any);
router.get("/all/username/:username", getAllPostsByUsername as any);
// ------------POST--------------
router.post("/like/:postid", verifyRoute as any, likePost as any);
router.post("/unlike/:postid", verifyRoute as any, unlikePost as any);
router.post("/create", verifyRoute as any, createPost as any);
router.post("/threads/create", verifyRoute as any, createThreads as any);
// -------------PUT----------------
router.put("/:postid", verifyRoute as any, updatePost as any);
// --------------DELTETE-----------
router.delete("/:postid", verifyRoute as any, deletePost as any);

export default router;
