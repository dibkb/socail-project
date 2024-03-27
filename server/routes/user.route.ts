import express from "express";
import {
  followUser,
  getuserProfile,
  loginUser,
  logoutUser,
  signupUser,
  updateUser,
} from "../controllers/user.controller";
import { verifyRoute } from "../middlewares/verify-route";
const router = express.Router();
router.get(`/:username`, getuserProfile);
router.post(`/signup`, signupUser);
router.post(`/login`, loginUser);
// protected route
router.post(`/follow/:userid`, verifyRoute, followUser);
// edit update
router.put(`/update`, verifyRoute, updateUser);
// router.post(`/unfollow/:userid`, verifyRoute, unfollowUser);
router.post(`/logout`, verifyRoute, logoutUser);

export default router;
