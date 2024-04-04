"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const verify_route_1 = require("../middlewares/verify-route");
const router = express_1.default.Router();
router.get(`/:username`, user_controller_1.getuserProfile);
router.get(`/test/test`, user_controller_1.testUsr);
router.get(`/name-avatar/:userid`, user_controller_1.getSmallUser);
router.post(`/signup`, user_controller_1.signupUser);
router.post(`/login`, user_controller_1.loginUser);
// protected route
router.post(`/follow/:userid`, verify_route_1.verifyRoute, user_controller_1.followUser);
router.post(`/unfollow/:userid`, verify_route_1.verifyRoute, user_controller_1.unFollowUser);
// edit update
router.put(`/update`, verify_route_1.verifyRoute, user_controller_1.updateUser);
// router.post(`/unfollow/:userid`, verifyRoute, unfollowUser);
router.post(`/logout`, verify_route_1.verifyRoute, user_controller_1.logoutUser);
exports.default = router;
