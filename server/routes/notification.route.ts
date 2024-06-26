import express from "express";
import { verifyRoute } from "../middlewares/verify-route";
import { getAllNotifications } from "../controllers/notification.controller";
const router = express.Router();
router.get("/all", verifyRoute as any, getAllNotifications as any);
export default router;
