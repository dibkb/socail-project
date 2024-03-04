import express from "express";
import userRouter from "./user.route";
const router = express.Router();
const baseURL = "api/v1";
router.use(`/${baseURL}/users`, userRouter);
// router.use(`/${baseURL}/posts`);

export default router;
