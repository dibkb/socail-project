import express from "express";
import { signupUser } from "../controllers/user.controller";
const router = express.Router();
router.post(`/signup`, signupUser);
export default router;
