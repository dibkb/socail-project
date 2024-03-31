import express from "express";
import { verifyRoute } from "../middlewares/verify-route";
import {
  createComment,
  getComments,
  getCommentsUser,
} from "../controllers/comment.controller";

const router = express.Router();
router.post("/:postid", verifyRoute, createComment);
router.get("/:postid", verifyRoute, getComments);
router.get("/user/all", verifyRoute, getCommentsUser);
export default router;
