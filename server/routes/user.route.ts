import express from "express";
import {
  getuserProfile,
  loginUser,
  logoutUser,
  signupUser,
} from "../controllers/user.controller";
import { verifyRoute } from "../middlewares/verify-route";
const router = express.Router();
router.get(`/:userid`, getuserProfile);
router.post(`/signup`, signupUser);
router.post(`/login`, loginUser);
router.post(`/logout`, verifyRoute, logoutUser);
export default router;
