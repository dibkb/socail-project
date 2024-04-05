import express from "express";
import { verifyRoute } from "../middlewares/verify-route";
import {
  createComment,
  getComments,
  getCommentsByUserId,
  getCommentsUser,
} from "../controllers/comment.controller";

const router = express.Router();
router.post("/:postid", verifyRoute as any, createComment as any);
router.get("/:postid", verifyRoute as any, getComments as any);
router.get("/user/all", verifyRoute as any, getCommentsUser as any);
router.get("/user/:userid/all", verifyRoute as any, getCommentsByUserId as any);
export default router;
