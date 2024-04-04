import express from "express";
import {
  followUser,
  getuserProfile,
  loginUser,
  logoutUser,
  signupUser,
  unFollowUser,
  getSmallUser,
  updateUser,
  testUsr,
} from "../controllers/user.controller";
import { verifyRoute } from "../middlewares/verify-route";
const router = express.Router();
router.get(`/:username`, getuserProfile);
router.get(`/test/test`, testUsr);
router.get(`/name-avatar/:userid`, getSmallUser);
router.post(`/signup`, signupUser);
router.post(`/login`, loginUser);
// protected route
router.post(`/follow/:userid`, verifyRoute, followUser);
router.post(`/unfollow/:userid`, verifyRoute, unFollowUser);
// edit update
router.put(`/update`, verifyRoute, updateUser);
// router.post(`/unfollow/:userid`, verifyRoute, unfollowUser);
router.post(`/logout`, verifyRoute, logoutUser);

export default router;
