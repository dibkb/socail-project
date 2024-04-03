import express from "express";
import userRouter from "./user.route";
import postRouter from "./post.route";
import commentRouter from "./comment.route";
const router = express.Router();
const baseURL = "api/v1";
router.use(`/${baseURL}/users`, userRouter);
router.use(`/${baseURL}/posts`, postRouter);
router.use(`/${baseURL}/comment`, commentRouter);
router.use(`/test`, (req, res) => {
  return res.status(200).json("Shreads api test");
});

export default router;
