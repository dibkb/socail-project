import express from "express";
import { signupUser } from "../controllers/user.controller";
const router = express.Router();
router.get(`/signup`, signupUser);
export default router;
