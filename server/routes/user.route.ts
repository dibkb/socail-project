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
  searchUsers,
} from "../controllers/user.controller";
import { verifyRoute } from "../middlewares/verify-route";
const router = express.Router();
router.get(`/:username`, getuserProfile as any);
router.get(`/test/test`, testUsr as any);
router.get(`/name-avatar/:userid`, getSmallUser as any);
router.post(`/signup`, signupUser as any);
router.post(`/login`, loginUser as any);
// protected route
router.get(`/search/name&username`, verifyRoute as any, searchUsers as any);
router.post(`/follow/:userid`, verifyRoute as any, followUser as any);
router.post(`/unfollow/:userid`, verifyRoute as any, unFollowUser as any);
// edit update
router.put(`/update`, verifyRoute as any, updateUser as any);
// router.post(`/unfollow/:userid`, verifyRoute, unfollowUser);
router.post(`/logout`, verifyRoute as any, logoutUser as any);
export default router;
