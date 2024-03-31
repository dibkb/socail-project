import express from "express";
import { verifyRoute } from "../middlewares/verify-route";
import {
  createComment,
  getComments,
  getCommentsByUserId,
  getCommentsUser,
} from "../controllers/comment.controller";

const router = express.Router();
router.post("/:postid", verifyRoute, createComment);
router.get("/:postid", verifyRoute, getComments);
router.get("/user/all", verifyRoute, getCommentsUser);
router.get("/user/:userid/all", verifyRoute, getCommentsByUserId);
export default router;
