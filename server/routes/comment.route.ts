import express from "express";
import { verifyRoute } from "../middlewares/verify-route";
import { createComment, getComments } from "../controllers/comment.controller";

const router = express.Router();
router.post("/:postid", verifyRoute, createComment);
router.get("/:postid", verifyRoute, getComments);
export default router;
