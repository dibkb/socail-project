import express from "express";

const router = express.Router();
const baseURL = "api/v1";
router.use(`/${baseURL}/users`, user);
router.use(`/${baseURL}/auth`);
router.use(`/${baseURL}/posts`);

export default router;
