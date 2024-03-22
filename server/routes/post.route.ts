// create post
import express from "express";
import { verifyRoute } from "../middlewares/verify-route";
import { createPost, createThreads } from "../controllers/post.controller";

const router = express.Router();
router.post("/create", verifyRoute, createPost);
router.post("/threads/create", verifyRoute, createThreads);
export default router;
