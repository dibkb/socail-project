// create post
import express from "express";
import { verifyRoute } from "../middlewares/verify-route";
import { createPost } from "../controllers/post.controller";

const router = express.Router();
router.post("/create", verifyRoute, createPost);
export default router;
