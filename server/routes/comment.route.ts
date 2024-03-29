import express from "express";
import { verifyRoute } from "../middlewares/verify-route";
import { createComment } from "../controllers/comment.controller";

const router = express.Router();
router.post("/:postid", verifyRoute, createComment);
export default router;
